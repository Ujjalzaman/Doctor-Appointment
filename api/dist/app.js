"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("./errors/apiError"));
const routes_1 = __importDefault(require("./app/routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use('/api/v1', routes_1.default);
app.use((err, req, res, next) => {
    if (err instanceof apiError_1.default) {
        res.status(err.statusCode).json({ success: false, message: err.message });
    }
    else {
        res.status(http_status_1.default.NOT_FOUND).json({
            success: false,
            message: 'Something Went Wrong',
        });
    }
    next();
});
exports.default = app;
