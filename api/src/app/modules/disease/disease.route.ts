import { DiseaseController } from './disease.controller';
import express from 'express';
const router = express.Router();

router.post('/create', DiseaseController.createDisease);

export const DiseaseRouter = router;