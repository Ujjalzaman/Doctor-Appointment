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
exports.AppointmentService = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const moment_1 = __importDefault(require("moment"));
const emailTransporter_1 = require("../../../helpers/emailTransporter");
const createAppointment = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientInfo, payment } = payload;
    const isUserExist = yield prisma_1.default.patient.findUnique({
        where: {
            id: user.userId
        }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Patient Account is not found !!');
    }
    const isDoctorExist = yield prisma_1.default.doctor.findUnique({
        where: {
            id: patientInfo.doctorId
        }
    });
    if (!isDoctorExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    if (isUserExist) {
        patientInfo['patientId'] = isUserExist.id;
        patientInfo['paymentStatus'] = client_1.paymentStatus.paid;
    }
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        const previousAppointment = yield tx.appointments.findFirst({
            orderBy: { createdAt: 'desc' },
            take: 1
        });
        const appointmentLastNumber = ((_a = previousAppointment === null || previousAppointment === void 0 ? void 0 : previousAppointment.trackingId) !== null && _a !== void 0 ? _a : '').slice(-3);
        const lastDigit = (Number(appointmentLastNumber) + 1 || 0).toString().padStart(3, '0');
        // Trcking Id To be ==> First 3 Letter Of User  + current year + current month + current day + unique number (Matched Previous Appointment).
        const first3DigitName = (_b = isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.firstName) === null || _b === void 0 ? void 0 : _b.slice(0, 3).toUpperCase();
        const year = (0, moment_1.default)().year();
        const month = ((0, moment_1.default)().month() + 1).toString().padStart(2, '0');
        const day = ((0, moment_1.default)().dayOfYear()).toString().padStart(2, '0');
        const trackingId = first3DigitName + year + month + day + lastDigit || '001';
        patientInfo['trackingId'] = trackingId;
        const appointment = yield tx.appointments.create({
            data: patientInfo,
            include: {
                doctor: true,
                patient: true
            }
        });
        const { paymentMethod, paymentType } = payment;
        const docFee = Number(isDoctorExist.price);
        const vat = (15 / 100) * (docFee + 10);
        if (appointment.id) {
            yield tx.payment.create({
                data: {
                    appointmentId: appointment.id,
                    bookingFee: 10,
                    paymentMethod: paymentMethod,
                    paymentType: paymentType,
                    vat: vat,
                    DoctorFee: docFee,
                    totalAmount: (vat + docFee),
                }
            });
        }
        const pathName = "../../../template/appointment.html";
        const appointmentObj = {
            created: (0, moment_1.default)(appointment.createdAt).format('LL'),
            trackingId: appointment.trackingId,
            patientType: appointment.patientType,
            status: appointment.status,
            paymentStatus: appointment.paymentStatus,
            prescriptionStatus: appointment.prescriptionStatus,
            scheduleDate: (0, moment_1.default)(appointment.scheduleDate).format('LL'),
            scheduleTime: appointment.scheduleTime,
            doctorImg: (_c = appointment === null || appointment === void 0 ? void 0 : appointment.doctor) === null || _c === void 0 ? void 0 : _c.img,
            doctorFirstName: (_d = appointment === null || appointment === void 0 ? void 0 : appointment.doctor) === null || _d === void 0 ? void 0 : _d.firstName,
            doctorLastName: (_e = appointment === null || appointment === void 0 ? void 0 : appointment.doctor) === null || _e === void 0 ? void 0 : _e.lastName,
            specialization: (_f = appointment === null || appointment === void 0 ? void 0 : appointment.doctor) === null || _f === void 0 ? void 0 : _f.specialization,
            designation: (_g = appointment === null || appointment === void 0 ? void 0 : appointment.doctor) === null || _g === void 0 ? void 0 : _g.designation,
            college: (_h = appointment === null || appointment === void 0 ? void 0 : appointment.doctor) === null || _h === void 0 ? void 0 : _h.college,
            patientImg: (_j = appointment === null || appointment === void 0 ? void 0 : appointment.patient) === null || _j === void 0 ? void 0 : _j.img,
            patientfirstName: (_k = appointment === null || appointment === void 0 ? void 0 : appointment.patient) === null || _k === void 0 ? void 0 : _k.firstName,
            patientLastName: (_l = appointment === null || appointment === void 0 ? void 0 : appointment.patient) === null || _l === void 0 ? void 0 : _l.lastName,
            dateOfBirth: (0, moment_1.default)().diff((0, moment_1.default)((_m = appointment === null || appointment === void 0 ? void 0 : appointment.patient) === null || _m === void 0 ? void 0 : _m.dateOfBirth), 'years'),
            bloodGroup: (_o = appointment === null || appointment === void 0 ? void 0 : appointment.patient) === null || _o === void 0 ? void 0 : _o.bloodGroup,
            city: (_p = appointment === null || appointment === void 0 ? void 0 : appointment.patient) === null || _p === void 0 ? void 0 : _p.city,
            state: (_q = appointment === null || appointment === void 0 ? void 0 : appointment.patient) === null || _q === void 0 ? void 0 : _q.state,
            country: (_r = appointment === null || appointment === void 0 ? void 0 : appointment.patient) === null || _r === void 0 ? void 0 : _r.country
        };
        const replacementObj = appointmentObj;
        const firstName = appointment === null || appointment === void 0 ? void 0 : appointment.firstName;
        const lastName = appointment === null || appointment === void 0 ? void 0 : appointment.lastName;
        const subject = `Appointment Confirm With Dr ${((_s = appointment === null || appointment === void 0 ? void 0 : appointment.doctor) === null || _s === void 0 ? void 0 : _s.firstName) + ' ' + ((_t = appointment === null || appointment === void 0 ? void 0 : appointment.doctor) === null || _t === void 0 ? void 0 : _t.lastName)} at ${appointment.scheduleDate} + ' ' + ${appointment.scheduleTime}`;
        const fromMail = "ujjalzaman+doctor@gmail.com";
        const toMail = `${appointment.email + ',' + ((_u = appointment.doctor) === null || _u === void 0 ? void 0 : _u.email)}`;
        (0, emailTransporter_1.EmailtTransporter)({ pathName, replacementObj, firstName, lastName, fromMail, toMail, subject });
        return appointment;
    }));
    return result;
});
const createAppointmentByUnAuthenticateUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientInfo, payment } = payload;
    patientInfo['patientId'] = patientInfo.patientId && patientInfo.patientId;
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        var _v;
        const previousAppointment = yield tx.appointments.findFirst({
            orderBy: { createdAt: 'desc' },
            take: 1
        });
        const appointmentLastNumber = ((_v = previousAppointment === null || previousAppointment === void 0 ? void 0 : previousAppointment.trackingId) !== null && _v !== void 0 ? _v : '').slice(-3);
        const lastDigit = (Number(appointmentLastNumber) + 1).toString().padStart(3, '0');
        // Trcking Id To be ==> UNU - 'Un Authenticate User  + current year + current month + current day + unique number (Matched Previous Appointment).
        const year = (0, moment_1.default)().year();
        const month = ((0, moment_1.default)().month() + 1).toString().padStart(2, '0');
        const day = ((0, moment_1.default)().dayOfYear()).toString().padStart(2, '0');
        const trackingId = 'UNU' + year + month + day + lastDigit || '0001';
        patientInfo['trackingId'] = trackingId;
        const appointment = yield tx.appointments.create({
            data: patientInfo,
        });
        const { paymentMethod, paymentType } = payment;
        const vat = (15 / 100) * (60 + 10);
        if (appointment.id) {
            yield tx.payment.create({
                data: {
                    appointmentId: appointment.id,
                    bookingFee: 10,
                    paymentMethod: paymentMethod,
                    paymentType: paymentType,
                    vat: vat,
                    DoctorFee: 60,
                    totalAmount: (vat + 60),
                }
            });
        }
        const appointmentObj = {
            created: (0, moment_1.default)(appointment.createdAt).format('LL'),
            trackingId: appointment.trackingId,
            patientType: appointment.patientType,
            status: appointment.status,
            paymentStatus: appointment.paymentStatus,
            prescriptionStatus: appointment.prescriptionStatus,
            scheduleDate: (0, moment_1.default)(appointment.scheduleDate).format('LL'),
            scheduleTime: appointment.scheduleTime,
        };
        const pathName = "../../../template/meeting.html";
        const replacementObj = appointmentObj;
        const firstName = appointment === null || appointment === void 0 ? void 0 : appointment.firstName;
        const lastName = appointment === null || appointment === void 0 ? void 0 : appointment.lastName;
        const subject = `Appointment Confirm With at ${appointment.scheduleDate} + ' ' + ${appointment.scheduleTime}`;
        const fromMail = "ujjalzaman+doctor@gmail.com";
        const toMail = `${appointment.email}`;
        (0, emailTransporter_1.EmailtTransporter)({ pathName, replacementObj, firstName, lastName, fromMail, toMail, subject });
        return appointment;
    }));
    return result;
});
const getAllAppointments = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.appointments.findMany();
    return result;
});
const getAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.appointments.findUnique({
        where: {
            id: id
        },
        include: {
            doctor: true,
            patient: true
        }
    });
    return result;
});
const getAppointmentByTrackingId = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = data;
    const result = yield prisma_1.default.appointments.findUnique({
        where: {
            trackingId: id
        },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                    designation: true,
                    college: true,
                    degree: true,
                    img: true
                },
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                    address: true,
                    city: true,
                    country: true,
                    state: true,
                    img: true
                }
            }
        }
    });
    return result;
});
const getPatientAppointmentById = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const isPatient = yield prisma_1.default.patient.findUnique({
        where: {
            id: userId
        }
    });
    if (!isPatient) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Patient Account is not found !!');
    }
    const result = yield prisma_1.default.appointments.findMany({
        where: {
            patientId: userId
        },
        include: {
            doctor: true
        }
    });
    return result;
});
const getPaymentInfoViaAppintmentId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.payment.findFirst({
        where: {
            appointmentId: id
        },
        include: {
            appointment: {
                include: {
                    patient: {
                        select: {
                            firstName: true,
                            lastName: true,
                            address: true,
                            country: true,
                            city: true
                        }
                    },
                    doctor: {
                        select: {
                            firstName: true,
                            lastName: true,
                            address: true,
                            country: true,
                            city: true
                        }
                    }
                }
            }
        }
    });
    return result;
});
const getPatientPaymentInfo = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const isUserExist = yield prisma_1.default.patient.findUnique({
        where: { id: userId }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Patient Account is not found !!');
    }
    const result = yield prisma_1.default.payment.findMany({
        where: { appointment: { patientId: isUserExist.id } },
        include: {
            appointment: {
                include: {
                    doctor: {
                        select: {
                            firstName: true,
                            lastName: true,
                            designation: true
                        }
                    }
                }
            }
        }
    });
    return result;
});
const getDoctorInvoices = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const isUserExist = yield prisma_1.default.doctor.findUnique({
        where: { id: userId }
    });
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    const result = yield prisma_1.default.payment.findMany({
        where: { appointment: { doctorId: isUserExist.id } },
        include: {
            appointment: {
                include: {
                    patient: {
                        select: {
                            firstName: true,
                            lastName: true
                        }
                    }
                }
            }
        }
    });
    return result;
});
const deleteAppointment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.appointments.delete({
        where: {
            id: id
        }
    });
    return result;
});
const updateAppointment = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.appointments.update({
        data: payload,
        where: {
            id: id
        }
    });
    return result;
});
//doctor Side
const getDoctorAppointmentsById = (user, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const isDoctor = yield prisma_1.default.doctor.findUnique({
        where: {
            id: userId
        }
    });
    if (!isDoctor) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    let andCondition = { doctorId: userId };
    if (filter.sortBy == 'today') {
        const today = (0, moment_1.default)().startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const tomorrow = (0, moment_1.default)(today).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
        andCondition.scheduleDate = {
            gte: today,
            lt: tomorrow
        };
    }
    if (filter.sortBy == 'upcoming') {
        const upcomingDate = (0, moment_1.default)().startOf('day').add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
        andCondition.scheduleDate = {
            gte: upcomingDate
        };
    }
    const whereConditions = andCondition ? andCondition : {};
    const result = yield prisma_1.default.appointments.findMany({
        where: whereConditions,
        include: {
            patient: true,
            prescription: {
                select: {
                    id: true
                }
            }
        }
    });
    return result;
});
const getDoctorPatients = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const isDoctor = yield prisma_1.default.doctor.findUnique({
        where: {
            id: userId
        }
    });
    if (!isDoctor) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    const patients = yield prisma_1.default.appointments.findMany({
        where: {
            doctorId: userId
        },
        distinct: ['patientId']
    });
    //extract patients from the appointments table
    const patientIds = patients.map(appointment => appointment.patientId);
    const patientList = yield prisma_1.default.patient.findMany({
        where: {
            id: {
                // @ts-ignore
                in: patientIds
            }
        }
    });
    return patientList;
});
const updateAppointmentByDoctor = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const isDoctor = yield prisma_1.default.doctor.findUnique({
        where: {
            id: userId
        }
    });
    if (!isDoctor) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    const result = yield prisma_1.default.appointments.update({
        where: {
            id: payload.id
        },
        data: payload
    });
    return result;
});
exports.AppointmentService = {
    createAppointment,
    getAllAppointments,
    getAppointment,
    deleteAppointment,
    updateAppointment,
    getPatientAppointmentById,
    getDoctorAppointmentsById,
    updateAppointmentByDoctor,
    getDoctorPatients,
    getPaymentInfoViaAppintmentId,
    getPatientPaymentInfo,
    getDoctorInvoices,
    createAppointmentByUnAuthenticateUser,
    getAppointmentByTrackingId
};
