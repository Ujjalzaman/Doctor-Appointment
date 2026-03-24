"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.demoAdminGuard = void 0;
const config_1 = __importDefault(require("../../config"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const jwtHelper_1 = require("../../helpers/jwtHelper");
const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
/**
 * Blocks POST/PATCH/PUT/DELETE for admin users with isDemo in JWT (read-only demo accounts).
 */
const demoAdminGuard = (req, res, next) => {
    const raw = req.headers.authorization;
    if (!raw || SAFE_METHODS.has(req.method)) {
        return next();
    }
    try {
        const payload = jwtHelper_1.JwtHelper.verifyToken(raw, config_1.default.jwt.secret);
        if (payload.role === 'admin' && payload.isDemo === true) {
            return next(new apiError_1.default(403, 'Demo admin accounts are read-only. You cannot create, update, or delete data.'));
        }
    }
    catch (e) {
        if (e instanceof apiError_1.default) {
            return next(e);
        }
        // Invalid or expired token — let route-level auth return the appropriate error.
    }
    next();
};
exports.demoAdminGuard = demoAdminGuard;
