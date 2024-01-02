import type { AxiosError, AxiosInstance } from 'axios';
import axios from 'axios';

import { useAuth } from '~/hooks';

export const API: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.response.use(
	(config) => config,
	(error: AxiosError) => {
		if (
			error.response?.status === 401 &&
			error.response.statusText === 'Unauthorized'
		) {
			useAuth.getState().logout();
		}

		return Promise.reject(error);
	},
);

API.interceptors.request.use(
	(config) => config,
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

export * as AuthService from './endpoints/auth';
export * as LeiauteService from './endpoints/leiaute';
export * as UserService from './endpoints/user';
export * as VersionService from './endpoints/version';
