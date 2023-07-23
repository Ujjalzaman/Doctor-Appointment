import express from 'express';
import { DoctorTimeSlotController } from './doctorTimeSlot.controller';

const router = express.Router();

router.get('/:id', DoctorTimeSlotController.getSingleDoctorTimeSlot);
router.post('/create', DoctorTimeSlotController.createDoctorTimeSlot);
router.get('/', DoctorTimeSlotController.getAllDoctorTimeSlot);
router.patch('/:id', DoctorTimeSlotController.updateDoctorTimeSlot);
router.delete('/:id', DoctorTimeSlotController.deleteDoctorTimeSlot);

export const DoctorTimeSlotRouter = router;