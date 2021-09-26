"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const policyRouter = Router();
const controller_1 = require("./controller");
policyRouter.get("/", controller_1.getPolicy);
policyRouter.patch("/", controller_1.updatePolicy);
exports.default = policyRouter;
