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
exports.getCinemaInfo = void 0;
const database_1 = __importDefault(require("../utils/database"));
const { cinema } = database_1.default;
function getCinemaInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const cinemaInfo = yield cinema.findUnique({
                where: {
                    id: 1,
                },
                include: {
                    staff: {
                        where: {
                            role: "Admin",
                        },
                        select: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
            });
            res.json(cinemaInfo);
        }
        catch (error) {
            res.json(error);
        }
    });
}
exports.getCinemaInfo = getCinemaInfo;
