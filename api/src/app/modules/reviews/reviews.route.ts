import express from 'express';
import { ReviewController } from './reviews.controller';
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';

const router = express.Router();

router.get('/:id', ReviewController.getDoctorReviews);
router.post('/',auth(AuthUser.PATIENT), ReviewController.creatReview);
router.get('/', ReviewController.getAllReview);
router.delete('/:id', ReviewController.deleteReview);
router.patch('/:id', ReviewController.updateReview);

export const ReviewRouter = router;