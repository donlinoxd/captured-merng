"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _jwt = require("../../utils/jwt");
const _apolloServerExpress = require("apollo-server-express");
const _errorHandler = require("../../utils/errorHandler");
const _sessionService = require("../../services/session.service");
const _hasUser = /*#__PURE__*/ _interopRequireDefault(require("../../middlewares/hasUser"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const Mutation = {
    registerUser: async (_, { input: { username , email , name , password , confirmPassword  }  }, { User  })=>{
        if (password !== confirmPassword) throw new _apolloServerExpress.UserInputError("Password should match");
        try {
            const newUser = new User({
                username,
                email,
                name,
                password
            });
            return await newUser.save();
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    loginUser: async (_, { username , password  }, { res  })=>{
        try {
            const user = await (0, _sessionService.authenticateUser)(username, password);
            const session = await (0, _sessionService.createSession)({
                username: user.username,
                email: user.email,
                name: user.name
            });
            const accessToken = (0, _jwt.createToken)({
                username: user.username,
                email: user.email,
                name: user.name,
                sessionId: session._id
            }, {
                expiresIn: "10m"
            });
            const refreshToken = (0, _jwt.createToken)({
                sessionId: session._id
            }, {
                expiresIn: "1y"
            });
            res.cookie("authorization", `Bearer ${accessToken}`, {
                maxAge: 60000 * 60 * 24 * 365
            });
            res.cookie("refresh", `Bearer ${refreshToken}`, {
                maxAge: 60000 * 60 * 24 * 365
            });
            return user;
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    logoutUser: async (_, __, { req , res , Session  })=>{
        try {
            const { sessionId  } = (0, _hasUser.default)(req);
            const session = await Session.findById(sessionId);
            if (!session) throw new Error("Session not found");
            session.valid = false;
            await session.save();
            res.cookie("authorization", "", {
                maxAge: 1
            });
            res.cookie("refresh", "", {
                maxAge: 1
            });
            return "Logout success";
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    followUser: async (_, { followedUsername  }, { User , req  })=>{
        try {
            const user = (0, _hasUser.default)(req);
            const followedUser = await User.findOne({
                username: followedUsername
            });
            if (!followedUser) throw new _apolloServerExpress.UserInputError("Something went wrong. User does not exist");
            if (followedUser.followers.includes(user.username)) {
                followedUser.followers = followedUser.followers.filter((followerId)=>followerId !== user.username);
            } else {
                followedUser.followers.push(user.username);
            }
            await followedUser.save();
            return followedUser;
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    updateUserInfo: async (_, { input  }, { User , req  })=>{
        const username = input === null || input === void 0 ? void 0 : input.username;
        try {
            const user = (0, _hasUser.default)(req);
            if (user.username !== username) throw new _apolloServerExpress.AuthenticationError("You are not allowed to do that.");
            const userInfo = await User.findOneAndUpdate({
                username: user.username
            }, {
                $set: {
                    ...input
                }
            }, {
                new: true
            });
            if (!userInfo) throw new _apolloServerExpress.UserInputError("User not found");
            return userInfo;
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    createPost: async (_, { input: { image , caption  }  }, { Post , req  })=>{
        try {
            const user = (0, _hasUser.default)(req);
            const newPost = new Post({
                image,
                caption,
                username: user.username
            });
            return await newPost.save();
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    editPostCaption: async (_, { postId , caption  }, { Post , req  })=>{
        try {
            const user = (0, _hasUser.default)(req);
            const post = await Post.findOneAndUpdate({
                _id: postId,
                username: user.username
            }, {
                caption
            }, {
                new: true
            });
            if (!post) throw new _apolloServerExpress.UserInputError("Your are not allowed to do that. Post doesn't exist");
            return post;
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    deletePost: async (_, { postId  }, { Post , req  })=>{
        try {
            const user = (0, _hasUser.default)(req);
            const { deletedCount  } = await Post.deleteOne({
                _id: postId,
                username: user.username
            });
            if (!deletedCount) throw new _apolloServerExpress.UserInputError("You are not allowed to do that. Post deletion failed");
            return "deleted successfully";
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    likePost: async (_, { postId  }, { Post , req  })=>{
        try {
            const user = (0, _hasUser.default)(req);
            const post = await Post.findOne({
                _id: postId
            });
            if (!post) throw new _apolloServerExpress.UserInputError("Post does not exists");
            const likeIndex = post.likes.findIndex((username)=>username === user.username);
            if (likeIndex === -1) post.likes.push(user.username);
            else post.likes.splice(likeIndex, 1);
            return await post.save();
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    addComment: async (_, { input: { body , postId  }  }, { Comment , req  })=>{
        try {
            const user = (0, _hasUser.default)(req);
            const newComment = new Comment({
                body,
                postId,
                username: user.username
            });
            return await newComment.save();
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    editComment: async (_, { commentId , body  }, { Comment , req  })=>{
        try {
            const user = (0, _hasUser.default)(req);
            const comment = await Comment.findOneAndUpdate({
                _id: commentId,
                username: user.username
            }, {
                body
            }, {
                new: true
            });
            if (!comment) throw new _apolloServerExpress.UserInputError("You are not allowed to do that. Updating comment failed");
            return comment;
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    deleteComment: async (_, { commentId  }, { Comment , req  })=>{
        try {
            const user = (0, _hasUser.default)(req);
            const { deletedCount  } = await Comment.deleteOne({
                _id: commentId,
                username: user.username
            });
            if (!deletedCount) throw new _apolloServerExpress.UserInputError("You are not allowed to do that. Comment deletion failed");
            return "Sucessfully deleted the comment";
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    }
};
const _default = Mutation;
