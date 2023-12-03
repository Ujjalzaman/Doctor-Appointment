import express from 'express';
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';
import { doctorTimeSlotController } from './doctorTimeSlot.controller';

const router = express.Router();

router.get('/:id', auth(AuthUser.DOCTOR), doctorTimeSlotController.getTimeSlot);
router.post('/create', auth(AuthUser.DOCTOR), doctorTimeSlotController.createTimeSlot);
router.get('/', auth(AuthUser.DOCTOR), doctorTimeSlotController.getAllTimeSlot);
router.patch('/', auth(AuthUser.DOCTOR), doctorTimeSlotController.updateTimeSlot);
router.delete('/', auth(AuthUser.DOCTOR), doctorTimeSlotController.deleteTimeSlot);
router.get('/my-slot', auth(AuthUser.DOCTOR), doctorTimeSlotController.getMyTimeSlot);

export const AppointmentRouter = router;