import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { KEYS } from '../keys';

import { LeiauteService } from '~/api';
import type { ColumnData, LeiauteQuery } from '~/models';

async function fetcher(params: Partial<LeiauteQuery>): Promise<ColumnData> {
	const { data } = await LeiauteService.columns(params);

	return data;
}

type UseColumnList = UseQueryResult<ColumnData, Error | AxiosError>;

export function useColumnList(params: Partial<LeiauteQuery>): UseColumnList {
	return useQuery({
		queryKey: [KEYS['COLUMN-LIST'], params],
		queryFn: () => fetcher(params),
		enabled: !!params?.version && !!params?.prefix,
	});
}
