"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _errorHandler = require("./../../utils/errorHandler");
const _hasUser = /*#__PURE__*/ _interopRequireDefault(require("../../middlewares/hasUser"));
const _apolloServerCore = require("apollo-server-core");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const Query = {
    recommendedUsers: async (_, __, { User , req  })=>{
        try {
            const user = (0, _hasUser.default)(req);
            const users = await User.aggregate([
                {
                    $match: {
                        followers: {
                            $nin: [
                                user.username
                            ]
                        }
                    }
                },
                {
                    $sample: {
                        size: 5
                    }
                }, 
            ]);
            return users.filter(({ username  })=>username !== user.username);
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    user: async (_, { username  }, { User  })=>await User.findOne({
            username
        }),
    post: async (_, { postId  }, { Post , req  })=>{
        try {
            const user = (0, _hasUser.default)(req);
            const post = await Post.findById(postId);
            if (!post) throw new _apolloServerCore.UserInputError("Post not found");
            return {
                // @ts-ignore
                ...post._doc,
                id: post._id,
                isLiked: post.likes.includes(user.username)
            };
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    posts: async (_, vars, { Post , req  })=>{
        const page = vars.pageParam ?? 1;
        const limit = 10;
        const skip = limit * (page - 1);
        try {
            const user = (0, _hasUser.default)(req);
            let posts = await Post.find().sort({
                createdAt: -1
            }).skip(skip).limit(limit);
            return posts.map((post)=>{
                return {
                    // @ts-ignore
                    ...post._doc,
                    id: post._id,
                    isLiked: post.likes.includes(user.username)
                };
            });
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    postsByUser: async (_, { username  }, { Post , req  })=>{
        try {
            const user = (0, _hasUser.default)(req);
            let posts = await Post.find({
                username
            }).sort({
                createdAt: -1
            });
            return posts.map((post)=>{
                return {
                    // @ts-ignore
                    ...post._doc,
                    id: post._id,
                    isLiked: post.likes.includes(user.username)
                };
            });
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    }
};
const _default = Query;
