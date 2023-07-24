import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.get('/:id', AuthController.getSingleAuth);
router.get('/', AuthController.getAllAuth);
router.patch('/:id', AuthController.updateAuth);
router.delete('/:id', AuthController.deleteAuth);

router.post('/create-admin', AuthController.createAdmin);
router.post('/create-doctor', AuthController.createDoctor);
router.post('/create-patient', AuthController.createPatient);

export const AuthRouter = router;