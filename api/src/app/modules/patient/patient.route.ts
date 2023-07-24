import express from 'express';
import { PatientController } from './patient.controller';

const router = express.Router();

router.get('/:id', PatientController.getSinglePatient);
router.get('/', PatientController.getAllPatient);
router.patch('/:id', PatientController.updatePatient);
router.delete('/:id', PatientController.deletePatient);

export const PatientRouter = router;