const { Router } = require("express");

import { fetchAllMoveis, deleteOutDatedFilms } from "./controller";

const movieRouter = Router();

movieRouter.get("/", fetchAllMoveis);

export default movieRouter;
