/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import type { Login, Token } from '@/src/models';
import { Service } from '@/src/services';

async function mutator(data: Login): Promise<Token> {
	return await Service.Auth.Login(data);
}

interface Props {
	onSuccess: (data: Token) => void;
	onError: (error: Error | AxiosError) => void;
}

export function useAuthQuery({ onError, onSuccess }: Props) {
	return useMutation({
		mutationKey: ['AUTH_LOGIN'],
		mutationFn: mutator,
		onSuccess,
		onError,
	});
}
