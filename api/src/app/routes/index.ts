import express from 'express';

import { AuthRouter } from '../modules/auth/auth.route';
import { PatientRouter } from '../modules/patient/patient.route';
import { BookingRouter } from '../modules/booking/booking.route';
import { DoctorRouter } from '../modules/doctor/doctor.route';
import { AppointmentRouter } from '../modules/appointment/appointment.route';
import { ReviewRouter } from '../modules/reviews/reviews.route';

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
    {
        path: '/doctor',
        route: DoctorRouter,
    },
    {
        path: '/review',
        route: ReviewRouter,
    },
    {
        path: '/appointment',
        route: AppointmentRouter,
    },
    {
        path: '/auth',
        route: AuthRouter,
    },
    {
        path: '/patient',
        route: PatientRouter,
    },
    {
        path: '/booking',
        route: BookingRouter,
    },
]
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
