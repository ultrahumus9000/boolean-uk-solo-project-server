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
exports.deleteOneFilm = exports.addOneFilm = exports.fetchAllMoveis = void 0;
const database_1 = __importDefault(require("../utils/database"));
const { movie } = database_1.default;
function fetchAllMoveis(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const movies = yield movie.findMany({
                orderBy: {
                    releaseDate: "asc",
                },
                select: {
                    id: true,
                    title: true,
                    overview: true,
                    releaseDate: true,
                    genre: true,
                    poster: true,
                },
            });
            res.json(movies);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    });
}
exports.fetchAllMoveis = fetchAllMoveis;
function addOneFilm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const filmData = req.body;
        try {
            const result = yield movie.create({
                data: filmData,
            });
            res.json(result);
        }
        catch (error) {
            console.log(error);
            res.json("fail to add");
        }
    });
}
exports.addOneFilm = addOneFilm;
function deleteOneFilm(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const movieId = Number(req.params.id);
        try {
            yield movie.delete({
                where: {
                    id: movieId,
                },
            });
            res.json("succeed deleted");
        }
        catch (error) {
            console.log(error);
            res.json("fail to delete");
        }
    });
}
exports.deleteOneFilm = deleteOneFilm;
