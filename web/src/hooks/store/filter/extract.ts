/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { LeiauteQuery } from '~/models';

type Filter = {
	params: Partial<LeiauteQuery>;
	append: (data: Partial<LeiauteQuery>) => void;
};

export const useExtractFilter = create(
	persist<Filter>(
		(set) => ({
			params: {
				search: null,
				page: 1,
				limit: 15,
				prefix: 'S1000',
				version: 'S_1_0',
			},
			append: (data: Partial<LeiauteQuery>): void => {
				set((state) => ({ ...state, params: { ...state.params, ...data } }));
			},
		}),
		{
			name: 'extract-filter',
			storage: createJSONStorage(() => sessionStorage),
		},
	),
);
