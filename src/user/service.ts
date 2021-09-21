import db from "../utils/database";
import { hash } from "bcrypt";
import { User } from ".prisma/client";

const { user } = db;

async function createNewUserWithHash(newUser: User) {
  const plainPassword = newUser.password;

  const hashedPasseword = await hash(plainPassword, 10);

  const savedUser = await user.create({
    data: { ...newUser, password: hashedPasseword },
  });

  return savedUser;
}

export default createNewUserWithHash;
