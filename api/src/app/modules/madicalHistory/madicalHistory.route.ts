import express from 'express';
import { MadicalHistoryController } from './madicalHistory.controller';

const router = express.Router();

router.get('/:id', MadicalHistoryController.getSingleMadicalHistory);
router.post('/create', MadicalHistoryController.createMadicalHistory);
router.get('/', MadicalHistoryController.getAllMadicalHistory);
router.patch('/:id', MadicalHistoryController.updateMadicalHistory);
router.delete('/:id', MadicalHistoryController.deleteMadicalHistory);

export const MadicalHistoryRouter = router;