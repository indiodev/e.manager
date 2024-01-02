/* eslint-disable no-unused-vars */
import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { LeiauteService } from '~/api';
import type { ExtractData, ExtractRequest } from '~/models';

async function mutator(request: ExtractRequest): Promise<ExtractData> {
	const { data: data } = await LeiauteService.extract(request);
	return data;
}

interface UseExtractLeiaute {
	onSuccess: (data: ExtractData) => void;
	onError: (error: AxiosError | Error) => void;
}

export function useExtractLeiaute({
	onError,
	onSuccess,
}: UseExtractLeiaute): UseMutationResult<
	ExtractData,
	AxiosError | Error,
	ExtractRequest
> {
	return useMutation({
		mutationFn: (request: ExtractRequest) => mutator(request),
		onError: (error: Error | AxiosError) => onError(error),
		onSuccess: (data: ExtractData) => onSuccess(data),
	});
}
