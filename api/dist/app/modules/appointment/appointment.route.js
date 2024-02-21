"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const enums_1 = require("../../../enums");
const appointment_controller_1 = require("./appointment.controller");
const router = express_1.default.Router();
router.get('/', appointment_controller_1.AppointmentController.getAllAppointment);
router.get('/patient/appointments', (0, auth_1.auth)(enums_1.AuthUser.PATIENT), appointment_controller_1.AppointmentController.getPatientAppointmentById);
router.get('/patient/invoices', (0, auth_1.auth)(enums_1.AuthUser.PATIENT), appointment_controller_1.AppointmentController.getPatientPaymentInfo);
router.get('/doctor/invoices', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), appointment_controller_1.AppointmentController.getDoctorInvoices);
router.get('/doctor/appointments', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), appointment_controller_1.AppointmentController.getDoctorAppointmentsById);
router.get('/doctor/patients', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), appointment_controller_1.AppointmentController.getDoctorPatients);
router.get('/patient-payment-info/:id', (0, auth_1.auth)(enums_1.AuthUser.PATIENT, enums_1.AuthUser.DOCTOR), appointment_controller_1.AppointmentController.getPaymentInfoViaAppintmentId);
router.post('/tracking', appointment_controller_1.AppointmentController.getAppointmentByTrackingId);
router.post('/create', (0, auth_1.auth)(enums_1.AuthUser.PATIENT), appointment_controller_1.AppointmentController.createAppointment);
router.post('/create-un-authenticate', appointment_controller_1.AppointmentController.createAppointmentByUnAuthenticateUser);
router.get('/:id', appointment_controller_1.AppointmentController.getAppointment);
router.delete('/:id', appointment_controller_1.AppointmentController.deleteAppointment);
router.patch('/:id', (0, auth_1.auth)(enums_1.AuthUser.ADMIN, enums_1.AuthUser.DOCTOR, enums_1.AuthUser.PATIENT), appointment_controller_1.AppointmentController.updateAppointment);
//doctor side
router.patch('/doctor/update-appointment', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), appointment_controller_1.AppointmentController.updateAppointmentByDoctor);
exports.AppointmentRouter = router;
