"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const controller_1 = __importDefault(require("./controller"));
const paymentRouter = Router();
paymentRouter.post("/", controller_1.default);
exports.default = paymentRouter;
