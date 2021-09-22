import { Request, Response } from "express";
import db from "../utils/database";
const { event } = db;

async function createNewEvent(req: Request, res: Response) {
  const content = req.body;
  try {
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

export { createNewEvent };
