const { Router } = require("express");

const publicRouter = Router();

import { getPublicEvent } from "./controller";

publicRouter.get("/", getPublicEvent);

export default publicRouter;
