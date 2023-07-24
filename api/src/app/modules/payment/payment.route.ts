import express from 'express';
import { PaymentController } from './payment.controller';

const router = express.Router();

router.get('/:id', PaymentController.getSinglePayment);
router.post('/create', PaymentController.createPayment);
router.get('/', PaymentController.getAllPayment);
router.patch('/:id', PaymentController.updatePayment);
router.delete('/:id', PaymentController.deletePayment);

export const PaymentRouter = router;