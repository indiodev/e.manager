import type { AxiosResponse } from 'axios';

import { API } from '../lib';
import type {
	CreatedSchema,
	Schema as Model,
	Paginate,
	Params,
} from '../models';

export const Schema = {
	Paginate: async (params: Params): Promise<Paginate<Model>> => {
		const { data } = await API.get<Paginate<Model>>('/schemas/paginate', {
			params,
		});

		return data;
	},

	Report: async (id: string): Promise<AxiosResponse<void>> => {
		const response = await API.get(`/schemas/${id}/report`, {
			responseType: 'blob',
		});

		const url = window.URL.createObjectURL(
			new Blob([response.data], {
				type: `application/csv`,
			}),
		);

		const link = document.createElement('a');
		link.href = url;

		const file_name = response?.config?.url
			?.split('/')
			?.find((part) => part === id);

		link.setAttribute('download', `${file_name}.csv`);

		document.body.appendChild(link);
		link.click();

		return response;
	},

	Show: async (id: string): Promise<Model> => {
		const { data } = await API.get<Model>(`/schemas/${id}`);

		return data;
	},

	Mapping: async (data: FormData): Promise<Model[]> => {
		const { data: nodes } = await API.post<Model[]>(`/schemas/mapping`, data);
		return nodes;
	},

	Build: async (data: FormData): Promise<CreatedSchema> => {
		const { data: crated } = await API.post<CreatedSchema>(
			`/schemas/build`,
			data,
		);
		return crated;
	},
};
