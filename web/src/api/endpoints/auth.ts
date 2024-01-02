import type { AxiosResponse } from 'axios';

import { API } from '~/api';
import type { AuthRequest, Token } from '~/models/auth';

export async function signin(data: AuthRequest): Promise<AxiosResponse<Token>> {
	const response = await API.post('/auth/login', data);
	return response;
}
