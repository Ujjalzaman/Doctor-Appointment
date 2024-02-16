import express from 'express';
import { AuthController } from './auth.controller';
import path from 'path';

const router = express.Router();

router.post('/login', AuthController.Login);
router.post('/reset-password', AuthController.ResetPassword);
router.post('/reset-password/confirm', AuthController.PasswordResetConfirm);
router.get('/user/verify/:userId/:uniqueString', AuthController.VerifyUser);
router.get('/verified', AuthController.Verified);
router.get('/expired/link', AuthController.VerficationExpired);

export const AuthRouter = router;