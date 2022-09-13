import { errorHandler } from "./../../utils/errorHandler";
import { Resolvers } from "../../types/resolvers.type";
import hasUser from "../../middlewares/hasUser";
import { UserInputError } from "apollo-server-core";

const Query: Resolvers["Query"] = {
  recommendedUsers: async (_, __, { User, req }) => {
    try {
      const user = hasUser(req);

      const users = await User.aggregate([
        {
          $match: { followers: { $nin: [user.username] } },
        },
        {
          $sample: { size: 5 },
        },
      ]);

      return users.filter(({ username }) => username !== user.username);
    } catch (error) {
      throw errorHandler(error);
    }
  },
  user: async (_, { username }, { User }) => await User.findOne({ username }),
  post: async (_, { postId }, { Post, req }) => {
    try {
      const user = hasUser(req);

      const post = await Post.findById(postId);

      if (!post) throw new UserInputError("Post not found");

      return {
        // @ts-ignore
        ...post._doc,
        id: post._id,
        isLiked: post.likes.includes(user.username),
      };
    } catch (error) {
      throw errorHandler(error);
    }
  },
  posts: async (_, vars, { Post, req }) => {
    const page = vars.pageParam ?? 1;
    const limit = 10;
    const skip = limit * (page - 1);

    try {
      const user = hasUser(req);

      let posts = await Post.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit);

      return posts.map((post) => {
        return {
          // @ts-ignore
          ...post._doc,
          id: post._id,
          isLiked: post.likes.includes(user.username),
        };
      });
    } catch (error) {
      throw errorHandler(error);
    }
  },
  postsByUser: async (_, { username }, { Post, req }) => {
    try {
      const user = hasUser(req);

      let posts = await Post.find({ username }).sort({ createdAt: -1 });

      return posts.map((post) => {
        return {
          // @ts-ignore
          ...post._doc,
          id: post._id,
          isLiked: post.likes.includes(user.username),
        };
      });
    } catch (error) {
      throw errorHandler(error);
    }
  },
};

export default Query;
