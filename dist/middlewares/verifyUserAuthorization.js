"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _jwt = require("./../utils/jwt");
const _jwt1 = require("../utils/jwt");
const _sessionModel = /*#__PURE__*/ _interopRequireDefault(require("../models/session.model"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const verifyUserAuthorization = async (req, res, next)=>{
    try {
        var ref, ref1, ref2, ref3;
        const accessToken = (ref = req.cookies) === null || ref === void 0 ? void 0 : (ref1 = ref.authorization) === null || ref1 === void 0 ? void 0 : ref1.split(" ")[1];
        const refreshToken = (ref2 = req.cookies) === null || ref2 === void 0 ? void 0 : (ref3 = ref2.refresh) === null || ref3 === void 0 ? void 0 : ref3.split(" ")[1];
        if (!accessToken) return next();
        const { payload , expired , valid  } = await (0, _jwt1.verifyToken)(accessToken);
        if (!payload && !expired && !valid) {
            return next();
        }
        if (payload && !expired) {
            // @ts-ignore
            req.user = payload;
            return next();
        }
        if (expired && refreshToken) {
            const { payload: payload1 , valid: valid1  } = await (0, _jwt1.verifyToken)(refreshToken);
            if (!valid1 || !payload1) {
                res.cookie("authorization", "", {
                    maxAge: 1
                });
                res.cookie("refresh", "", {
                    maxAge: 1
                });
                return next();
            }
            const session = await _sessionModel.default.findById(payload1.sessionId);
            if (session) {
                if (!session.valid) return next();
                const newAccessToken = (0, _jwt.createToken)({
                    username: session.username,
                    email: session.email,
                    name: session.name,
                    sessionId: session._id
                }, {
                    expiresIn: "10m"
                });
                const newRefreshToken = (0, _jwt.createToken)({
                    sessionId: session._id
                }, {
                    expiresIn: "1y"
                });
                res.cookie("authorization", `Bearer ${newAccessToken}`, {
                    maxAge: 60000 * 60 * 24 * 365
                });
                res.cookie("refresh", `Bearer ${newRefreshToken}`, {
                    maxAge: 60000 * 60 * 24 * 365
                });
                // @ts-ignore
                req.user = {
                    username: session.username,
                    email: session.email,
                    name: session.name,
                    sessionId: session._id
                };
                return next();
            }
            return next();
        }
        return next();
    } catch (error) {
        res.cookie("authorization", "", {
            maxAge: 1
        });
        res.cookie("refresh", "", {
            maxAge: 1
        });
        return next();
    }
};
const _default = verifyUserAuthorization;
