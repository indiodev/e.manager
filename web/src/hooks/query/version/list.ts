import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { KEYS } from '../keys';

import { VersionService } from '~/api';
import type { Version } from '~/models/version';

async function fetcher(): Promise<Version[]> {
	const { data } = await VersionService.list();

	return data;
}

type UseLeiautePaginate = UseQueryResult<Version[], Error | AxiosError>;

export function useVersionList(): UseLeiautePaginate {
	return useQuery({
		queryKey: [KEYS['VERSION-LIST']],
		queryFn: () => fetcher(),
	});
}
