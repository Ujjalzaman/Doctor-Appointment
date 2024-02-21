"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const patient_route_1 = require("../modules/patient/patient.route");
const doctor_route_1 = require("../modules/doctor/doctor.route");
const reviews_route_1 = require("../modules/reviews/reviews.route");
const appointment_route_1 = require("../modules/appointment/appointment.route");
const prescription_route_1 = require("../modules/prescription/prescription.route");
const favourites_route_1 = require("../modules/favourites/favourites.route");
const doctorTimeSlot_route_1 = require("../modules/doctorTimeSlot/doctorTimeSlot.route");
const blog_route_1 = require("../modules/blog/blog.route");
const medicine_route_1 = require("../modules/medicines/medicine.route");
const contact_route_1 = require("../modules/contact/contact.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/doctor',
        route: doctor_route_1.DoctorRouter,
    },
    {
        path: '/review',
        route: reviews_route_1.ReviewRouter,
    },
    {
        path: '/auth',
        route: auth_route_1.AuthRouter,
    },
    {
        path: '/patient',
        route: patient_route_1.PatientRouter,
    },
    {
        path: '/appointment',
        route: appointment_route_1.AppointmentRouter,
    },
    {
        path: '/prescription',
        route: prescription_route_1.PrescriptionRouter,
    },
    {
        path: '/favourite',
        route: favourites_route_1.FavouriteRouter,
    },
    {
        path: '/timeslot',
        route: doctorTimeSlot_route_1.DoctorTimeSlotRouter,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoutes,
    },
    {
        path: '/medicine',
        route: medicine_route_1.MedicineRouter
    },
    {
        path: '/contact',
        route: contact_route_1.ContactRouter
    }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
