"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require("express");
const cinemaRouter = Router();
const controller_1 = require("./controller");
cinemaRouter.get("/", controller_1.getCinemaInfo);
exports.default = cinemaRouter;
