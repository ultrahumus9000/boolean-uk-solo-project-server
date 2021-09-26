const { Router } = require("express");

const policyRouter = Router();

import { getPolicy, updatePolicy } from "./controller";

policyRouter.get("/", getPolicy);
policyRouter.patch("/", updatePolicy);

export default policyRouter;
