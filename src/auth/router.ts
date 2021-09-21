import { Router } from "express";
import { login, logout, validateLoggedInToken } from "./controller";
import middleware from "../utils/middleware";

const authRouter = Router();

authRouter.route("/login").post(login);

authRouter.route("/logout").get(middleware, logout);

authRouter.route("/token").get(validateLoggedInToken);

export default authRouter;
