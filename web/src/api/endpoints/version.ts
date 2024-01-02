import type { AxiosResponse } from 'axios';

import { API } from '..';

import type { Version } from '~/models/version';

export async function list(): Promise<AxiosResponse<Version[]>> {
	return await API.get<Version[]>('/versions');
}

export async function create(
	data: Partial<Version>,
): Promise<AxiosResponse<Version>> {
	return await API.post<Version>('/versions', data);
}
