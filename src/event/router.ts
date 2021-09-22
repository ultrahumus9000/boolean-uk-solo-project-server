const { Router } = require("express");

const eventRouter = Router();

import { createNewEvent } from "./controller";

eventRouter.post("/", createNewEvent);

export default eventRouter;
