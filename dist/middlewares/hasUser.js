"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _apolloServerCore = require("apollo-server-core");
const hasUser = (req)=>{
    // @ts-ignore
    const user = req.user;
    if (!user) throw new _apolloServerCore.AuthenticationError("Authentication required");
    return user;
};
const _default = hasUser;
