"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    authenticateUser: ()=>authenticateUser,
    createSession: ()=>createSession
});
const _apolloServerCore = require("apollo-server-core");
const _sessionModel = /*#__PURE__*/ _interopRequireDefault(require("../models/session.model"));
const _userModel = /*#__PURE__*/ _interopRequireDefault(require("../models/user.model"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const authenticateUser = async (username, password)=>{
    try {
        const user = await _userModel.default.findOne({
            username
        });
        if (!user) throw new _apolloServerCore.AuthenticationError("Invalid username or password");
        const isValid = await user.validatePassword(password);
        if (!isValid) throw new _apolloServerCore.AuthenticationError("Invalid username or password");
        return user;
    } catch (error) {
        throw error;
    }
};
const createSession = async ({ username , email , name  })=>{
    try {
        const session = new _sessionModel.default({
            username,
            email,
            name,
            valid: true
        });
        return await session.save();
    } catch (error) {
        throw error;
    }
};
