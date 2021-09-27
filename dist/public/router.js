"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const publicRouter = Router();
const controller_1 = require("./controller");
publicRouter.post("/", controller_1.getPublicEvent);
exports.default = publicRouter;
