import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

const createToken = (payload: object, secret: Secret, expireTime: string) => {
    const options: SignOptions = { expiresIn: expireTime as SignOptions['expiresIn'] };
    return jwt.sign(payload, secret, options);
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
    return jwt.verify(token, secret) as JwtPayload
}

export const JwtHelper = {
    verifyToken,
    createToken
}