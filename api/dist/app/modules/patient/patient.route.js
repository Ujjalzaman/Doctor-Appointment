"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRouter = void 0;
const express_1 = __importDefault(require("express"));
const patient_controller_1 = require("./patient.controller");
const auth_1 = require("../../middlewares/auth");
const enums_1 = require("../../../enums");
const uploadHelper_1 = require("../../../helpers/uploadHelper");
const router = express_1.default.Router();
router.get('/', patient_controller_1.PatientController.getAllPatients);
router.post('/', patient_controller_1.PatientController.createPatient);
router.get('/:id', patient_controller_1.PatientController.getPatient);
router.delete('/:id', patient_controller_1.PatientController.deletePatient);
router.patch('/:id', uploadHelper_1.CloudinaryHelper.upload.single('file'), (0, auth_1.auth)(enums_1.AuthUser.PATIENT), (req, res, next) => {
    return patient_controller_1.PatientController.updatePatient(req, res, next);
});
exports.PatientRouter = router;
