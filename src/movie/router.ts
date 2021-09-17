const { Router } = require("express");

import { originalFetchAllMoveis } from "./controller";

const movieRouter = Router();

movieRouter.get("/", originalFetchAllMoveis);

export default movieRouter;
