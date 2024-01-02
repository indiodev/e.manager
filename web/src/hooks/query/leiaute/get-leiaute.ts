/* eslint-disable no-unused-vars */
import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { KEYS } from '../keys';

import { LeiauteService } from '~/api';
import type { Leiaute, LeiauteQuery } from '~/models';

async function fetcher(params?: Partial<LeiauteQuery>): Promise<Leiaute> {
	const { data } = await LeiauteService.get(params);

	return data;
}

type UseGetLeiaute = UseQueryResult<Leiaute, Error | AxiosError>;

interface Props {
	params?: Partial<LeiauteQuery>;
	onSuccess: (data: Leiaute) => void;
	onError: (error: Error | AxiosError) => void;
}

export function useGetLeiaute({
	onSuccess,
	params,
	onError,
}: Props): UseGetLeiaute {
	return useQuery({
		queryKey: [KEYS['GET-LEIAUTE'], params],
		queryFn: () => fetcher(params),
		onSuccess: (data) => onSuccess(data),
		onError,
	});
}
