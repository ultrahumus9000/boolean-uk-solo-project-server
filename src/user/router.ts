import { Router } from "express";
import { createNewUser, updateUser } from "./controller";
import tokenMiddleware from "../utils/middleware";

const userRouter = Router();

userRouter.post("/", createNewUser);
userRouter.patch("/", tokenMiddleware, updateUser);

export default userRouter;
