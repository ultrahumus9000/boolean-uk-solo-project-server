"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const transactionRouter = Router();
const controller_1 = require("./controller");
transactionRouter.get("/revenue", controller_1.getRevenue);
transactionRouter.post("/", controller_1.addTransaction);
exports.default = transactionRouter;
