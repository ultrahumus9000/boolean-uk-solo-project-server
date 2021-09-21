"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controller_1 = require("./controller");
const middleware_1 = __importDefault(require("../utils/middleware"));
const userRouter = (0, express_1.Router)();
userRouter.post("/", controller_1.createNewUser);
userRouter.patch("/", middleware_1.default, controller_1.updateUser);
exports.default = userRouter;
