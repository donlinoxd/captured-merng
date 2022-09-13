"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _mongoose = require("mongoose");
const sessionSchema = new _mongoose.Schema({
    username: String,
    email: String,
    name: String,
    valid: {
        type: Boolean
    }
}, {
    timeStamps: true
});
const _default = (0, _mongoose.model)("Session", sessionSchema);
