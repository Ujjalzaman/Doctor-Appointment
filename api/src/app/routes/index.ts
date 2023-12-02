import express from 'express';

import { AuthRouter } from '../modules/auth/auth.route';
import { PatientRouter } from '../modules/patient/patient.route';

const router = express.Router();

const moduleRoutes = [
    // {
    //     path: '/disease',
    //     route: DiseaseRouter,
    // },
    // {
    //     path: '/department',
    //     route: DepartmentRoutes
    // },
    // {
    //     path: '/admin',
    //     route: AdminRouter,
    // },
    // {
    //     path: '/doctor',
    //     route: DoctorRouter,
    // },
    // {
    //     path: '/time-slot',
    //     route: DoctorTimeSlotRouter,
    // },
    
    // {
    //     path: '/madical-history',
    //     route: MadicalHistoryRouter,
    // },
    // {
    //     path: '/appointment',
    //     route: AppointmentRouter,
    // },
    // {
    //     path: '/payment',
    //     route: PaymentRouter,
    // },
    {
        path: '/auth',
        route: AuthRouter,
    },
    {
        path: '/patient',
        route: PatientRouter,
    },
]
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
