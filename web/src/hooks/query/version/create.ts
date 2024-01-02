/* eslint-disable no-unused-vars */
import type { UseMutationResult } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { VersionService } from '~/api';
import type { Version } from '~/models/version';

async function mutate(data: Partial<Version>): Promise<Version> {
	const { data: version } = await VersionService.create(data);

	return version;
}

interface Props {
	onSuccess?: (data: Version) => void;
	onError?: (error: Error | AxiosError) => void;
}

export function useCreateVersion({
	onSuccess,
	onError,
}: Props): UseMutationResult<Version, Error | AxiosError, Partial<Version>> {
	return useMutation({
		mutationFn: (data: Partial<Version>) => mutate(data),
		onSuccess,
		onError,
	});
}
