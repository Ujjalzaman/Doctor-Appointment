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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            const { password } = payload, othersData = __rest(payload, ["password"]);
            const patient = yield tx.patient.create({
                data: othersData,
            });
            if (patient) {
                // Check Email existing
                const existEmail = yield tx.auth.findUnique({ where: { email: patient.email } });
                if (existEmail) {
                    throw new apiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Email Already Exist !!");
                }
                else {
                    const auth = yield tx.auth.create({
                        data: {
                            email: patient.email,
                            password: password && (yield bcrypt_1.default.hashSync(password, 12)),
                            role: client_1.UserRole.patient,
                            userId: patient.id
                        },
                    });
                    return {
                        patient,
                        auth,
                    };
                }
            }
        }));
        return data;
    }
    catch (error) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, error.message);
    }
});
exports.create = create;
