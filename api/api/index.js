// Vercel handler when Root Directory is `api` (see api/vercel.json rewrites → /api).
const app = require('../dist/app').default;
module.exports = app;
