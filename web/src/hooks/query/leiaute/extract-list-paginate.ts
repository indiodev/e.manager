import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { KEYS } from '../keys';

import { LeiauteService } from '~/api';
import type { Extract, LeiauteQuery, Paginate } from '~/models';

async function fetcher(
	params?: Partial<LeiauteQuery>,
): Promise<Paginate<Extract>> {
	const { data } = await LeiauteService.extractList(params);

	return data;
}

type UseExtractPaginate = UseQueryResult<Paginate<Extract>, Error | AxiosError>;

export function useExtractPaginate(
	params?: Partial<LeiauteQuery>,
): UseExtractPaginate {
	return useQuery({
		queryKey: [KEYS['EXTRACT-PAGINATE-LIST'], params],
		queryFn: () => fetcher(params),
		enabled: !!params?.version && !!params?.prefix,
	});
}
