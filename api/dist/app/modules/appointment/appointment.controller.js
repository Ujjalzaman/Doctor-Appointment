"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const appointment_service_1 = require("./appointment.service");
const createAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_service_1.AppointmentService.createAppointment(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Appointment Created !!',
        success: true,
        data: result
    });
}));
const createAppointmentByUnAuthenticateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_service_1.AppointmentService.createAppointmentByUnAuthenticateUser(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Appointment Created !!',
        success: true,
        data: result
    });
}));
const getAllAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_service_1.AppointmentService.getAllAppointments();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Retrieve All Appointment !!',
        success: true,
        data: result,
    });
}));
const getAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_service_1.AppointmentService.getAppointment(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Get Appointment !!',
        success: true,
        data: result,
    });
}));
const getAppointmentByTrackingId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_service_1.AppointmentService.getAppointmentByTrackingId(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Get Appointment !!',
        success: true,
        data: result,
    });
}));
const deleteAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_service_1.AppointmentService.deleteAppointment(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Deleted Appointment !!',
        success: true,
        data: result,
    });
}));
const updateAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_service_1.AppointmentService.updateAppointment(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Updated Appointment !!',
        success: true,
        data: result,
    });
}));
const getPatientAppointmentById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_service_1.AppointmentService.getPatientAppointmentById(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Updated Appointment !!',
        success: true,
        data: result,
    });
}));
const getDoctorAppointmentsById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_service_1.AppointmentService.getDoctorAppointmentsById(req.user, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Retrieve doctor apppointments !!',
        success: true,
        data: result
    });
}));
const updateAppointmentByDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_service_1.AppointmentService.updateAppointmentByDoctor(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully updated apppointments !!',
        success: true,
        data: result
    });
}));
const getDoctorPatients = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_service_1.AppointmentService.getDoctorPatients(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully retrieve doctor patients !!',
        success: true,
        data: result
    });
}));
const getPaymentInfoViaAppintmentId = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_service_1.AppointmentService.getPaymentInfoViaAppintmentId(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully retrieve payment info !!',
        success: true,
        data: result
    });
}));
const getPatientPaymentInfo = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_service_1.AppointmentService.getPatientPaymentInfo(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully retrieve payment info !!',
        success: true,
        data: result
    });
}));
const getDoctorInvoices = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield appointment_service_1.AppointmentService.getDoctorInvoices(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully retrieve Doctor info !!',
        success: true,
        data: result
    });
}));
exports.AppointmentController = {
    getDoctorAppointmentsById,
    updateAppointmentByDoctor,
    getPatientAppointmentById,
    updateAppointment,
    createAppointment,
    getAllAppointment,
    getAppointment,
    deleteAppointment,
    getDoctorPatients,
    getPaymentInfoViaAppintmentId,
    getPatientPaymentInfo,
    getDoctorInvoices,
    createAppointmentByUnAuthenticateUser,
    getAppointmentByTrackingId
};
