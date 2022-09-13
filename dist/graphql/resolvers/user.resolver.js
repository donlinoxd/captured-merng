"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _errorHandler = require("./../../utils/errorHandler");
const User = {
    following: async ({ username  }, _, { User  })=>{
        try {
            const users = await (await User.find({
                followers: username
            })).map((user)=>user.username);
            return users;
        } catch (error) {
            throw (0, _errorHandler.errorHandler)(error);
        }
    },
    updatedAt: ({ updatedAt  })=>updatedAt.toLocaleString(),
    createdAt: ({ updatedAt  })=>updatedAt.toLocaleString()
};
const _default = User;
