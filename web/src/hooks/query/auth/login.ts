/* eslint-disable no-unused-vars */
import { useMutation, type UseMutationResult } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { AuthService } from '~/api';
import type { AuthRequest, Token } from '~/models';

async function mutator(data: AuthRequest): Promise<Token> {
	const response = await AuthService.signin(data);
	return response.data;
}

interface UseLoginProps {
	onSuccess: (data: Token) => void;
	onError: (error: Error | AxiosError) => void;
}

export function useLogin({
	onSuccess,
	onError,
}: UseLoginProps): UseMutationResult<
	Token,
	Error | AxiosError,
	AuthRequest,
	unknown
> {
	return useMutation({
		mutationFn: (data: AuthRequest) => mutator(data),
		onSuccess: (data) => onSuccess(data),
		onError: (error) => onError(error),
	});
}
