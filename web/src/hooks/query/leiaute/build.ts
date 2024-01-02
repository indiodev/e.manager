/* eslint-disable no-unused-vars */
import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { LeiauteService } from '~/api';
import type { ExtractData, LeiauteQuery } from '~/models';

async function mutator(
	request: Pick<ExtractData, 'extracts'> &
		Pick<LeiauteQuery, 'prefix' | 'version'>,
): Promise<ExtractData> {
	const { data } = await LeiauteService.build(request);
	return data;
}

interface UseExtractBuild {
	onSuccess: (data: ExtractData) => void;
	onError: (error: AxiosError | Error) => void;
}

export function useExtractBuild({
	onError,
	onSuccess,
}: UseExtractBuild): UseMutationResult<
	ExtractData,
	Error | AxiosError<unknown, any>,
	Pick<ExtractData, 'extracts'> & Pick<LeiauteQuery, 'prefix' | 'version'>,
	unknown
> {
	return useMutation({
		mutationFn: (
			request: Pick<ExtractData, 'extracts'> &
				Pick<LeiauteQuery, 'prefix' | 'version'>,
		) => mutator(request),
		onError: (error: Error | AxiosError) => onError(error),
		onSuccess: (data: ExtractData) => onSuccess(data),
	});
}
