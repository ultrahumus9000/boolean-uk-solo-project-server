import { Request, Response } from "express";
import findUserWithValidation from "./service";
import db from "../utils/database";

import { createToken, validateToken } from "../utils//authgenerator";

const { user } = db;

async function login(req: Request, res: Response) {
  const userCredtial = req.body;

  try {
    const loginUser = await findUserWithValidation(userCredtial);
    const loggedRole = loginUser.role;

    const tokenOne = createToken({
      id: loginUser.id,
      username: loginUser.username,
      email: loginUser.email,
      role: loggedRole,
    });

    res.cookie("tokenOne", tokenOne, {
      httpOnly: true,
    });

    const loggedUser = {
      username: loginUser.username,
      firstName: loginUser.firstName,
      lastName: loginUser.lastName,
      email: loginUser.email,
      avatar: loginUser.avatar,
      role: loggedRole,
    };
    res.json(loggedUser);
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
}

async function logout(req: Request, res: Response) {
  res.clearCookie("tokenOne");
  res.json("You've been succesfully logged out");
}

async function validateLoggedInToken(req: Request, res: Response) {
  const token = req.cookies.token;

  const tokenPayload = token && validateToken(token);

  if (tokenPayload) {
    const userData = await user.findUnique({
      where: {
        id: parseInt(tokenPayload.id),
      },
      select: {
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        avatar: true,
        role: true,
      },
    });
    const tokenUserData = { ...userData };

    res.json(tokenUserData);
  } else {
    res.status(401).json({ err: "No valid token was found" });
  }
}

export { login, logout, validateLoggedInToken };
