/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { API } from '~/api';
import type { Token } from '~/models';

type Authenticated = Token & {
	isLogged: boolean;
};

type Authentication = Partial<Authenticated> | null;

interface UseAuthType {
	authentication: Authentication;
	login: (data: Partial<Authenticated>) => void;
	logout: () => void;
	check: () => { isLogged: boolean };
}

export const useAuth = create<UseAuthType>()(
	persist(
		(set, get) => ({
			authentication: null,
			login: (data: Partial<Authenticated>): void => {
				API.defaults.headers.common.Authorization = `Bearer ${data.token}`;
				set((state) => ({
					...state,
					authentication: { ...data, isLogged: true },
				}));
			},
			logout: (): void => {
				API.defaults.headers.common.Authorization = null;
				set((state) => ({
					...state,
					authentication: { ...state, isLogged: false },
				}));
			},
			check: (): { isLogged: boolean } => {
				const isLogged = get().authentication?.isLogged || false;

				if (isLogged) {
					API.defaults.headers.common.Authorization = `Bearer ${
						get().authentication?.token
					}`;
				}

				return { isLogged };
			},
		}),
		{
			name: 'authentication',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
