import express from 'express';
import { DoctorController } from './doctor.controller';

const router = express.Router();

router.get('/', DoctorController.getAllDoctors);
router.post('/', DoctorController.createDoctor);
router.get('/:id', DoctorController.getDoctor);
router.delete('/:id', DoctorController.deleteDoctor);
router.patch('/:id', DoctorController.updateDoctor);

export const DoctorRouter = router;