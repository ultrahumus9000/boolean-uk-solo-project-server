import { User } from ".prisma/client";
import { Request, Response } from "express";

import db from "../utils/database";
const { transaction, agenda } = db;

async function addTransaction(req: Request, res: Response) {
  const { id } = req.currentUser as User;
  const { policyId, movieId, quantity, agendaId, total } = req.body;
  const newDate = new Date().toISOString();
  try {
    const newTransaction = await transaction.create({
      data: {
        guestId: id,
        orderTime: newDate,
        quantity,
        agendaId,
        cinemaId: 1,
        total,
        policyId,
      },
    });

    const orginalTicketQuantity = await agenda.findUnique({
      where: {
        id: agendaId,
      },
      select: {
        quantity: true,
      },
    });

    if (!orginalTicketQuantity) {
      return null;
    }
    const modifyAgenda = await agenda.update({
      where: {
        id: agendaId,
      },
      data: {
        quantity: orginalTicketQuantity?.quantity - quantity,
      },
    });

    console.log({ newTransaction, orginalTicketQuantity, modifyAgenda });
    res.json({ newTransaction, orginalTicketQuantity, modifyAgenda });
  } catch (error) {
    console.log(error);
    res.json("fail");
  }
}

export default addTransaction;

// id        Int      @id @default(autoincrement())
// guest     User     @relation(fields: [guestId], references: [id], onDelete: Cascade)
// guestId   Int
// orderTime DateTime @default(now())
// agenda    Agenda   @relation(fields: [agendaId], references: [id])
// quantity  Int
// total     Float
// agendaId  Int
// cinema    Cinema   @relation(fields: [cinemaId], references: [id])
// cinemaId  Int
// policy    Policy   @relation(fields: [policyId], references: [id])
// policyId  Int

// model Movie {
//     id          Int      @id @default(autoincrement())
//     releaseDate String
//     genre       String
//     title       String
//     overview    String
//     poster      String
//     duration    String   @default("100 mins")
//     agendas     Agenda[]
//   }

//   model Agenda {
//     id           Int           @id @default(autoincrement())
//     movie        Movie         @relation(fields: [movieId], references: [id], onDelete: Cascade)
//     movieId      Int
//     screening    Int
//     showTime     DateTime      @db.Time
//     event        Event         @relation(fields: [eventId], references: [id])
//     eventId      Int
//     transactions Transaction[]
//     quantity     Int           @default(60)

//   }

//   model Policy {
//     id           Int           @id @default(autoincrement())
//     adultPrice   Float         @default(10.00)
//     childPrice   Float         @default(6.00)
//     discount     Int           @default(10)
//     condition    Int           @default(4)
//     transactions Transaction[]
//   }
