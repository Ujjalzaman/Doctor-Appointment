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
exports.DoctorController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const doctor_service_1 = require("./doctor.service");
const pick_1 = __importDefault(require("../../../shared/pick"));
const doctor_interface_1 = require("./doctor.interface");
const createDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctor_service_1.DoctorService.create(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Doctor Created !!',
        success: true,
        data: result
    });
}));
const getAllDoctors = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = (0, pick_1.default)(req.query, doctor_interface_1.IDoctorFiltersData);
    const options = (0, pick_1.default)(req.query, doctor_interface_1.IDoctorOptions);
    const result = yield doctor_service_1.DoctorService.getAllDoctors(filter, options);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Retrieve doctors !!',
        success: true,
        data: result,
    });
}));
const getDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctor_service_1.DoctorService.getDoctor(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Get Doctor !!',
        success: true,
        data: result,
    });
}));
const deleteDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctor_service_1.DoctorService.deleteDoctor(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Deleted Doctor !!',
        success: true,
        data: result,
    });
}));
const updateDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctor_service_1.DoctorService.updateDoctor(req);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully Updated Doctor !!',
        success: true,
        data: result,
    });
}));
exports.DoctorController = {
    createDoctor,
    updateDoctor,
    deleteDoctor,
    getAllDoctors,
    getDoctor
};
