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
const database_1 = __importDefault(require("../utils/database"));
const { transaction, agenda } = database_1.default;
function addTransaction(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.currentUser;
        const { policyId, movieId, quantity, agendaId, total } = req.body;
        const newDate = new Date().toISOString();
        try {
            const newTransaction = yield transaction.create({
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
            const orginalTicketQuantity = yield agenda.findUnique({
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
            const modifyAgenda = yield agenda.update({
                where: {
                    id: agendaId,
                },
                data: {
                    quantity: (orginalTicketQuantity === null || orginalTicketQuantity === void 0 ? void 0 : orginalTicketQuantity.quantity) - quantity,
                },
            });
            console.log({ newTransaction, orginalTicketQuantity, modifyAgenda });
            res.json({ newTransaction, orginalTicketQuantity, modifyAgenda });
        }
        catch (error) {
            console.log(error);
            res.json("fail");
        }
    });
}
exports.default = addTransaction;
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
