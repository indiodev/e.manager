import type { AxiosResponse } from 'axios';

import { API } from '..';

import type { User } from '~/models';
import type { CreateUserType } from '~/schemas/user';

export async function _list(): Promise<AxiosResponse<User[]>> {
	return await API.get<User[]>('/users');
}

export async function create(
	data: CreateUserType,
): Promise<AxiosResponse<User>> {
	return await API.post<User>('/users', data);
}
