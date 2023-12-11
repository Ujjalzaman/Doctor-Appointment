import express from 'express';
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';
import { PrescriptionController } from './prescription.controller';

const router = express.Router();

router.post('/create', auth(AuthUser.DOCTOR), PrescriptionController.createPrescription);

export const PrescriptionRouter = router;