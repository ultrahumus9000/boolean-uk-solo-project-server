"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastestEvent = exports.createNewEvent = void 0;
const database_1 = __importDefault(require("../utils/database"));
const { event, agenda } = database_1.default;
function createNewEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // need create new event with new agenda if there isnt any here
        // const { date, cinemaId, movies, showTime, screening, quantity, repeat } =
        //   req.body;
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
            // if (repeat !== "none") {
            //   if (repeat === "one") {
            //     const repeatArray = Array(7).fill("");
            //   } else if (repeat === "two") {
            //   } else {
            //   }
            // } else {
            //   const newEvent = await event.create({
            //     data: {
            //       date,
            //       cinemaId,
            //     },
            //   });
            //   for await (const movie of movies) {
            //     for await (const timeSlot of showTime) {
            //       const newDate = new Date(
            //         date.slice(0, 4),
            //         date.slice(5, 7),
            //         date.slice(8, 10),
            //         timeSlot.slice(0, 2),
            //         timeSlot.slice(3, 5)
            //       ).toISOString();
            //       const newAgenda = await agenda.create({
            //         data: {
            //           movieId: movie,
            //           screening: movies.indexOf(movie) + 1,
            //           showTime: newDate,
            //           eventId: newEvent.id,
            //           quantity,
            //         },
            //       });
            //     }
            //   }
            // }
            // res.json("succeed");
        }
        catch (error) {
            console.log(error);
            res.json("fail");
        }
    });
}
exports.createNewEvent = createNewEvent;
//   id       Int      @id @default(autoincrement())
//   date     DateTime @unique @db.Date
//   agendas  Agenda[]
//   cinema   Cinema   @relation(fields: [cinemaId], references: [id])
//   cinemaId Int
function getLastestEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lastestEvent = yield event.findFirst({
                orderBy: {
                // date: "desc",
                },
            });
            res.json(lastestEvent);
        }
        catch (error) { }
    });
}
exports.getLastestEvent = getLastestEvent;
