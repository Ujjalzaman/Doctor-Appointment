const useLocalApi = String(process.env.REACT_APP_USE_LOCAL_API).toLowerCase() === 'true';

const REACT_APP_API_BASE_URL =
	(useLocalApi
		? process.env.REACT_APP_API_BASE_URL_LOCAL
		: process.env.REACT_APP_API_BASE_URL_LIVE) ||
	process.env.REACT_APP_API_BASE_URL ||
	'';

export const getBaseUrl = () => {
	const trimmed = String(REACT_APP_API_BASE_URL).trim().replace(/\/+$/, '');
	if (!trimmed) return REACT_APP_API_BASE_URL;
	if (/\/api\/v1$/i.test(trimmed)) return trimmed;
	return `${trimmed}/api/v1`;
};