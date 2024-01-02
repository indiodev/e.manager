import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { KEYS } from '../keys';

import { LeiauteService } from '~/api';
import type { Leiaute, LeiauteQuery, Paginate } from '~/models';

async function fetcher(params?: LeiauteQuery): Promise<Paginate<Leiaute>> {
	const { data } = await LeiauteService.list(params);

	return data;
}

type UseLeiautePaginate = UseQueryResult<Paginate<Leiaute>, Error | AxiosError>;

export function useLeiautePaginate(params?: LeiauteQuery): UseLeiautePaginate {
	return useQuery({
		queryKey: [KEYS['LEIAUTE-PAGINATE-LIST'], params],
		queryFn: () => fetcher(params),
	});
}
