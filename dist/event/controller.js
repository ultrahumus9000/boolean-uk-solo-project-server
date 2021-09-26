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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createNewEvent = void 0;
const database_1 = __importDefault(require("../utils/database"));
const { event, agenda } = database_1.default;
function createNewEvent(req, res) {
    var e_1, _a, e_2, _b;
    return __awaiter(this, void 0, void 0, function* () {
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
            const newEvent = yield event.create({
                data: {
                    date,
                    cinemaId,
                },
            });
            try {
                for (var movies_1 = __asyncValues(movies), movies_1_1; movies_1_1 = yield movies_1.next(), !movies_1_1.done;) {
                    const movie = movies_1_1.value;
                    const newAgenda = yield agenda.findMany({
                        where: {
                            movieId: movie,
                        },
                    });
                    if (newAgenda.length === 0) {
                        try {
                            for (var showTime_1 = (e_2 = void 0, __asyncValues(showTime)), showTime_1_1; showTime_1_1 = yield showTime_1.next(), !showTime_1_1.done;) {
                                const timeSlot = showTime_1_1.value;
                                const newDate = new Date(date.slice(0, 4), date.slice(5, 7), date.slice(8, 10), timeSlot.slice(0, 2), timeSlot.slice(3, 5)).toISOString();
                                const newAgenda = yield agenda.create({
                                    data: {
                                        movieId: movie,
                                        screening: movies.indexOf(movie) + 1,
                                        showTime: newDate,
                                        eventId: newEvent.id,
                                        quantity,
                                    },
                                });
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (showTime_1_1 && !showTime_1_1.done && (_b = showTime_1.return)) yield _b.call(showTime_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                    }
                    else {
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (movies_1_1 && !movies_1_1.done && (_a = movies_1.return)) yield _a.call(movies_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        catch (error) {
            console.log(error);
            res.json("fail");
        }
    });
}
exports.createNewEvent = createNewEvent;
