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
exports.MedicineService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const createMedicine = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createMedicinePromise = payload.map((medicine) => prisma_1.default.medicine.create({
        data: {
            dosage: medicine.dosage,
            duration: medicine.duration,
            frequency: medicine.frequency,
            medicine: medicine.medicine,
            prescriptionId: medicine.prescriptionId
        }
    }));
    yield Promise.all(createMedicinePromise);
    return {
        message: "Successfully medicine added"
    };
});
const updateMedicine = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isPrescriptionId = yield prisma_1.default.prescription.findUnique({
        where: {
            id: payload.prescriptionId
        }
    });
    if (!isPrescriptionId) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Prescription is not found !!');
    }
    const result = yield prisma_1.default.medicine.update({
        where: {
            id: payload.id
        },
        data: {
            dosage: payload.dosage,
            duration: payload.duration,
            frequency: payload.frequency,
            medicine: payload.medicine
        }
    });
    return result;
});
const deleteMedicine = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.medicine.delete({ where: { id } });
    return result;
});
exports.MedicineService = {
    updateMedicine,
    createMedicine,
    deleteMedicine
};
