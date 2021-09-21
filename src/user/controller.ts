import { User } from ".prisma/client";
import { Request, Response } from "express";
import db from "../utils/database";

import createNewUserWithHash from "./service";

const { user } = db;

async function createNewUser(req: Request, res: Response) {
  const newUser = req.body;
  try {
    const modifiedUser = await createNewUserWithHash(newUser);
    res.json(modifiedUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

async function updateUser(req: Request, res: Response) {
  const { id } = req.currentUser as User;
  try {
    res.json("");
  } catch (error) {
    res.status(401).json(error);
  }
}

export { createNewUser, updateUser };
