/**
 * Vercel serverless entry: export Express app without listen().
 * Local/dev still uses src/server.ts.
 */
import app from './app';

export default app;
