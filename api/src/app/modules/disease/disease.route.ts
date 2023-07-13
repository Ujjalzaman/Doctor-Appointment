import { DiseaseController } from './disease.controller';
import express from 'express';
const router = express.Router();

router.get('/:id', DiseaseController.getsingleDisease);
router.post('/create', DiseaseController.createDisease);
router.get('/', DiseaseController.getAllDisease);
router.patch('/:id', DiseaseController.updateDisease);
router.delete('/:id', DiseaseController.deleteDisease);

export const DiseaseRouter = router;