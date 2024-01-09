import { API } from '../lib';
import type { Login, Token } from '../models';

export const Auth = {
	Login: async (data: Login): Promise<Token> => {
		const { data: token } = await API.post<Token>('/auth/login', data);
		return token;
	},
};
