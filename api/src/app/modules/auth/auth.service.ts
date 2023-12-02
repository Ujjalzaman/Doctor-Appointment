import bcrypt from 'bcrypt';
import prisma from "../../../shared/prisma";
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { JwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

type ILginResponse = {
    accessToken?: string;
    user: {}
}

const loginUser = async (user: any): Promise<ILginResponse> => {
    const { email: IEmail, password } = user;
    const isUserExist = await prisma.auth.findUnique({
        where: { email: IEmail }
    })

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not Exist !");
    }
    const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.NOT_FOUND, "Password is not Matched !");
    }
    const { email, id, role, userId } = isUserExist;
    const accessToken = JwtHelper.createToken(
        { role, userId },
        config.jwt.secret as Secret,
        config.jwt.JWT_EXPIRES_IN as string
    )
    return { accessToken, user: { role, userId } }
}

export const AuthService = {
    loginUser
}