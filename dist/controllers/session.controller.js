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
    createSessionHandler: ()=>createSessionHandler,
    deleteSessionHandler: ()=>deleteSessionHandler
});
const _hasUser = /*#__PURE__*/ _interopRequireDefault(require("../middlewares/hasUser"));
const _sessionService = require("../services/session.service");
const _jwt = require("../utils/jwt");
const _sessionModel = /*#__PURE__*/ _interopRequireDefault(require("../models/session.model"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const createSessionHandler = async (req, res)=>{
    try {
        const { username , password  } = req.body;
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
            maxAge: 600000
        });
        res.cookie("refresh", `Bearer ${refreshToken}`, {
            maxAge: 60000 * 60 * 24 * 365
        });
        res.status(201).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name
            }
        });
    } catch (error) {
        return res.status(400).json(error);
    }
};
const deleteSessionHandler = async (req, res)=>{
    try {
        const { sessionId  } = (0, _hasUser.default)(req);
        const session = await _sessionModel.default.findById(sessionId);
        if (!session) throw new Error("Session not found");
        session.valid = false;
        await session.save();
        res.json("Log out success");
    } catch (error) {
        res.status(400).json({
            error
        });
    }
};
