"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorRouter = void 0;
const express_1 = __importDefault(require("express"));
const doctor_controller_1 = require("./doctor.controller");
const enums_1 = require("../../../enums");
const auth_1 = require("../../middlewares/auth");
const uploadHelper_1 = require("../../../helpers/uploadHelper");
const router = express_1.default.Router();
router.get('/', doctor_controller_1.DoctorController.getAllDoctors);
router.post('/', doctor_controller_1.DoctorController.createDoctor);
router.get('/:id', doctor_controller_1.DoctorController.getDoctor);
router.delete('/:id', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), doctor_controller_1.DoctorController.deleteDoctor);
router.patch('/:id', uploadHelper_1.CloudinaryHelper.upload.single('file'), (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), (req, res, next) => {
    return doctor_controller_1.DoctorController.updateDoctor(req, res, next);
});
exports.DoctorRouter = router;
