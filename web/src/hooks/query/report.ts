import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { Service } from '@/src/services';

async function mutator(id: string): Promise<void> {
	await Service.Schema.Report(id);
}

export function useSchemaReport(): UseMutationResult<void, Error, string> {
	return useMutation({
		mutationFn: (id: string) => mutator(id),
	});
}
