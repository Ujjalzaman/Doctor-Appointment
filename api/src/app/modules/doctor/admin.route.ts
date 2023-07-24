import express from 'express';
import { DoctorController } from './doctor.controller';

const router = express.Router();

router.get('/:id', DoctorController.getSingleDoctor);
router.get('/', DoctorController.getAllDoctor);
router.patch('/:id', DoctorController.updateDoctor);
router.delete('/:id', DoctorController.deleteDoctor);

export const DoctorRouter = router;