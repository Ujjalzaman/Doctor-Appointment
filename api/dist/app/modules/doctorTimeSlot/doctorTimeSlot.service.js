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
exports.TimeSlotService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const moment_1 = __importDefault(require("moment"));
const createTimeSlot = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const isDoctor = yield prisma_1.default.doctor.findUnique({
        where: {
            id: userId
        }
    });
    if (!isDoctor) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    const result = yield prisma_1.default.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const isAlreadyExist = yield tx.doctorTimeSlot.findFirst({
            where: {
                doctorId: isDoctor.id,
                day: payload.day
            }
        });
        if (isAlreadyExist) {
            throw new apiError_1.default(404, 'Time Slot Already Exist Please update or try another day');
        }
        const createTimeSlot = yield tx.doctorTimeSlot.create({
            data: {
                day: payload.day,
                doctorId: isDoctor.id,
                maximumPatient: payload.maximumPatient,
                weekDay: payload.weekDay,
                timeSlot: {
                    create: payload.timeSlot.map((item) => ({
                        startTime: item.startTime,
                        endTime: item.endTime
                    }))
                }
            }
        });
        return createTimeSlot;
    }));
    // const tx = await prisma.$transaction(async() =>())
    // const result = await prisma.doctorTimeSlot.create({
    //     data: {
    //         day: payload.day,
    //         doctorId: isDoctor.id,
    //         maximumPatient: payload.maximumPatient,
    //         weekDay: payload.weekDay,
    //         timeSlot: {
    //             create: payload.timeSlot.map((item: any) => ({
    //                 startTime: item.startTime,
    //                 endTime: item.endTime
    //             }))
    //         }
    //     }
    // })
    return result;
});
const deleteTimeSlot = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.doctorTimeSlot.delete({
        where: {
            id: id
        }
    });
    return result;
});
const getTimeSlot = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.doctorTimeSlot.findFirst({
        where: {
            id: id
        }
    });
    return result;
});
const getMyTimeSlot = (user, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const isDoctor = yield prisma_1.default.doctor.findUnique({
        where: {
            id: userId
        }
    });
    if (!isDoctor) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    let andCondition = { doctorId: isDoctor.id };
    if (filter.day) {
        andCondition.day = filter.day;
    }
    const whereCondition = andCondition ? andCondition : {};
    const result = yield prisma_1.default.doctorTimeSlot.findMany({
        where: whereCondition,
        include: {
            timeSlot: true
        }
    });
    return result;
});
const getAllTimeSlot = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.doctorTimeSlot.findMany({
        include: {
            timeSlot: true,
            doctor: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
    return result;
});
const updateTimeSlot = (user, id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = user;
    const isDoctor = yield prisma_1.default.doctor.findUnique({
        where: {
            id: userId
        }
    });
    if (!isDoctor) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Doctor Account is not found !!');
    }
    const { timeSlot, create } = payload;
    if (create && create.length > 0) {
        const doctorTimeSlot = yield prisma_1.default.doctorTimeSlot.findFirst({
            where: {
                day: create[0].day
            }
        });
        if (!doctorTimeSlot) {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, 'Time Slot is not found !!');
        }
        yield Promise.all(create.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield prisma_1.default.scheduleDay.create({
                    data: {
                        startTime: item.startTime,
                        endTime: item.endTime,
                        doctorTimeSlotId: doctorTimeSlot === null || doctorTimeSlot === void 0 ? void 0 : doctorTimeSlot.id
                    }
                });
            }
            catch (error) {
                throw new apiError_1.default(http_status_1.default.EXPECTATION_FAILED, 'Failed to create');
            }
        })));
    }
    if (timeSlot && timeSlot.length > 0) {
        yield Promise.all(timeSlot.map((item) => __awaiter(void 0, void 0, void 0, function* () {
            const { doctorTimeSlotId } = item, others = __rest(item, ["doctorTimeSlotId"]);
            try {
                yield prisma_1.default.scheduleDay.updateMany({
                    where: { id: others.id },
                    data: {
                        startTime: others.startTime,
                        endTime: others.endTime
                    }
                });
            }
            catch (error) {
                throw new apiError_1.default(http_status_1.default.EXPECTATION_FAILED, 'Failed to Update');
            }
        })));
    }
    return {
        message: 'Successfully Updated'
    };
});
const getAppointmentTimeOfEachDoctor = (id, filter) => __awaiter(void 0, void 0, void 0, function* () {
    const doctorTimSlot = yield prisma_1.default.doctorTimeSlot.findMany({
        where: {
            doctorId: id
        },
        include: {
            timeSlot: true
        },
    });
    const allSlots = doctorTimSlot.map((item) => {
        const { day, timeSlot } = item, others = __rest(item, ["day", "timeSlot"]);
        return { day, timeSlot };
    });
    const generateTimeSlot = (timeSlot) => {
        const selectedTime = [];
        timeSlot.forEach((item) => {
            const interval = 30;
            const newTimeSlots = [];
            const day = item === null || item === void 0 ? void 0 : item.day;
            item === null || item === void 0 ? void 0 : item.timeSlot.map((slot) => {
                const { startTime, endTime } = slot;
                const startDate = (0, moment_1.default)(startTime, 'hh:mm a');
                const endDate = (0, moment_1.default)(endTime, 'hh:mm a');
                while (startDate < endDate) {
                    const selectableTime = {
                        id: newTimeSlots.length + 1,
                        time: startDate.format('hh:mm a')
                    };
                    newTimeSlots.push({ day: day, slot: selectableTime });
                    startDate.add(interval, 'minutes');
                }
            });
            if (filter.day) {
                const newTime = newTimeSlots.filter((item) => item.day === filter.day);
                selectedTime.push(newTime);
            }
        });
        return selectedTime.flat();
    };
    const result = generateTimeSlot(allSlots);
    return result;
});
exports.TimeSlotService = {
    updateTimeSlot,
    getAllTimeSlot,
    getTimeSlot,
    createTimeSlot,
    deleteTimeSlot,
    getMyTimeSlot,
    getAppointmentTimeOfEachDoctor
};
