import { toast } from "react-toastify";
import { produce } from "immer";
import { useAuth } from "./useAuth";
import {
  PostsQuery,
  useAddCommentMutation,
  useLikePostMutation,
  useDeletePostMutation,
  useDeleteCommentMutation,
} from "./queryHooks";
import { reqClient } from "../queryClient";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";

export const useAllPostServices = (queryKeys: any[]) => {
  const queryClient = useQueryClient();
  const {
    auth: { user },
  } = useAuth();

  const { mutate: addCommentMutate } = useAddCommentMutation(reqClient, {
    onMutate: async ({ body, postId }) => {
      await queryClient.cancelQueries(queryKeys);

      const prevPosts = queryClient.getQueryData(queryKeys);

      queryClient.setQueryData<InfiniteData<PostsQuery>>(
        queryKeys,
        (postsQuery) => {
          const newPosts = produce(postsQuery, (draftState) => {
            draftState?.pages.every((page) => {
              return page.posts.every((post) => {
                if (post.id === postId) {
                  post.comments?.push({
                    body,
                    id: Date.now().toString(),
                    username: user!.username,
                    createdAt: Date.now().toString(),
                  });
                  return false;
                } else return true;
              });
            });
          });

          return newPosts;
        }
      );

      return prevPosts;
    },
    onError: (_, __, context: any) => {
      console.log(_);
      toast.error("Something went wrong");
      queryClient.setQueryData(queryKeys, context.prevPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys);
    },
  });

  const { mutate: deletePostMutate } = useDeletePostMutation(reqClient, {
    onError: () => {
      toast.error("Something went wrong");
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys);
    },
  });

  const { mutate: likePostMutate } = useLikePostMutation(reqClient, {
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries(queryKeys);

      const prevPosts = queryClient.getQueryData(queryKeys);

      queryClient.setQueryData<InfiniteData<PostsQuery>>(
        queryKeys,
        (postsQuery) => {
          const newPosts = produce(postsQuery, (draftState) => {
            draftState?.pages.every((page) => {
              return page.posts.every((post, index) => {
                if (post.id === postId) {
                  post.isLiked = !post.isLiked;
                  return false;
                } else {
                  return true;
                }
              });
            });
          });

          return newPosts;
        }
      );

      return prevPosts;
    },
    onError(_, __, context: any) {
      queryClient.setQueryData(queryKeys, context.prevPosts);
    },

    onSettled: () => {
      queryClient.invalidateQueries(queryKeys);
    },
  });

  const { mutate: deleteCommentMutate } = useDeleteCommentMutation(reqClient, {
    onError: () => {
      toast.error("Something went wrong");
    },
    onSettled: () => {
      queryClient.invalidateQueries(queryKeys);
    },
  });

  return {
    addCommentMutate,
    deletePostMutate,
    likePostMutate,
    deleteCommentMutate,
  };
};
