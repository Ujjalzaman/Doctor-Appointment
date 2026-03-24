"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicineRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../../middlewares/auth");
const enums_1 = require("../../../enums");
const medicine_controller_1 = require("./medicine.controller");
const router = express_1.default.Router();
router.patch('/', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), medicine_controller_1.MedicineController.updateMedicine);
router.post('/', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), medicine_controller_1.MedicineController.createMedicine);
router.delete('/:id', (0, auth_1.auth)(enums_1.AuthUser.DOCTOR), medicine_controller_1.MedicineController.deleteMedicine);
exports.MedicineRouter = router;
