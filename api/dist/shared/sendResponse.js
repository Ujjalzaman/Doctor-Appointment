"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendResponse = (res, data) => {
    const response = {
        statusCode: data.statusCode,
        success: data.success,
        message: data.message || null,
        meta: data.meta || null || undefined,
        data: data.data || null || undefined,
    };
    res.status(data.statusCode).json(response);
};
exports.default = sendResponse;
