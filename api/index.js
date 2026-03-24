// Vercel handler when the repo root is the project root (Root Directory empty).
const app = require('./dist/app').default;
module.exports = app;
