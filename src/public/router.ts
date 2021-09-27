const { Router } = require("express");

const publicRouter = Router();

import { getPublicEvent } from "./controller";

publicRouter.post("/", getPublicEvent);

export default publicRouter;
