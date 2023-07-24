import express from 'express';
import { AuthController } from './auth.controller';

const router = express.Router();

router.get('/:id', AuthController.getSingleAuth);
router.post('/create', AuthController.createAuth);
router.get('/', AuthController.getAllAuth);
router.patch('/:id', AuthController.updateAuth);
router.delete('/:id', AuthController.deleteAuth);

export const AuthRouter = router;