// @ts-nocheck
import { GraphQLClient } from "graphql-request";
import { RequestInit } from "graphql-request/dist/types.dom";
import {
  useQuery,
  useInfiniteQuery,
  useMutation,
  UseQueryOptions,
  UseInfiniteQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  headers?: RequestInit["headers"]
) {
  return async (): Promise<TData> =>
    client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddCommentInput = {
  body: Scalars["String"];
  postId: Scalars["ID"];
};

export type Comment = {
  body: Scalars["String"];
  createdAt: Scalars["String"];
  id: Scalars["ID"];
  postId: Scalars["ID"];
  updatedAt: Scalars["String"];
  username: Scalars["String"];
};

export type CreatePostInput = {
  caption: Scalars["String"];
  image: Scalars["String"];
};

export type Mutation = {
  addComment: Comment;
  createPost: Post;
  deleteComment: Scalars["String"];
  deletePost: Scalars["String"];
  editComment: Comment;
  editPostCaption: Post;
  followUser: User;
  likePost: Post;
  loginUser: User;
  logoutUser: Scalars["String"];
  registerUser: User;
  updateUserInfo: User;
};

export type MutationAddCommentArgs = {
  input: AddCommentInput;
};

export type MutationCreatePostArgs = {
  input: CreatePostInput;
};

export type MutationDeleteCommentArgs = {
  commentId: Scalars["ID"];
};

export type MutationDeletePostArgs = {
  postId: Scalars["ID"];
};

export type MutationEditCommentArgs = {
  body: Scalars["String"];
  commentId: Scalars["ID"];
};

export type MutationEditPostCaptionArgs = {
  caption: Scalars["String"];
  postId: Scalars["ID"];
};

export type MutationFollowUserArgs = {
  followedUsername: Scalars["String"];
};

export type MutationLikePostArgs = {
  postId: Scalars["ID"];
};

export type MutationLoginUserArgs = {
  password?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
};

export type MutationRegisterUserArgs = {
  input: RegisterUserInput;
};

export type MutationUpdateUserInfoArgs = {
  input?: InputMaybe<UpdateUserInfoInput>;
};

export type Post = {
  caption: Scalars["String"];
  commentCount: Scalars["Int"];
  comments?: Maybe<Array<Comment>>;
  createdAt: Scalars["String"];
  id: Scalars["ID"];
  image: Scalars["String"];
  isLiked: Scalars["Boolean"];
  likeCount: Scalars["Int"];
  likes: Array<Maybe<Scalars["String"]>>;
  updatedAt: Scalars["String"];
  username: Scalars["String"];
};

export type Query = {
  post: Post;
  posts: Array<Post>;
  postsByUser: Array<Post>;
  recommendedUsers: Array<User>;
  user?: Maybe<User>;
};

export type QueryPostArgs = {
  postId: Scalars["ID"];
};

export type QueryPostsArgs = {
  pageParam?: InputMaybe<Scalars["Int"]>;
};

export type QueryPostsByUserArgs = {
  username: Scalars["String"];
};

export type QueryUserArgs = {
  username: Scalars["String"];
};

export type RegisterUserInput = {
  confirmPassword: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type UpdateUserInfoInput = {
  bio?: InputMaybe<Scalars["String"]>;
  image?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
  username: Scalars["String"];
};

export type User = {
  authorization?: Maybe<Scalars["String"]>;
  bio?: Maybe<Scalars["String"]>;
  createdAt: Scalars["String"];
  email: Scalars["String"];
  followers: Array<Scalars["String"]>;
  following: Array<Scalars["String"]>;
  id: Scalars["ID"];
  image?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  refresh?: Maybe<Scalars["String"]>;
  updatedAt: Scalars["String"];
  username: Scalars["String"];
};

export type PostQueryVariables = Exact<{
  postId: Scalars["ID"];
}>;

export type PostQuery = {
  post: {
    id: string;
    image: string;
    caption: string;
    likeCount: number;
    username: string;
    isLiked: boolean;
    createdAt: string;
    comments?: Array<{
      id: string;
      body: string;
      username: string;
      createdAt: string;
    }> | null;
  };
};

export type PostsQueryVariables = Exact<{
  pageParam?: InputMaybe<Scalars["Int"]>;
}>;

export type PostsQuery = {
  posts: Array<{
    id: string;
    image: string;
    caption: string;
    likeCount: number;
    username: string;
    isLiked: boolean;
    createdAt: string;
    comments?: Array<{
      id: string;
      username: string;
      body: string;
      createdAt: string;
    }> | null;
  }>;
};

export type PostsByUserQueryVariables = Exact<{
  username: Scalars["String"];
}>;

export type PostsByUserQuery = {
  postsByUser: Array<{
    id: string;
    image: string;
    commentCount: number;
    likeCount: number;
  }>;
};

export type UserQueryVariables = Exact<{
  username: Scalars["String"];
}>;

export type UserQuery = {
  user?: {
    id: string;
    username: string;
    image?: string | null;
    bio?: string | null;
    name: string;
    following: Array<string>;
    followers: Array<string>;
  } | null;
};

export type RecommendedUsersQueryVariables = Exact<{ [key: string]: never }>;

export type RecommendedUsersQuery = {
  recommendedUsers: Array<{ username: string; image?: string | null }>;
};

export type LoginUserMutationVariables = Exact<{
  username: Scalars["String"];
  password: Scalars["String"];
}>;

export type LoginUserMutation = {
  loginUser: {
    id: string;
    name: string;
    username: string;
    email: string;
    image?: string | null;
    updatedAt: string;
  };
};

export type RegisterUserMutationVariables = Exact<{
  username: Scalars["String"];
  email: Scalars["String"];
  name: Scalars["String"];
  password: Scalars["String"];
  confirmPassword: Scalars["String"];
}>;

export type RegisterUserMutation = {
  registerUser: { id: string; username: string; email: string; name: string };
};

export type LogoutUserMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutUserMutation = { logoutUser: string };

export type UpdateUserInfoMutationVariables = Exact<{
  username: Scalars["String"];
  bio?: InputMaybe<Scalars["String"]>;
  image?: InputMaybe<Scalars["String"]>;
  name?: InputMaybe<Scalars["String"]>;
}>;

export type UpdateUserInfoMutation = { updateUserInfo: { username: string } };

export type FollowUserMutationVariables = Exact<{
  followedUsername: Scalars["String"];
}>;

export type FollowUserMutation = { followUser: { username: string } };

export type CreatePostMutationVariables = Exact<{
  image: Scalars["String"];
  caption: Scalars["String"];
}>;

export type CreatePostMutation = {
  createPost: { image: string; caption: string; username: string };
};

export type DeletePostMutationVariables = Exact<{
  postId: Scalars["ID"];
}>;

export type DeletePostMutation = { deletePost: string };

export type LikePostMutationVariables = Exact<{
  postId: Scalars["ID"];
}>;

export type LikePostMutation = { likePost: { username: string } };

export type AddCommentMutationVariables = Exact<{
  body: Scalars["String"];
  postId: Scalars["ID"];
}>;

export type AddCommentMutation = { addComment: { username: string } };

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars["ID"];
}>;

export type DeleteCommentMutation = { deleteComment: string };

export const PostDocument = `
    query post($postId: ID!) {
  post(postId: $postId) {
    id
    image
    caption
    comments {
      id
      body
      username
      createdAt
    }
    likeCount
    username
    isLiked
    createdAt
  }
}
    `;
export const usePostQuery = <TData = PostQuery, TError = Error>(
  client: GraphQLClient,
  variables: PostQueryVariables,
  options?: UseQueryOptions<PostQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<PostQuery, TError, TData>(
    ["post", variables],
    fetcher<PostQuery, PostQueryVariables>(
      client,
      PostDocument,
      variables,
      headers
    ),
    options
  );
export const useInfinitePostQuery = <TData = PostQuery, TError = Error>(
  _pageParamKey: keyof PostQueryVariables,
  client: GraphQLClient,
  variables: PostQueryVariables,
  options?: UseInfiniteQueryOptions<PostQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useInfiniteQuery<PostQuery, TError, TData>(
    ["post.infinite", variables],
    (metaData) =>
      fetcher<PostQuery, PostQueryVariables>(
        client,
        PostDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

export const PostsDocument = `
    query posts($pageParam: Int) {
  posts(pageParam: $pageParam) {
    id
    image
    caption
    comments {
      id
      username
      body
      createdAt
    }
    likeCount
    username
    isLiked
    createdAt
  }
}
    `;
export const usePostsQuery = <TData = PostsQuery, TError = Error>(
  client: GraphQLClient,
  variables?: PostsQueryVariables,
  options?: UseQueryOptions<PostsQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<PostsQuery, TError, TData>(
    variables === undefined ? ["posts"] : ["posts", variables],
    fetcher<PostsQuery, PostsQueryVariables>(
      client,
      PostsDocument,
      variables,
      headers
    ),
    options
  );
export const useInfinitePostsQuery = <TData = PostsQuery, TError = Error>(
  _pageParamKey: keyof PostsQueryVariables,
  client: GraphQLClient,
  variables?: PostsQueryVariables,
  options?: UseInfiniteQueryOptions<PostsQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useInfiniteQuery<PostsQuery, TError, TData>(
    variables === undefined
      ? ["posts.infinite"]
      : ["posts.infinite", variables],
    (metaData) =>
      fetcher<PostsQuery, PostsQueryVariables>(
        client,
        PostsDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

export const PostsByUserDocument = `
    query postsByUser($username: String!) {
  postsByUser(username: $username) {
    id
    image
    commentCount
    likeCount
  }
}
    `;
export const usePostsByUserQuery = <TData = PostsByUserQuery, TError = Error>(
  client: GraphQLClient,
  variables: PostsByUserQueryVariables,
  options?: UseQueryOptions<PostsByUserQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<PostsByUserQuery, TError, TData>(
    ["postsByUser", variables],
    fetcher<PostsByUserQuery, PostsByUserQueryVariables>(
      client,
      PostsByUserDocument,
      variables,
      headers
    ),
    options
  );
export const useInfinitePostsByUserQuery = <
  TData = PostsByUserQuery,
  TError = Error
>(
  _pageParamKey: keyof PostsByUserQueryVariables,
  client: GraphQLClient,
  variables: PostsByUserQueryVariables,
  options?: UseInfiniteQueryOptions<PostsByUserQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useInfiniteQuery<PostsByUserQuery, TError, TData>(
    ["postsByUser.infinite", variables],
    (metaData) =>
      fetcher<PostsByUserQuery, PostsByUserQueryVariables>(
        client,
        PostsByUserDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

export const UserDocument = `
    query user($username: String!) {
  user(username: $username) {
    id
    username
    image
    bio
    name
    following
    followers
  }
}
    `;
export const useUserQuery = <TData = UserQuery, TError = Error>(
  client: GraphQLClient,
  variables: UserQueryVariables,
  options?: UseQueryOptions<UserQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<UserQuery, TError, TData>(
    ["user", variables],
    fetcher<UserQuery, UserQueryVariables>(
      client,
      UserDocument,
      variables,
      headers
    ),
    options
  );
export const useInfiniteUserQuery = <TData = UserQuery, TError = Error>(
  _pageParamKey: keyof UserQueryVariables,
  client: GraphQLClient,
  variables: UserQueryVariables,
  options?: UseInfiniteQueryOptions<UserQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useInfiniteQuery<UserQuery, TError, TData>(
    ["user.infinite", variables],
    (metaData) =>
      fetcher<UserQuery, UserQueryVariables>(
        client,
        UserDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

export const RecommendedUsersDocument = `
    query recommendedUsers {
  recommendedUsers {
    username
    image
  }
}
    `;
export const useRecommendedUsersQuery = <
  TData = RecommendedUsersQuery,
  TError = Error
>(
  client: GraphQLClient,
  variables?: RecommendedUsersQueryVariables,
  options?: UseQueryOptions<RecommendedUsersQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useQuery<RecommendedUsersQuery, TError, TData>(
    variables === undefined
      ? ["recommendedUsers"]
      : ["recommendedUsers", variables],
    fetcher<RecommendedUsersQuery, RecommendedUsersQueryVariables>(
      client,
      RecommendedUsersDocument,
      variables,
      headers
    ),
    options
  );
export const useInfiniteRecommendedUsersQuery = <
  TData = RecommendedUsersQuery,
  TError = Error
>(
  _pageParamKey: keyof RecommendedUsersQueryVariables,
  client: GraphQLClient,
  variables?: RecommendedUsersQueryVariables,
  options?: UseInfiniteQueryOptions<RecommendedUsersQuery, TError, TData>,
  headers?: RequestInit["headers"]
) =>
  useInfiniteQuery<RecommendedUsersQuery, TError, TData>(
    variables === undefined
      ? ["recommendedUsers.infinite"]
      : ["recommendedUsers.infinite", variables],
    (metaData) =>
      fetcher<RecommendedUsersQuery, RecommendedUsersQueryVariables>(
        client,
        RecommendedUsersDocument,
        { ...variables, ...(metaData.pageParam ?? {}) },
        headers
      )(),
    options
  );

export const LoginUserDocument = `
    mutation loginUser($username: String!, $password: String!) {
  loginUser(username: $username, password: $password) {
    id
    name
    username
    email
    image
    updatedAt
  }
}
    `;
export const useLoginUserMutation = <TError = Error, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LoginUserMutation,
    TError,
    LoginUserMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<LoginUserMutation, TError, LoginUserMutationVariables, TContext>(
    ["loginUser"],
    (variables?: LoginUserMutationVariables) =>
      fetcher<LoginUserMutation, LoginUserMutationVariables>(
        client,
        LoginUserDocument,
        variables,
        headers
      )(),
    options
  );
export const RegisterUserDocument = `
    mutation registerUser($username: String!, $email: String!, $name: String!, $password: String!, $confirmPassword: String!) {
  registerUser(
    input: {username: $username, email: $email, name: $name, password: $password, confirmPassword: $confirmPassword}
  ) {
    id
    username
    email
    name
  }
}
    `;
export const useRegisterUserMutation = <TError = Error, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    RegisterUserMutation,
    TError,
    RegisterUserMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    RegisterUserMutation,
    TError,
    RegisterUserMutationVariables,
    TContext
  >(
    ["registerUser"],
    (variables?: RegisterUserMutationVariables) =>
      fetcher<RegisterUserMutation, RegisterUserMutationVariables>(
        client,
        RegisterUserDocument,
        variables,
        headers
      )(),
    options
  );
export const LogoutUserDocument = `
    mutation logoutUser {
  logoutUser
}
    `;
export const useLogoutUserMutation = <TError = Error, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LogoutUserMutation,
    TError,
    LogoutUserMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    LogoutUserMutation,
    TError,
    LogoutUserMutationVariables,
    TContext
  >(
    ["logoutUser"],
    (variables?: LogoutUserMutationVariables) =>
      fetcher<LogoutUserMutation, LogoutUserMutationVariables>(
        client,
        LogoutUserDocument,
        variables,
        headers
      )(),
    options
  );
export const UpdateUserInfoDocument = `
    mutation updateUserInfo($username: String!, $bio: String, $image: String, $name: String) {
  updateUserInfo(
    input: {username: $username, bio: $bio, image: $image, name: $name}
  ) {
    username
  }
}
    `;
export const useUpdateUserInfoMutation = <TError = Error, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    UpdateUserInfoMutation,
    TError,
    UpdateUserInfoMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    UpdateUserInfoMutation,
    TError,
    UpdateUserInfoMutationVariables,
    TContext
  >(
    ["updateUserInfo"],
    (variables?: UpdateUserInfoMutationVariables) =>
      fetcher<UpdateUserInfoMutation, UpdateUserInfoMutationVariables>(
        client,
        UpdateUserInfoDocument,
        variables,
        headers
      )(),
    options
  );
export const FollowUserDocument = `
    mutation followUser($followedUsername: String!) {
  followUser(followedUsername: $followedUsername) {
    username
  }
}
    `;
export const useFollowUserMutation = <TError = Error, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    FollowUserMutation,
    TError,
    FollowUserMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    FollowUserMutation,
    TError,
    FollowUserMutationVariables,
    TContext
  >(
    ["followUser"],
    (variables?: FollowUserMutationVariables) =>
      fetcher<FollowUserMutation, FollowUserMutationVariables>(
        client,
        FollowUserDocument,
        variables,
        headers
      )(),
    options
  );
export const CreatePostDocument = `
    mutation createPost($image: String!, $caption: String!) {
  createPost(input: {image: $image, caption: $caption}) {
    image
    caption
    username
  }
}
    `;
export const useCreatePostMutation = <TError = Error, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    CreatePostMutation,
    TError,
    CreatePostMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    CreatePostMutation,
    TError,
    CreatePostMutationVariables,
    TContext
  >(
    ["createPost"],
    (variables?: CreatePostMutationVariables) =>
      fetcher<CreatePostMutation, CreatePostMutationVariables>(
        client,
        CreatePostDocument,
        variables,
        headers
      )(),
    options
  );
export const DeletePostDocument = `
    mutation deletePost($postId: ID!) {
  deletePost(postId: $postId)
}
    `;
export const useDeletePostMutation = <TError = Error, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeletePostMutation,
    TError,
    DeletePostMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    DeletePostMutation,
    TError,
    DeletePostMutationVariables,
    TContext
  >(
    ["deletePost"],
    (variables?: DeletePostMutationVariables) =>
      fetcher<DeletePostMutation, DeletePostMutationVariables>(
        client,
        DeletePostDocument,
        variables,
        headers
      )(),
    options
  );
export const LikePostDocument = `
    mutation likePost($postId: ID!) {
  likePost(postId: $postId) {
    username
  }
}
    `;
export const useLikePostMutation = <TError = Error, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    LikePostMutation,
    TError,
    LikePostMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<LikePostMutation, TError, LikePostMutationVariables, TContext>(
    ["likePost"],
    (variables?: LikePostMutationVariables) =>
      fetcher<LikePostMutation, LikePostMutationVariables>(
        client,
        LikePostDocument,
        variables,
        headers
      )(),
    options
  );
export const AddCommentDocument = `
    mutation addComment($body: String!, $postId: ID!) {
  addComment(input: {body: $body, postId: $postId}) {
    username
  }
}
    `;
export const useAddCommentMutation = <TError = Error, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    AddCommentMutation,
    TError,
    AddCommentMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    AddCommentMutation,
    TError,
    AddCommentMutationVariables,
    TContext
  >(
    ["addComment"],
    (variables?: AddCommentMutationVariables) =>
      fetcher<AddCommentMutation, AddCommentMutationVariables>(
        client,
        AddCommentDocument,
        variables,
        headers
      )(),
    options
  );
export const DeleteCommentDocument = `
    mutation deleteComment($commentId: ID!) {
  deleteComment(commentId: $commentId)
}
    `;
export const useDeleteCommentMutation = <TError = Error, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<
    DeleteCommentMutation,
    TError,
    DeleteCommentMutationVariables,
    TContext
  >,
  headers?: RequestInit["headers"]
) =>
  useMutation<
    DeleteCommentMutation,
    TError,
    DeleteCommentMutationVariables,
    TContext
  >(
    ["deleteComment"],
    (variables?: DeleteCommentMutationVariables) =>
      fetcher<DeleteCommentMutation, DeleteCommentMutationVariables>(
        client,
        DeleteCommentDocument,
        variables,
        headers
      )(),
    options
  );
