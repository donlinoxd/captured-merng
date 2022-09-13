import { toast } from "react-toastify";
import { useAuth } from "./useAuth";
import {
  useAddCommentMutation,
  useLikePostMutation,
  useDeletePostMutation,
  useDeleteCommentMutation,
  PostQuery,
} from "./queryHooks";
import { reqClient } from "../queryClient";
import { useQueryClient } from "@tanstack/react-query";

export const useSinglePostServices = (queryKeys: any[]) => {
  const queryClient = useQueryClient();
  const {
    auth: { user },
  } = useAuth();

  const { mutate: addCommentMutate } = useAddCommentMutation(reqClient, {
    onMutate: async ({ body, postId }) => {
      await queryClient.cancelQueries(queryKeys);

      const prevPost = queryClient.getQueryData(queryKeys);

      queryClient.setQueryData<PostQuery>(queryKeys, (post) => {
        const newPost = JSON.parse(JSON.stringify(post)) as PostQuery;

        newPost.post.comments?.push({
          id: Date.now().toString(),
          username: user!.username,
          createdAt: Date.now().toString(),
          body,
        });

        return newPost;
      });

      return prevPost;
    },
    onError: (_, __, context: any) => {
      toast.error("Something went wrong");
      queryClient.setQueryData(queryKeys, context.prevPost);
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

      const prevPost = queryClient.getQueryData(queryKeys);

      queryClient.setQueryData<PostQuery>(queryKeys, (postQuery) => {
        const newPostQuery = JSON.parse(JSON.stringify(postQuery)) as PostQuery;

        newPostQuery.post.isLiked = !newPostQuery.post.isLiked;

        return newPostQuery;
      });

      return prevPost;
    },
    onError(error, postId, context: any) {
      queryClient.setQueryData(queryKeys, context.prevPost);
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
