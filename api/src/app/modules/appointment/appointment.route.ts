import express from 'express';
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';
import { AppointmentController } from './appointment.controller';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get('/doctor', auth(AuthUser.DOCTOR), AppointmentController.doctorAppointment);
router.get('/doctor/update-appointment', auth(AuthUser.DOCTOR), AppointmentController.updateAppointmentByDoctor);
router.get('/patient', auth(AuthUser.PATIENT), AppointmentController.doctorAppointment);

export const AppointmentRouter = router;