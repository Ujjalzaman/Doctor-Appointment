import express from 'express';
import { DiseaseRouter } from '../modules/disease/disease.route';
import { AdminRouter } from '../modules/admin/admin.route';
import { DepartmentRoutes } from '../modules/madical-department/department.route';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/disease',
        route: DiseaseRouter,
    },
    {
        path: '/department',
        route: DepartmentRoutes
    },
    {
        path: '/admin',
        route: AdminRouter,
    }
]
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
