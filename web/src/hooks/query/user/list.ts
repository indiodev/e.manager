import type { UseQueryResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { KEYS } from '../keys';

import { UserService } from '~/api';
import type { User } from '~/models';

async function fetch(): Promise<User[]> {
	const { data } = await UserService._list();
	return data;
}

type UseUserListType = UseQueryResult<User[], AxiosError | Error>;

export function useUserList(): UseUserListType {
	return useQuery({
		queryKey: [KEYS['USER-PAGINATE-LIST']],
		queryFn: () => fetch(),
	});
}
