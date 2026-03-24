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
exports.PrescriptionController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const prescription_service_1 = require("./prescription.service");
const createPrescription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prescription_service_1.PrescriptionService.createPrescription(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Created Prescription !!',
        success: true,
    });
}));
const updatePrescriptionAndAppointment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prescription_service_1.PrescriptionService.updatePrescriptionAndAppointment(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully updated Prescription !!',
        success: true,
    });
}));
const getDoctorPrescriptionById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prescription_service_1.PrescriptionService.getDoctorPrescriptionById(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Retrieve Doctor Prescriptions !!',
        success: true,
        data: result
    });
}));
const updatePrescription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prescription_service_1.PrescriptionService.updatePrescription(req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Updated Prescription !!',
        success: true,
        data: result
    });
}));
const getPatientPrescriptionById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prescription_service_1.PrescriptionService.getPatientPrescriptionById(req.user);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Retrieve Patient Prescription !!',
        success: true,
        data: result
    });
}));
const deletePrescription = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prescription_service_1.PrescriptionService.deletePrescription(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Deleted Prescription !!',
        success: true,
        data: result
    });
}));
const getPrescriptionById = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prescription_service_1.PrescriptionService.getPrescriptionById(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Retrieve Prescription !!',
        success: true,
        data: result
    });
}));
const getAllPrescriptions = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prescription_service_1.PrescriptionService.getAllPrescriptions();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Retrieve All Prescription !!',
        success: true,
        data: result
    });
}));
exports.PrescriptionController = {
    createPrescription,
    getAllPrescriptions,
    getPrescriptionById,
    deletePrescription,
    getPatientPrescriptionById,
    updatePrescription,
    getDoctorPrescriptionById,
    updatePrescriptionAndAppointment
};
