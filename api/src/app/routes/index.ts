import express from 'express';
import { DiseaseRouter } from '../modules/disease/disease.route';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/disease',
        route: DiseaseRouter,
    }
]
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
