import { NODE_ENV } from '../constants/secrets';

export const constructBaseUrl = (host: string) => {
	if (NODE_ENV === 'local' || NODE_ENV === 'test') {
		return `http://${host}`;
	} else {
		return `https://${host}`;
	}
};
