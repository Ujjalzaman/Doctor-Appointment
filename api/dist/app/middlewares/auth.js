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
exports.auth = void 0;
const apiError_1 = __importDefault(require("../../errors/apiError"));
const jwtHelper_1 = require("../../helpers/jwtHelper");
const config_1 = __importDefault(require("../../config"));
const auth = (...rules) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new apiError_1.default(404, "Token is not Found !!");
        }
        let verifiedUser;
        try {
            verifiedUser = yield jwtHelper_1.JwtHelper.verifyToken(token, config_1.default.jwt.secret);
        }
        catch (error) {
            throw new apiError_1.default(403, "User is not Found !!");
        }
        req.user = verifiedUser;
        if (rules.length && !rules.includes(verifiedUser.role)) {
            throw new apiError_1.default(403, "You are not Authorised !!");
        }
        next();
    }
    catch (error) {
        next(error);
    }
});
exports.auth = auth;
