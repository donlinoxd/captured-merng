"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: ()=>_default
});
const _express = require("express");
const _sessionController = require("../controllers/session.controller");
const router = (0, _express.Router)();
router.post("/", _sessionController.createSessionHandler);
router.delete("/", _sessionController.deleteSessionHandler);
const _default = router;
