"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "findUser", {
    enumerable: true,
    get: ()=>findUser
});
const _userModel = /*#__PURE__*/ _interopRequireDefault(require("../models/user.model"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const findUser = async (username)=>{
    try {
        const user = await _userModel.default.findOne({
            username
        });
        if (!user) throw new Error("Invalid username or password");
        return user;
    } catch (error) {
        throw error;
    }
};
