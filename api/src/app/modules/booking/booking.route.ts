import express from 'express';
import { BookingController } from './booking.controller';
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';

const router = express.Router();

router.get('/', BookingController.getAllBooking);
router.post('/',auth(AuthUser.PATIENT), BookingController.createDoctor);
router.get('/:id', BookingController.getBooking);
router.delete('/:id', BookingController.deleteBooking);
router.patch('/:id', BookingController.updateBooking);

export const BookingRouter = router;