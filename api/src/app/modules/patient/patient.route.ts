import express from 'express';
import { PatientController } from './patient.controller';

const router = express.Router();

router.get('/', PatientController.getAllPatients);
router.post('/', PatientController.createPatient);
router.get('/:id', PatientController.getPatient);
router.delete('/:id', PatientController.deletePatient);
router.patch('/:id', PatientController.updatePatient);

export const PatientRouter = router;