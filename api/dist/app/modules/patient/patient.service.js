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
exports.PatientService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const patientService_1 = require("./patientService");
const uploadHelper_1 = require("../../../helpers/uploadHelper");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const createPatient = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, patientService_1.create)(payload);
    return result;
});
const getAllPatients = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.patient.findMany();
    return result;
});
const getPatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.patient.findUnique({
        where: {
            id: id
        }
    });
    return result;
});
const deletePatient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const patient = yield tx.patient.delete({
            where: {
                id: id
            }
        });
        yield tx.auth.delete({
            where: {
                email: patient.email
            }
        });
    }));
    return result;
});
// : Promise<Patient>
const updatePatient = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const id = req.params.id;
    const user = JSON.parse(req.body.data);
    if (file) {
        const uploadImage = yield uploadHelper_1.CloudinaryHelper.uploadFile(file);
        if (uploadImage) {
            user.img = uploadImage.secure_url;
        }
        else {
            throw new apiError_1.default(http_status_1.default.EXPECTATION_FAILED, 'Failed to updateImage !!');
        }
    }
    const result = yield prisma_1.default.patient.update({
        where: { id },
        data: user
    });
    return result;
});
exports.PatientService = {
    createPatient,
    updatePatient,
    getPatient,
    getAllPatients,
    deletePatient
};
