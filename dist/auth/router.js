"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const middleware_1 = __importDefault(require("../utils/middleware"));
const authRouter = (0, express_1.Router)();
authRouter.route("/login").post(controller_1.login);
authRouter.route("/logout").get(middleware_1.default, controller_1.logout);
authRouter.route("/token").get(controller_1.validateLoggedInToken);
exports.default = authRouter;
