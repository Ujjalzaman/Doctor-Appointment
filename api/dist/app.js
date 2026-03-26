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
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});
app.get('/', (req, res) => {
    res.send(config_1.default.clientUrl);
});
app.use('/api/v1', routes_1.default);
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error('[api error]', req.method, req.originalUrl, err);
    if (err instanceof apiError_1.default) {
        return res
            .status(err.statusCode)
            .json({ success: false, message: err.message });
    }
    const e = err;
    const statusCode = typeof e.statusCode === 'number' && e.statusCode >= 400 && e.statusCode < 600
        ? e.statusCode
        : http_status_1.default.INTERNAL_SERVER_ERROR;
    const body = {
        success: false,
        message: config_1.default.showErrorDetails
            ? e.message || String(err)
            : 'Something Went Wrong',
    };
    if (config_1.default.showErrorDetails && e.stack) {
        body.stack = e.stack;
    }
    if (config_1.default.showErrorDetails && e.name) {
        body.error = e.name;
    }
    return res.status(statusCode).json(body);
});
exports.default = app;
