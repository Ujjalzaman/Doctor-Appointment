"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const router = express_1.default.Router();
router.post('/login', auth_controller_1.AuthController.Login);
router.post('/reset-password', auth_controller_1.AuthController.ResetPassword);
router.post('/reset-password/confirm', auth_controller_1.AuthController.PasswordResetConfirm);
router.get('/user/verify/:userId/:uniqueString', auth_controller_1.AuthController.VerifyUser);
router.get('/verified', auth_controller_1.AuthController.Verified);
router.get('/expired/link', auth_controller_1.AuthController.VerficationExpired);
exports.AuthRouter = router;
