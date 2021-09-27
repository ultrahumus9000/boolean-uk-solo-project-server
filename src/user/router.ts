import { Router } from "express";
import { createNewUser, updateUser, updateUserPassword } from "./controller";
import tokenMiddleware from "../utils/middleware";

const userRouter = Router();

userRouter.post("/", createNewUser);
userRouter.patch("/", tokenMiddleware, updateUser);
userRouter.patch("/password", tokenMiddleware, updateUserPassword);
export default userRouter;
