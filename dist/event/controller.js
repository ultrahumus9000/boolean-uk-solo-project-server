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
exports.getLastestEvent = exports.createNewEvent = void 0;
const database_1 = __importDefault(require("../utils/database"));
const { event, agenda } = database_1.default;
function basicCreateEvent({ newDate, cinemaId, movies, showTime, quantity, }) {
    var showTime_1, showTime_1_1;
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const newEvent = yield event.create({
            data: {
                date: newDate,
                cinemaId,
            },
        });
        for (const movie of movies) {
            try {
                for (showTime_1 = (e_1 = void 0, __asyncValues(showTime)); showTime_1_1 = yield showTime_1.next(), !showTime_1_1.done;) {
                    const timeSlot = showTime_1_1.value;
                    const modifiedDate = new Date(Number(newDate.slice(0, 4)), Number(newDate.slice(5, 7)), Number(newDate.slice(8, 10)), Number(timeSlot.slice(0, 2)), Number(timeSlot.slice(3, 5))).toISOString();
                    const newAgenda = yield agenda.create({
                        data: {
                            movieId: movie,
                            screening: movies.indexOf(movie) + 1,
                            showTime: modifiedDate,
                            eventId: newEvent.id,
                            quantity,
                        },
                    });
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (showTime_1_1 && !showTime_1_1.done && (_a = showTime_1.return)) yield _a.call(showTime_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        return true;
    });
}
function basicLoopCreateEvent({ date, repeatDigit, cinemaId, movies, showTime, quantity, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const repeatArray = Array(repeatDigit).fill("");
        const orginaldate = new Date(date);
        for (let i = 0; i < repeatArray.length; i++) {
            let newDate = "";
            let modifiedDate = 0;
            if (i === 0) {
                modifiedDate = orginaldate.setDate(orginaldate.getDate() + 0);
            }
            else {
                modifiedDate = orginaldate.setDate(orginaldate.getDate() + 1);
            }
            newDate = new Date(modifiedDate).toISOString();
            const result = yield basicCreateEvent({
                newDate,
                cinemaId,
                movies,
                showTime,
                quantity,
            });
        }
    });
}
function createNewEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // need create new event with new agenda if there isnt any here
        const { date, cinemaId, movies, showTime, screening, quantity, repeat } = req.body;
        try {
            if (repeat !== "none") {
                if (repeat === "one") {
                    //library method
                    // const result = add(
                    //   new Date(
                    //     Number(modifiedDate.slice(0, 4)),
                    //     Number(modifiedDate.slice(5, 7)),
                    //     Number(modifiedDate.slice(8, 10))
                    //   ),
                    //   {
                    //     months: -1,
                    //     days: 3,
                    //   }
                    // );
                    const repeatDigit = 7;
                    yield basicLoopCreateEvent({
                        date,
                        repeatDigit,
                        cinemaId,
                        movies,
                        showTime,
                        quantity,
                    });
                }
                else if (repeat === "two") {
                    const repeatDigit = 14;
                    yield basicLoopCreateEvent({
                        date,
                        repeatDigit,
                        cinemaId,
                        movies,
                        showTime,
                        quantity,
                    });
                }
                else {
                    const repeatDigit = 30;
                    yield basicLoopCreateEvent({
                        date,
                        repeatDigit,
                        cinemaId,
                        movies,
                        showTime,
                        quantity,
                    });
                }
            }
            else {
                const newDate = new Date(date).toISOString();
                yield basicCreateEvent({
                    newDate,
                    cinemaId,
                    movies,
                    showTime,
                    quantity,
                });
            }
            res.json("succeed");
        }
        catch (error) {
            console.log(error);
            res.json("fail");
        }
    });
}
exports.createNewEvent = createNewEvent;
function getLastestEvent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const lastestEvent = yield event.findFirst({
                orderBy: {
                    date: "desc",
                },
            });
            res.json(lastestEvent);
        }
        catch (error) { }
    });
}
exports.getLastestEvent = getLastestEvent;
