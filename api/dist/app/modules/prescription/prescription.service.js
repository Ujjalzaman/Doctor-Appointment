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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrescriptionService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const createPrescription = (user, paylaod) => __awaiter(void 0, void 0, void 0, function* () {
    const { medicine } = paylaod, others = __rest(paylaod, ["medicine"]);
    const { userId } = user;
    const isDoctor = yield prisma_1.default.doctor.findUnique({
        where: {
            id: userId
        }
    });
    if (!isDoctor) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    const isAppointment = yield prisma_1.default.appointments.findUnique({
        where: {
            id: paylaod.appointmentId
        }
    });
    if (!isAppointment) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Appopintment is not found !!');
    }
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const { status, patientType } = others, rest = __rest(others, ["status", "patientType"]);
        yield tx.appointments.update({
            where: {
                id: isAppointment.id
            },
            data: {
                isFollowUp: paylaod.followUpDate ? true : false,
                status: status || undefined,
                patientType: patientType || undefined,
                prescriptionStatus: "issued"
            }
        });
        const prescription = yield tx.prescription.create({
            data: Object.assign(Object.assign({}, rest), { doctorId: isDoctor.id, patientId: isAppointment.patientId, medicines: undefined })
        });
        const medicinePromise = medicine.map((medicine) => tx.medicine.create({
            data: {
                dosage: medicine.dosage,
                duration: medicine.duration,
                frequency: medicine.frequency,
                medicine: medicine.medicine,
                prescriptionId: prescription.id
            }
        }));
        yield Promise.all(medicinePromise);
    }));
    return {
        message: "Successfully Prescription Created"
    };
});
// Update Prescription and Appointment table 
const updatePrescriptionAndAppointment = (user, paylaod) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, patientType, followUpdate, prescriptionId } = paylaod, others = __rest(paylaod, ["status", "patientType", "followUpdate", "prescriptionId"]);
    const { userId } = user;
    const isDoctor = yield prisma_1.default.doctor.findUnique({
        where: {
            id: userId
        }
    });
    if (!isDoctor) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    const isPrescribed = yield prisma_1.default.prescription.findUnique({
        where: {
            id: prescriptionId
        }
    });
    if (!isPrescribed) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Prescription is not found !!');
    }
    yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        yield tx.appointments.update({
            where: {
                id: isPrescribed.appointmentId
            },
            data: {
                isFollowUp: followUpdate ? true : false,
                status: status,
                patientType: patientType,
            }
        });
        yield tx.prescription.update({
            where: {
                id: prescriptionId
            },
            data: Object.assign({}, others)
        });
    }));
    return {
        message: "Successfully Prescription Updated"
    };
});
const getAllPrescriptions = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.prescription.findMany({
        include: {
            appointment: {
                select: {
                    trackingId: true
                }
            }
        }
    });
    return result;
});
const getPrescriptionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.prescription.findUnique({
        where: {
            id: id
        },
        include: {
            medicines: true,
            appointment: {
                select: {
                    scheduleDate: true,
                    scheduleTime: true,
                    status: true,
                    trackingId: true,
                }
            },
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                    designation: true,
                    email: true,
                    college: true,
                    address: true,
                    country: true,
                    state: true,
                    specialization: true
                }
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                    gender: true,
                    dateOfBirth: true,
                    email: true,
                    bloodGroup: true,
                    address: true,
                    img: true,
                    city: true,
                }
            }
        }
    });
    return result;
});
const getPatientPrescriptionById = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const isPatient = yield prisma_1.default.patient.findUnique({
        where: {
            id: userId
        }
    });
    if (!isPatient) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Patient Account is not found !!');
    }
    const result = yield prisma_1.default.prescription.findMany({
        where: {
            patientId: userId
        },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                    designation: true
                }
            },
            appointment: {
                select: {
                    scheduleDate: true,
                    scheduleTime: true,
                    status: true,
                    trackingId: true
                }
            }
        }
    });
    return result;
});
const getDoctorPrescriptionById = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const isDoctor = yield prisma_1.default.doctor.findUnique({
        where: {
            id: userId
        }
    });
    if (!isDoctor) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    const result = yield prisma_1.default.prescription.findMany({
        where: {
            doctorId: userId,
        },
        include: {
            medicines: true,
            patient: true
        }
    });
    return result;
});
const deletePrescription = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.prescription.delete({
        where: {
            id: id
        }
    });
    return result;
});
const updatePrescription = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.prescription.update({
        data: payload,
        where: {
            id: id
        }
    });
    return result;
});
exports.PrescriptionService = {
    createPrescription,
    getDoctorPrescriptionById,
    updatePrescription,
    getPatientPrescriptionById,
    deletePrescription,
    getPrescriptionById,
    getAllPrescriptions,
    updatePrescriptionAndAppointment
};
