import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import CookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import ApiError from './errors/apiError';
import router from './app/routes';
import config from './config';

const app: Application = express();

app.use(cors());
app.use(CookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/favicon.ico', (req: Request, res: Response) => {
    res.status(204).end();
})

app.get('/', (req: Request, res: Response) => {
    res.send(config.clientUrl)
})

app.use('/api/v1', router);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(err);
    }
    console.error('[api error]', req.method, req.originalUrl, err);
    if (err instanceof ApiError) {
        return res
            .status(err.statusCode)
            .json({ success: false, message: err.message });
    }
    const e = err as { statusCode?: number; message?: string; stack?: string; name?: string };
    const statusCode =
        typeof e.statusCode === 'number' && e.statusCode >= 400 && e.statusCode < 600
            ? e.statusCode
            : httpStatus.INTERNAL_SERVER_ERROR;
    const body: Record<string, unknown> = {
        success: false,
        message: config.showErrorDetails
            ? e.message || String(err)
            : 'Something Went Wrong',
    };
    if (config.showErrorDetails && e.stack) {
        body.stack = e.stack;
    }
    if (config.showErrorDetails && e.name) {
        body.error = e.name;
    }
    return res.status(statusCode).json(body);
});

export default app;