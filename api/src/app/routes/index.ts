import express from 'express';

import { AuthRouter } from '../modules/auth/auth.route';
import { PatientRouter } from '../modules/patient/patient.route';
import { DoctorRouter } from '../modules/doctor/doctor.route';
import { ReviewRouter } from '../modules/reviews/reviews.route';
import { AppointmentRouter } from '../modules/appointment/appointment.route';
import { PrescriptionRouter } from '../modules/prescription/prescription.route';
import { FavouriteRouter } from '../modules/favourites/favourites.route';
import { DoctorTimeSlotRouter } from '../modules/doctorTimeSlot/doctorTimeSlot.route';
import { BlogRoutes } from '../modules/blog/blog.route';
import { MedicineRouter } from '../modules/medicines/medicine.route';
import { ContactRouter } from '../modules/contact/contact.route';

const router = express.Router();

const moduleRoutes = [
    {
        path: '/doctor',
        route: DoctorRouter,
    },
    {
        path: '/review',
        route: ReviewRouter,
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
        path: '/appointment',
        route: AppointmentRouter,
    },
    {
        path: '/prescription',
        route: PrescriptionRouter,
    },
    {
        path: '/favourite',
        route: FavouriteRouter,
    },
    {
        path: '/timeslot',
        route: DoctorTimeSlotRouter,
    },
    {
        path: '/blogs',
        route: BlogRoutes,
    },
    {
        path: '/medicine',
        route: MedicineRouter
    },
    {
        path: '/contact',
        route: ContactRouter
    }
]
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
