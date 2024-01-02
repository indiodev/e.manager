import type { AxiosResponse } from 'axios';

import { API } from '..';

import type {
	ColumnData,
	Extract,
	ExtractData,
	ExtractRequest,
	Leiaute,
	LeiauteQuery,
	Paginate,
} from '~/models';

export async function create(
	data: Partial<Leiaute>,
): Promise<AxiosResponse<Leiaute>> {
	return await API.post<Leiaute>('/leiautes', data);
}

export async function list(
	params?: LeiauteQuery,
): Promise<AxiosResponse<Paginate<Leiaute>>> {
	return await API.get<Paginate<Leiaute>>('/leiautes', { params });
}
export async function get(
	params?: Partial<LeiauteQuery>,
): Promise<AxiosResponse<Leiaute>> {
	return await API.get<Leiaute>(`/leiautes/${params?.id}`);
}

export async function extractList(
	params?: Partial<LeiauteQuery>,
): Promise<AxiosResponse<Paginate<Extract>>> {
	return await API.get<Paginate<Extract>>('/leiaute/extract-list', {
		params,
	});
}

export async function active(): Promise<AxiosResponse<Leiaute[]>> {
	return await API.get<Leiaute[]>('/leiaute/active-list');
}

export async function columns(
	params: Partial<LeiauteQuery>,
): Promise<AxiosResponse<ColumnData>> {
	return await API.get<ColumnData>('/leiaute/columns', {
		params,
	});
}

export async function extract({
	leiautes,
	...params
}: ExtractRequest): Promise<AxiosResponse<ExtractData>> {
	return await API.post(`/leiaute/extract`, leiautes, { params });
}

export async function build({
	extracts,
	...params
}: Pick<ExtractData, 'extracts'> &
	Pick<LeiauteQuery, 'prefix' | 'version'>): Promise<
	AxiosResponse<ExtractData>
> {
	return await API.post(`/leiaute/build`, { extracts }, { params });
}

export async function toggleActive(id: string): Promise<AxiosResponse<void>> {
	return await API.patch(`/leiaute/${id}/toggle-active`);
}

export async function report(
	params: Partial<LeiauteQuery>,
): Promise<AxiosResponse<void>> {
	const response = await API.get('/leiaute/export', {
		responseType: 'blob',
		params,
	});

	const url = window.URL.createObjectURL(
		new Blob([response.data], {
			type: `application/${params?.export_type}`,
		}),
	);

	const link = document.createElement('a');
	link.href = url;

	link.setAttribute(
		'download',
		`${url.split('/').pop()}.${params?.export_type}`,
	);

	document.body.appendChild(link);
	link.click();

	return response;
}

export async function extracts(
	params?: Partial<LeiauteQuery>,
): Promise<AxiosResponse<ExtractData>> {
	return await API.get<ExtractData>(
		`/leiaute/extracts/${params?.e_social_id}`,
		{
			params,
		},
	);
}
