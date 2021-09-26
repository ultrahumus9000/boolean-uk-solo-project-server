import { Request, Response } from "express";
import db from "../utils/database";
const { event, agenda } = db;

async function createNewEvent(req: Request, res: Response) {
  // need create new event with new agenda if there isnt any here
  const { date, cinemaId, movies, showTime, screening, quantity } = req.body;
  try {
    // {
    //   date: '2021-09-26',
    //   cinemaId: 1,
    //   movies: [ 6, 8, 10, 12, 14 ],
    //   quantity: 60,
    //   showTime: [ '11:00', '14:00', '17:00', '20:00' ],
    //   screening: 5
    // }
    //
    //
    // id       Int      @id @default(autoincrement())
    // date     DateTime @unique @db.Date
    // agendas  Agenda[]
    // cinema   Cinema   @relation(fields: [cinemaId], references: [id])
    // cinemaId Int
    //
    //
    // id           Int           @id @default(autoincrement())
    // movie        Movie         @relation(fields: [movieId], references: [id], onDelete: Cascade)
    // movieId      Int           @unique
    // screening    Int
    // showTime     DateTime      @db.Time
    // event        Event         @relation(fields: [eventId], references: [id])
    // eventId      Int
    // transactions Transaction[]
    // quantity     Int           @default(60)

    const newEvent = await event.create({
      data: {
        date,
        cinemaId,
      },
    });

    for await (const movie of movies) {
      const newAgenda = await agenda.findMany({
        where: {
          movieId: movie,
        },
      });

      if (newAgenda.length === 0) {
        for await (const timeSlot of showTime) {
          const newDate = new Date(
            date.slice(0, 4),
            date.slice(5, 7),
            date.slice(8, 10),
            timeSlot.slice(0, 2),
            timeSlot.slice(3, 5)
          ).toISOString();

          const newAgenda = await agenda.create({
            data: {
              movieId: movie,
              screening: movies.indexOf(movie) + 1,
              showTime: newDate,
              eventId: newEvent.id,
              quantity,
            },
          });
        }
      } else {
      }
    }
  } catch (error) {
    console.log(error);
    res.json("fail");
  }
}
//   id       Int      @id @default(autoincrement())
//   date     DateTime @unique @db.Date
//   agendas  Agenda[]
//   cinema   Cinema   @relation(fields: [cinemaId], references: [id])
//   cinemaId Int

export { createNewEvent };
