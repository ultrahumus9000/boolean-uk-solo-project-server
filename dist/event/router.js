"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const eventRouter = Router();
const controller_1 = require("./controller");
eventRouter.post("/", controller_1.createNewEvent);
exports.default = eventRouter;
