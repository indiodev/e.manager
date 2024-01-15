import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

import type { Schema } from '@/src/models';
import { Service } from '@/src/services';

async function fetcher(id: string): Promise<Schema> {
	return await Service.Schema.Show(id);
}

export function useShowSchema(id: string): UseQueryResult<Schema, Error> {
	return useQuery({
		queryKey: ['SHOW_SCHEMA', id],
		queryFn: () => fetcher(id),
	});
}
