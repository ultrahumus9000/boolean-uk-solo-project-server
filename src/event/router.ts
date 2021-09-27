const { Router } = require("express");

const eventRouter = Router();

import { createNewEvent, getLastestEvent } from "./controller";

eventRouter.post("/", createNewEvent);
eventRouter.get("/lastest", getLastestEvent);

export default eventRouter;
