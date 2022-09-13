import { createToken } from "../../utils/jwt";
import { UserInputError, AuthenticationError } from "apollo-server-express";
import { Resolvers } from "../../types/resolvers.type";
import { errorHandler } from "../../utils/errorHandler";
import {
  authenticateUser,
  createSession,
} from "../../services/session.service";
import hasUser from "../../middlewares/hasUser";

const Mutation: Resolvers["Mutation"] = {
  registerUser: async (
    _,
    { input: { username, email, name, password, confirmPassword } },
    { User }
  ) => {
    if (password !== confirmPassword)
      throw new UserInputError("Password should match");

    try {
      const newUser = new User({
        username,
        email,
        name,
        password,
      });

      return await newUser.save();
    } catch (error) {
      throw errorHandler(error);
    }
  },

  loginUser: async (_, { username, password }, { res }) => {
    try {
      const user = await authenticateUser(username, password!);

      const session = await createSession({
        username: user.username,
        email: user.email,
        name: user.name,
      });

      const accessToken = createToken(
        {
          username: user.username,
          email: user.email,
          name: user.name,
          sessionId: session._id,
        },
        {
          expiresIn: "10m",
        }
      );

      const refreshToken = createToken(
        {
          sessionId: session._id,
        },
        {
          expiresIn: "1y",
        }
      );

      res.cookie("authorization", `Bearer ${accessToken}`, {
        maxAge: 60000 * 60 * 24 * 365,
      });
      res.cookie("refresh", `Bearer ${refreshToken}`, {
        maxAge: 60000 * 60 * 24 * 365,
      });

      return user;
    } catch (error) {
      throw errorHandler(error);
    }
  },
  logoutUser: async (_, __, { req, res, Session }) => {
    try {
      const { sessionId } = hasUser(req);

      const session = await Session.findById(sessionId);

      if (!session) throw new Error("Session not found");

      session.valid = false;

      await session.save();

      res.cookie("authorization", "", {
        maxAge: 1,
      });
      res.cookie("refresh", "", {
        maxAge: 1,
      });

      return "Logout success";
    } catch (error) {
      throw errorHandler(error);
    }
  },

  followUser: async (_, { followedUsername }, { User, req }) => {
    try {
      const user = hasUser(req);

      const followedUser = await User.findOne({ username: followedUsername });

      if (!followedUser)
        throw new UserInputError("Something went wrong. User does not exist");

      if (followedUser.followers.includes(user.username)) {
        followedUser.followers = followedUser.followers.filter(
          (followerId) => followerId !== user.username
        );
      } else {
        followedUser.followers.push(user.username);
      }

      await followedUser.save();

      return followedUser;
    } catch (error) {
      throw errorHandler(error);
    }
  },
  updateUserInfo: async (_, { input }, { User, req }) => {
    const username = input?.username;

    try {
      const user = hasUser(req);
      if (user.username !== username)
        throw new AuthenticationError("You are not allowed to do that.");

      const userInfo = await User.findOneAndUpdate(
        { username: user.username },
        { $set: { ...input } },
        { new: true }
      );

      if (!userInfo) throw new UserInputError("User not found");

      return userInfo;
    } catch (error) {
      throw errorHandler(error);
    }
  },

  createPost: async (_, { input: { image, caption } }, { Post, req }) => {
    try {
      const user = hasUser(req);

      const newPost = new Post({
        image,
        caption,
        username: user.username,
      });

      return await newPost.save();
    } catch (error) {
      throw errorHandler(error);
    }
  },

  editPostCaption: async (_, { postId, caption }, { Post, req }) => {
    try {
      const user = hasUser(req);

      const post = await Post.findOneAndUpdate(
        { _id: postId, username: user.username },
        { caption },
        { new: true }
      );

      if (!post)
        throw new UserInputError(
          "Your are not allowed to do that. Post doesn't exist"
        );

      return post;
    } catch (error) {
      throw errorHandler(error);
    }
  },

  deletePost: async (_, { postId }, { Post, req }) => {
    try {
      const user = hasUser(req);

      const { deletedCount } = await Post.deleteOne({
        _id: postId,
        username: user.username,
      });

      if (!deletedCount)
        throw new UserInputError(
          "You are not allowed to do that. Post deletion failed"
        );

      return "deleted successfully";
    } catch (error) {
      throw errorHandler(error);
    }
  },

  likePost: async (_, { postId }, { Post, req }) => {
    try {
      const user = hasUser(req);

      const post = await Post.findOne({ _id: postId });

      if (!post) throw new UserInputError("Post does not exists");

      const likeIndex = post.likes.findIndex(
        (username) => username === user.username
      );

      if (likeIndex === -1) post.likes.push(user.username);
      else post.likes.splice(likeIndex, 1);

      return await post.save();
    } catch (error) {
      throw errorHandler(error);
    }
  },

  addComment: async (_, { input: { body, postId } }, { Comment, req }) => {
    try {
      const user = hasUser(req);

      const newComment = new Comment({
        body,
        postId,
        username: user.username,
      });

      return await newComment.save();
    } catch (error) {
      throw errorHandler(error);
    }
  },

  editComment: async (_, { commentId, body }, { Comment, req }) => {
    try {
      const user = hasUser(req);

      const comment = await Comment.findOneAndUpdate(
        { _id: commentId, username: user.username },
        { body },
        { new: true }
      );

      if (!comment)
        throw new UserInputError(
          "You are not allowed to do that. Updating comment failed"
        );

      return comment;
    } catch (error) {
      throw errorHandler(error);
    }
  },

  deleteComment: async (_, { commentId }, { Comment, req }) => {
    try {
      const user = hasUser(req);

      const { deletedCount } = await Comment.deleteOne({
        _id: commentId,
        username: user.username,
      });

      if (!deletedCount)
        throw new UserInputError(
          "You are not allowed to do that. Comment deletion failed"
        );

      return "Sucessfully deleted the comment";
    } catch (error) {
      throw errorHandler(error);
    }
  },
};

export default Mutation;
