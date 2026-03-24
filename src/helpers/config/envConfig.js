// const raw = process.env.REACT_APP_API_BASE_URL || '';
const REACT_APP_API_BASE_URL = 'https://doctor-on-call-backend.vercel.app/api/v1';

export const getBaseUrl = () => {
	const trimmed = String(REACT_APP_API_BASE_URL).trim().replace(/\/+$/, '');
	if (!trimmed) return REACT_APP_API_BASE_URL;
	if (/\/api\/v1$/i.test(trimmed)) return trimmed;
	return `${trimmed}/api/v1`;
};