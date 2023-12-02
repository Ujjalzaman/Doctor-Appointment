import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../shared/prisma";
import { UserRole } from "@prisma/client";
import bcrypt from 'bcrypt';

export const create = async (payload: any): Promise<any> => {
    try {
        const data = await prisma.$transaction(async (tx) => {
            const { password, ...othersData } = payload;
            const doctor = await tx.doctor.create({
                data: othersData,
            });

            if (doctor) {
                const auth = await tx.auth.create({
                    data: {
                        email: doctor.email,
                        password: password && await bcrypt.hashSync(password, 12),
                        role: UserRole.doctor,
                        userId: doctor.id
                    },
                });
                return {
                    doctor,
                    auth,
                };
            }
        });

        return data;
    } catch (error:any) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message)
    }
};