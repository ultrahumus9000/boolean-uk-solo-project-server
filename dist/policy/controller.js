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
exports.updatePolicy = exports.getPolicy = void 0;
const database_1 = __importDefault(require("../utils/database"));
const { policy } = database_1.default;
function getPolicy(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const policyResult = yield policy.findFirst();
            res.json(policyResult);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    });
}
exports.getPolicy = getPolicy;
//   id       Int      @id @default(autoincrement())
//   date     DateTime @unique @db.Date
//   agendas  Agenda[]
//   cinema   Cinema   @relation(fields: [cinemaId], references: [id])
//   cinemaId Int
function updatePolicy(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const policyResult = yield policy.findFirst();
            res.json(policyResult);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    });
}
exports.updatePolicy = updatePolicy;
