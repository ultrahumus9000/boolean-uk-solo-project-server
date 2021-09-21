const { Router } = require("express");

import { fetchAllMoveis } from "./controller";

const movieRouter = Router();

movieRouter.get("/", fetchAllMoveis);

export default movieRouter;
