import express from 'express';
import { AppointmentController } from './appointment.controller';

const router = express.Router();

router.get('/:id', AppointmentController.getSingleAppointment);
router.post('/create', AppointmentController.createAppointment);
router.get('/', AppointmentController.getAllAppointment);
router.patch('/:id', AppointmentController.updateAppointment);
router.delete('/:id', AppointmentController.deleteAppointment);

export const AppointmentRouter = router;