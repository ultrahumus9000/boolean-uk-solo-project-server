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
exports.getPublicEvent = void 0;
const database_1 = __importDefault(require("../utils/database"));
const { event, agenda, movie } = database_1.default;
function getPublicEvent(req, res) {
    var e_1, _a;
    return __awaiter(this, void 0, void 0, function* () {
        const today = new Date();
        try {
            const eventId = yield event.findUnique({
                where: {
                    date: today,
                },
                select: {
                    id: true,
                },
            });
            if (!eventId) {
                return null;
            }
            const todayEventId = eventId.id;
            const rawMovieIds = yield agenda.groupBy({
                by: ["movieId"],
                where: {
                    eventId: todayEventId,
                },
            });
            let movieInfos = [];
            try {
                for (var rawMovieIds_1 = __asyncValues(rawMovieIds), rawMovieIds_1_1; rawMovieIds_1_1 = yield rawMovieIds_1.next(), !rawMovieIds_1_1.done;) {
                    const ele = rawMovieIds_1_1.value;
                    const movieInfo = yield movie.findUnique({
                        where: {
                            id: ele.movieId,
                        },
                        include: {
                            agendas: true,
                        },
                    });
                    const agendaForToday = movieInfo === null || movieInfo === void 0 ? void 0 : movieInfo.agendas.filter((agenda) => agenda.eventId === todayEventId);
                    if (!agendaForToday) {
                        return null;
                    }
                    const modifiedMovieInfo = Object.assign(Object.assign({}, movieInfo), { agendas: agendaForToday });
                    movieInfos.push(modifiedMovieInfo);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (rawMovieIds_1_1 && !rawMovieIds_1_1.done && (_a = rawMovieIds_1.return)) yield _a.call(rawMovieIds_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            res.json(movieInfos);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    });
}
exports.getPublicEvent = getPublicEvent;
// const rawEvents = await event.findUnique({
//     where: {
//       date: today,
//     },
//     select: {
//       date: true,
//       id: true,
//       agendas: {
//         select: {
//           movie: true,
//           showTime: true,
//           screening: true,
//           quantity: true,
//           movieId: true,
//         },
//       },
//     },
//   });
