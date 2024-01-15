import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { Paginate, Params, Schema } from '@/src/models';
import { Service } from '@/src/services';

async function fetcher(params: Params): Promise<Paginate<Schema>> {
	return await Service.Schema.Paginate(params);
}

interface Props {
	params: Params;
}

export function useSchemaPaginateQuery({
	params,
}: Props): UseQueryResult<Paginate<Schema>, Error> {
	return useQuery({
		queryKey: ['SCHEMA_PAGINATE', { ...params }],
		queryFn: () => fetcher(params),
	});
}
