import { Request, Response } from "express";
import db from "../utils/database";
const { policy } = db;

async function getPolicy(req: Request, res: Response) {
  try {
    const policyResult = await policy.findFirst();
    res.json(policyResult);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}
//   id       Int      @id @default(autoincrement())
//   date     DateTime @unique @db.Date
//   agendas  Agenda[]
//   cinema   Cinema   @relation(fields: [cinemaId], references: [id])
//   cinemaId Int
async function updatePolicy(req: Request, res: Response) {
  try {
    const policyResult = await policy.findFirst();
    res.json(policyResult);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
}

export { getPolicy, updatePolicy };
