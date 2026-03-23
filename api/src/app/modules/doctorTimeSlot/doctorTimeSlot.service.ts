import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../shared/prisma";
import { DoctorTimeSlot, ScheduleDay } from "@prisma/client";
import moment from "moment";

const createTimeSlot = async (user: any, payload: any): Promise<DoctorTimeSlot | null> => {
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }

    const result = await prisma.$transaction(async (tx) => {
        const isAlreadyExist = await tx.doctorTimeSlot.findFirst({
            where:{
                doctorId: isDoctor.id,
                day: payload.day
            }
        })
        if(isAlreadyExist){
            throw new ApiError(404, 'Time Slot Already Exist Please update or try another day')
        }

        const createTimeSlot = await tx.doctorTimeSlot.create({
            data: {
                day: payload.day,
                doctorId: isDoctor.id,
                maximumPatient: payload.maximumPatient,
                weekDay: payload.weekDay,
                timeSlot: {
                    create: payload.timeSlot.map((item: any) => ({
                        startTime: item.startTime,
                        endTime: item.endTime
                    }))
                }
            }
        });

        return createTimeSlot;
    })
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
}

const deleteTimeSlot = async (id: string): Promise<DoctorTimeSlot | null> => {
    const result = await prisma.doctorTimeSlot.delete({
        where: {
            id: id
        }
    })
    return result;
}

const getTimeSlot = async (id: string): Promise<DoctorTimeSlot | null> => {
    const result = await prisma.doctorTimeSlot.findFirst({
        where: {
            id: id
        }
    })
    return result;
}

const getMyTimeSlot = async (user: any, filter: any): Promise<DoctorTimeSlot[] | null> => {
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    let andCondition: any = { doctorId: isDoctor.id };
    if (filter.day) {
        andCondition.day = filter.day
    }

    const whereCondition = andCondition ? andCondition : {}
    const result = await prisma.doctorTimeSlot.findMany({
        where: whereCondition,
        include: {
            timeSlot: true
        }
    })
    return result;
}

const getAllTimeSlot = async (): Promise<DoctorTimeSlot[] | null> => {
    const result = await prisma.doctorTimeSlot.findMany({
        include: {
            timeSlot: true,
            doctor: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    })
    return result;
}
const updateTimeSlot = async (user: any, id: string, payload: any): Promise<{ message: string }> => {
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const { timeSlot, create } = payload;

    if (create && create.length > 0) {
        const doctorTimeSlot = await prisma.doctorTimeSlot.findFirst({
            where: {
                day: create[0].day
            }
        })
        if (!doctorTimeSlot) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Time Slot is not found !!')
        }
        await Promise.all(create.map(async (item: ScheduleDay) => {
            try {
                await prisma.scheduleDay.create({
                    data: {
                        startTime: item.startTime,
                        endTime: item.endTime,
                        doctorTimeSlotId: doctorTimeSlot?.id
                    }
                })
            } catch (error) {
                throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to create')
            }
        }))
    }

    if (timeSlot && timeSlot.length > 0) {
        await Promise.all(timeSlot.map(async (item: ScheduleDay) => {
            const { doctorTimeSlotId, ...others } = item;
            try {
                await prisma.scheduleDay.updateMany({
                    where: { id: others.id },
                    data: {
                        startTime: others.startTime,
                        endTime: others.endTime
                    }
                })
            } catch (error) {
                throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Failed to Update')
            }
        }))
    }
    return {
        message: 'Successfully Updated'
    }
}

const getAppointmentTimeOfEachDoctor = async (id: string, filter: any): Promise<any> => {
    const doctorTimSlot = await prisma.doctorTimeSlot.findMany({
        where: {
            doctorId: id
        },
        include: {
            timeSlot: true
        },
    })

    const allSlots = doctorTimSlot.map((item) => {
        const { day, timeSlot, ...others } = item;
        return { day, timeSlot }
    })

    const generateTimeSlot = (timeSlot: any) => {
        const selectedTime: any[] = [];
        timeSlot.forEach((item: any) => {
            const interval = 30;
            const newTimeSlots: any[] = [];
            const day: string = item?.day;

            item?.timeSlot.map((slot: ScheduleDay) => {

                const { startTime, endTime } = slot;
                const startDate = moment(startTime, 'hh:mm a');
                const endDate = moment(endTime, 'hh:mm a');

                while (startDate < endDate) {
                    const selectableTime = {
                        id: newTimeSlots.length + 1,
                        time: startDate.format('hh:mm a')
                    }
                    newTimeSlots.push({ day: day, slot: selectableTime });
                    startDate.add(interval, 'minutes');
                }
            })
            if (filter.day) {
                const newTime = newTimeSlots.filter((item) => item.day === filter.day);
                selectedTime.push(newTime);
            }
        })
        return selectedTime.flat();
    }
    const result = generateTimeSlot(allSlots)
    return result
}

export const TimeSlotService = {
    updateTimeSlot,
    getAllTimeSlot,
    getTimeSlot,
    createTimeSlot,
    deleteTimeSlot,
    getMyTimeSlot,
    getAppointmentTimeOfEachDoctor
}