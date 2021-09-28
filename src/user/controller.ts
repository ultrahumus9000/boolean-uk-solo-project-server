import { User } from ".prisma/client";
import { Request, Response } from "express";
import db from "../utils/database";
import { compare } from "bcrypt";
import { hash } from "bcrypt";
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
  const updateInfo = req.body;
  try {
    const orginalUserInfo = await user.findUnique({
      where: {
        id,
      },
    });

    const updatedUserInfo = { ...orginalUserInfo, ...updateInfo };

    const updatedResult = await user.update({
      where: {
        id,
      },
      data: updatedUserInfo,
    });

    const { username, firstName, lastName, email, avatar, role } =
      updatedResult;

    res.json({ username, firstName, lastName, email, avatar, role });
  } catch (error) {
    res.status(401).json(error);
  }
}
async function updateUserPassword(req: Request, res: Response) {
  const { originPassword, newPassword } = req.body;

  const { id } = req.currentUser as User;

  try {
    const foundUser = await user.findUnique({
      where: {
        id,
      },
    });

    if (!foundUser) {
      return null;
    }

    const passwordCompareResult = await compare(
      originPassword,
      foundUser.password
    );

    if (passwordCompareResult) {
      const hashedPasseword = await hash(newPassword, 10);

      await user.update({
        where: {
          id,
        },
        data: {
          password: hashedPasseword,
        },
      });

      res.json("your password changed successfully");
    } else {
      throw new Error("Original Password Doesnt Match,fail");
    }
  } catch (error) {
    console.log(error);
    res.status(401).json(error);
  }
}

export { createNewUser, updateUser, updateUserPassword };
