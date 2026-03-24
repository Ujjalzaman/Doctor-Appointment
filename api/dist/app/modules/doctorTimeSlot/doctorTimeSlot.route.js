"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorTimeSlotRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const enums_1 = require("../../../enums");
const doctorTimeSlot_controller_1 = require("./doctorTimeSlot.controller");
const router = express_1.default.Router();
router.get('/my-slot', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), doctorTimeSlot_controller_1.doctorTimeSlotController.getMyTimeSlot);
router.get('/:id', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), doctorTimeSlot_controller_1.doctorTimeSlotController.getTimeSlot);
router.get('/appointment-time/:id', doctorTimeSlot_controller_1.doctorTimeSlotController.getAppointmentTimeOfEachDoctor);
router.post('/create', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), doctorTimeSlot_controller_1.doctorTimeSlotController.createTimeSlot);
router.get('/', doctorTimeSlot_controller_1.doctorTimeSlotController.getAllTimeSlot);
router.patch('/', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), doctorTimeSlot_controller_1.doctorTimeSlotController.updateTimeSlot);
router.delete('/', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), doctorTimeSlot_controller_1.doctorTimeSlotController.deleteTimeSlot);
exports.DoctorTimeSlotRouter = router;
