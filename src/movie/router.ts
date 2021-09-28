const { Router } = require("express");

import { fetchAllMoveis, addOneFilm, deleteOneFilm } from "./controller";

const movieRouter = Router();

movieRouter.get("/", fetchAllMoveis);

movieRouter.post("/", addOneFilm);

movieRouter.delete("/:id", deleteOneFilm);

export default movieRouter;
