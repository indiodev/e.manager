/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { CreatedSchema } from '@/src/models';
import { Service } from '@/src/services';

async function mutator(data: FormData): Promise<CreatedSchema> {
	return await Service.Schema.Build(data);
}

interface Props {
	onSuccess: (data: CreatedSchema) => void;
	onError: (error: Error | AxiosError) => void;
}

export function useBuildNodesMutation({ onError, onSuccess }: Props) {
	return useMutation({
		mutationKey: ['BUILD_NODES'],
		mutationFn: mutator,
		onSuccess,
		onError,
	});
}
