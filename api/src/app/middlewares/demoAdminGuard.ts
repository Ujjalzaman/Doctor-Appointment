import { NextFunction, Request, Response } from 'express';
import { Secret } from 'jsonwebtoken';
import config from '../../config';
import ApiError from '../../errors/apiError';
import { JwtHelper } from '../../helpers/jwtHelper';

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

/**
 * Blocks POST/PATCH/PUT/DELETE for admin users with isDemo in JWT (read-only demo accounts).
 */
export const demoAdminGuard = (req: Request, res: Response, next: NextFunction) => {
    const raw = req.headers.authorization as string | undefined;
    if (!raw || SAFE_METHODS.has(req.method)) {
        return next();
    }
    try {
        const payload = JwtHelper.verifyToken(raw, config.jwt.secret as Secret) as {
            role?: string;
            isDemo?: boolean;
        };
        if (payload.role === 'admin' && payload.isDemo === true) {
            return next(new ApiError(403, 'Demo admin accounts are read-only. You cannot create, update, or delete data.'));
        }
    } catch (e) {
        if (e instanceof ApiError) {
            return next(e);
        }
        // Invalid or expired token — let route-level auth return the appropriate error.
    }
    next();
};
