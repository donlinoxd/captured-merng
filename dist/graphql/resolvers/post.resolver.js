"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const Post = {
    comments: async ({ _id  }, _, { Comment  })=>{
        try {
            return await Comment.find({
                postId: _id
            }).sort({
                createdAt: -1
            }).limit(5);
        } catch (error) {
            throw error;
        }
    },
    commentCount: async ({ _id  }, _, { Comment  })=>{
        try {
            const comments = await Comment.find({
                postId: _id
            });
            return comments.length;
        } catch (error) {
            throw error;
        }
    },
    likeCount: (post)=>post.likes.length,
    updatedAt: ({ updatedAt  })=>updatedAt.toLocaleString(),
    createdAt: ({ createdAt  })=>createdAt.toLocaleString()
};
const _default = Post;
