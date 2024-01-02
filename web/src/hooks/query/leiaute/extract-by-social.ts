import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { KEYS } from '../keys';

import { LeiauteService } from '~/api';
import type { ExtractData, LeiauteQuery } from '~/models';

async function fetcher(params?: Partial<LeiauteQuery>): Promise<ExtractData> {
	const { data } = await LeiauteService.extracts(params);

	return data;
}

type UseExtractBySocial = UseQueryResult<ExtractData, Error | AxiosError>;

export function useExtractBySocial(
	params?: Partial<LeiauteQuery>,
): UseExtractBySocial {
	return useQuery({
		queryKey: [KEYS['EXTRACT-BY-SOCIAL'], params],
		queryFn: () => fetcher(params),
		enabled: !!params?.version && !!params?.prefix,
	});
}
