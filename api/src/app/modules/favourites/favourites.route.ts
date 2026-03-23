import express from 'express';
import { auth } from '../../middlewares/auth';
import { AuthUser } from '../../../enums';
import { FavouriteController } from './favourites.controller';

const router = express.Router();

router.get('/',auth(AuthUser.PATIENT), FavouriteController.getPatientFavourites);
router.post('/add',auth(AuthUser.PATIENT), FavouriteController.addFavourite);
router.post('/remove',auth(AuthUser.PATIENT), FavouriteController.removeFavourite);

export const FavouriteRouter = router;