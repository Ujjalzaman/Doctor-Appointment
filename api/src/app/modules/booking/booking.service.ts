import prisma from "../../../shared/prisma";
import { Booking } from "@prisma/client";

const createBooking = async (user: any, payload: Booking): Promise<Booking> => {
    if (user) {
        payload['patientId'] = user.userId;
    }
    const booking = await prisma.booking.create({
        data: payload
    });
    return booking;
}

const getAllBookings = async (): Promise<Booking[] | null> => {
    const result = await prisma.booking.findMany();
    return result;
}

const getBooking = async (id: string): Promise<Booking | null> => {
    const result = await prisma.booking.findUnique({
        where: {
            id: id
        }
    });
    return result;
}

const getMyBooking = async (user: any): Promise<Booking[] | null> => {
    const result = await prisma.booking.findMany({
        where: {
            patientId : user.userId
        },
        include: {
            doctor: true
        }
    })
    return result;
}

const deleteBooking = async (id: string): Promise<any> => {
    const result = await prisma.booking.delete({
        where: {
            id: id
        }
    });
    return result;
}

const updateBooking = async (id: string, payload: Partial<Booking>): Promise<Booking> => {
    const result = await prisma.booking.update({
        data: payload,
        where: {
            id: id
        }
    })
    return result;
}

export const BookingService = {
    createBooking,
    getAllBookings,
    getBooking,
    deleteBooking,
    updateBooking,
    getMyBooking
}