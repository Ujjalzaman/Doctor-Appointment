import express, { NextFunction, Request, Response } from 'express';
import { PatientController } from './patient.controller';
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';
import { CloudinaryHelper } from '../../../helpers/uploadHelper';

const router = express.Router();

router.get('/', PatientController.getAllPatients);
router.post('/', PatientController.createPatient);
router.get('/:id', PatientController.getPatient);
router.delete('/:id', PatientController.deletePatient);
router.patch('/:id',
    CloudinaryHelper.upload.single('file'),
    auth(AuthUser.PATIENT),
    (req: Request, res: Response, next: NextFunction) => {
        return PatientController.updatePatient(req, res, next)
    }
);

export const PatientRouter = router;