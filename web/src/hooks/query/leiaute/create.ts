/* eslint-disable no-unused-vars */
import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { LeiauteService } from '~/api';
import type { Leiaute } from '~/models';

async function mutator(data: Partial<Leiaute>): Promise<Leiaute> {
	const { data: leiaute } = await LeiauteService.create(data);
	return leiaute;
}

interface Props {
	onSuccess: (data: Leiaute) => void;
	onError: (error: AxiosError | Error) => void;
}

export function useCreateLeiaute({
	onError,
	onSuccess,
}: Props): UseMutationResult<Leiaute, AxiosError | Error, Partial<Leiaute>> {
	return useMutation({
		mutationFn: (data: Partial<Leiaute>) => mutator(data),
		onError: (error: Error | AxiosError) => onError(error),
		onSuccess: (data: Leiaute) => onSuccess(data),
	});
}
