/* eslint-disable no-unused-vars */
import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { LeiauteService } from '~/api';

async function mutator(id: string): Promise<void> {
	await LeiauteService.toggleActive(id);
}

interface UseToggleActiveLeiaute {
	onSuccess: () => void;
	onError: (error: AxiosError | Error) => void;
}

export function useToggleActiveLeiaute({
	onError,
	onSuccess,
}: UseToggleActiveLeiaute): UseMutationResult<
	void,
	AxiosError | Error,
	string
> {
	return useMutation({
		mutationFn: (id: string) => mutator(id),
		onError: (error: Error | AxiosError) => onError(error),
		onSuccess: () => onSuccess(),
	});
}
