import express from 'express';
import { PatientController } from './patient.controller';
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';

const router = express.Router();

router.get('/', PatientController.getAllPatients);
router.post('/', PatientController.createPatient);
router.get('/:id', PatientController.getPatient);
router.delete('/:id', PatientController.deletePatient);
router.patch('/:id',auth(AuthUser.PATIENT), PatientController.updatePatient);

export const PatientRouter = router;