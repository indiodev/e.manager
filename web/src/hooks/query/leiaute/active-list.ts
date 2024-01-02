import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { KEYS } from '../keys';

import { LeiauteService } from '~/api';
import type { Leiaute } from '~/models';

async function fetcher(): Promise<Leiaute[]> {
	const { data } = await LeiauteService.active();

	return data;
}

type UseLeiauteActiveList = UseQueryResult<Leiaute[], Error | AxiosError>;

export function useLeiauteActiveList(): UseLeiauteActiveList {
	return useQuery({
		queryKey: [KEYS['LEIAUTE-ACTIVE-LIST']],
		queryFn: () => fetcher(),
	});
}
