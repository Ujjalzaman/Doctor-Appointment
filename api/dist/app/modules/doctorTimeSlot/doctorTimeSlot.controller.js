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
exports.doctorTimeSlotController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const doctorTimeSlot_service_1 = require("./doctorTimeSlot.service");
const createTimeSlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctorTimeSlot_service_1.TimeSlotService.createTimeSlot(req.user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully created Time Slot !!',
        success: true,
        data: result
    });
}));
const getAllTimeSlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctorTimeSlot_service_1.TimeSlotService.getAllTimeSlot();
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully  get all Time Slot !!',
        success: true,
        data: result
    });
}));
const getMyTimeSlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctorTimeSlot_service_1.TimeSlotService.getMyTimeSlot(req.user, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully  get all Time Slot !!',
        success: true,
        data: result
    });
}));
const getTimeSlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctorTimeSlot_service_1.TimeSlotService.getTimeSlot(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully get Time Slot !!',
        success: true,
        data: result
    });
}));
const updateTimeSlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield doctorTimeSlot_service_1.TimeSlotService.updateTimeSlot(req.user, req.params.id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully updated Time Slot !!',
        success: true,
    });
}));
const deleteTimeSlot = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctorTimeSlot_service_1.TimeSlotService.deleteTimeSlot(req.params.id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully deleted Time Slot !!',
        success: true,
        data: result
    });
}));
const getAppointmentTimeOfEachDoctor = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield doctorTimeSlot_service_1.TimeSlotService.getAppointmentTimeOfEachDoctor(req.params.id, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        message: 'Successfully deleted Time Slot !!',
        success: true,
        data: result
    });
}));
exports.doctorTimeSlotController = {
    getAllTimeSlot,
    getTimeSlot,
    updateTimeSlot,
    createTimeSlot,
    deleteTimeSlot,
    getMyTimeSlot,
    getAppointmentTimeOfEachDoctor
};
