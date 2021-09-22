import { Request, Response } from "express";
import db from "../utils/database";
const { event } = db;

async function createNewEvent() {}
//   id       Int      @id @default(autoincrement())
//   date     DateTime @unique @db.Date
//   agendas  Agenda[]
//   cinema   Cinema   @relation(fields: [cinemaId], references: [id])
//   cinemaId Int

export { createNewEvent };
