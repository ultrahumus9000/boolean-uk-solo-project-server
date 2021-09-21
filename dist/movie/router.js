"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const controller_1 = require("./controller");
const movieRouter = Router();
movieRouter.get("/", controller_1.fetchAllMoveis);
exports.default = movieRouter;
