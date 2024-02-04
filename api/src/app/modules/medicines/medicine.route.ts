import express from 'express';
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';
import { MedicineController } from './medicine.controller';

const router = express.Router();

router.patch('/',auth(AuthUser.DOCTOR), MedicineController.updateMedicine);
router.post('/',auth(AuthUser.DOCTOR), MedicineController.createMedicine);
router.delete('/:id',auth(AuthUser.DOCTOR), MedicineController.deleteMedicine);

export const MedicineRouter = router;