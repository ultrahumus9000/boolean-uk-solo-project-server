"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const transactionRouter = Router();
const controller_1 = __importDefault(require("./controller"));
transactionRouter.post("/", controller_1.default);
exports.default = transactionRouter;
