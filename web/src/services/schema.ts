import { API } from '../lib';
import type { Schema as Model, Paginate, Params } from '../models';

export const Schema = {
	Paginate: async (params: Params): Promise<Paginate<Model>> => {
		const { data } = await API.get<Paginate<Model>>('/schemas/paginate', {
			params,
		});

		return data;
	},
};
