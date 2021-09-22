const { Router } = require("express");

const cinemaRouter = Router();

import { getCinemaInfo } from "./controller";

cinemaRouter.get("/", getCinemaInfo);

export default cinemaRouter;
