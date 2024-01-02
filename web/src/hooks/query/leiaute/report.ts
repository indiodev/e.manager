import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { LeiauteService } from '~/api';
import type { LeiauteQuery } from '~/models';

async function mutator(params: Partial<LeiauteQuery>): Promise<void> {
	await LeiauteService.report(params);
}

export function useLeiauteReport(): UseMutationResult<
	void,
	Error | AxiosError,
	Partial<LeiauteQuery>
> {
	return useMutation({
		mutationFn: (params: Partial<LeiauteQuery>) => mutator(params),
	});
}
