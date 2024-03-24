import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../shared/prisma";
import { UserRole } from "@prisma/client";
import bcrypt from 'bcrypt';

export const create = async (payload: any): Promise<any> => {
    try {
        const data = await prisma.$transaction(async (tx) => {
            const { password, ...othersData } = payload;

            const patient = await tx.patient.create({
                data: othersData,
            });

            if (patient) {
                const auth = await tx.auth.create({
                    data: {
                        email: patient.email,
                        password: password && await bcrypt.hashSync(password, 12),
                        role: UserRole.patient,
                    },
                });
                return {
                    patient,
                    auth,
                };
            }
        });

        return data;
    } catch (error:any) {
        throw new ApiError(httpStatus.BAD_REQUEST, error.message)
    }
};