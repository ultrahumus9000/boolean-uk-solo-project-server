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
exports.updateUserPassword = exports.updateUser = exports.createNewUser = void 0;
const database_1 = __importDefault(require("../utils/database"));
const bcrypt_1 = require("bcrypt");
const bcrypt_2 = require("bcrypt");
const service_1 = __importDefault(require("./service"));
const { user } = database_1.default;
function createNewUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const newUser = req.body;
        try {
            const modifiedUser = yield (0, service_1.default)(newUser);
            res.json(modifiedUser);
        }
        catch (error) {
            console.log(error);
            res.json(error);
        }
    });
}
exports.createNewUser = createNewUser;
function updateUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.currentUser;
        const updateInfo = req.body;
        try {
            const orginalUserInfo = yield user.findUnique({
                where: {
                    id,
                },
            });
            const updatedUserInfo = Object.assign(Object.assign({}, orginalUserInfo), updateInfo);
            const updatedResult = yield user.update({
                where: {
                    id,
                },
                data: updatedUserInfo,
            });
            const { username, firstName, lastName, email, avatar, role } = updatedResult;
            res.json({ username, firstName, lastName, email, avatar, role });
        }
        catch (error) {
            res.status(401).json(error);
        }
    });
}
exports.updateUser = updateUser;
function updateUserPassword(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { originPassword, newPassword } = req.body;
        const { id } = req.currentUser;
        try {
            const foundUser = yield user.findUnique({
                where: {
                    id,
                },
            });
            if (!foundUser) {
                return null;
            }
            const passwordCompareResult = yield (0, bcrypt_1.compare)(originPassword, foundUser.password);
            if (passwordCompareResult) {
                const hashedPasseword = yield (0, bcrypt_2.hash)(newPassword, 10);
                yield user.update({
                    where: {
                        id,
                    },
                    data: {
                        password: hashedPasseword,
                    },
                });
                res.json("your password changed successfully");
            }
            else {
                throw new Error("Original Password Doesnt Match,fail");
            }
        }
        catch (error) {
            console.log(error);
            res.status(401).json(error);
        }
    });
}
exports.updateUserPassword = updateUserPassword;
