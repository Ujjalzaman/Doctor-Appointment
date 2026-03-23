const raw = process.env.REACT_APP_API_BASE_URL || '';

/**
 * Ensures requests hit /api/v1/... (Express mounts the API there).
 * Avoids 404 when REACT_APP_API_BASE_URL is set to origin only, e.g. http://localhost:5050
 */
export const getBaseUrl = () => {
	const trimmed = String(raw).trim().replace(/\/+$/, '');
	if (!trimmed) return 'http://localhost:5050/api/v1';
	if (/\/api\/v1$/i.test(trimmed)) return trimmed;
	return `${trimmed}/api/v1`;
};