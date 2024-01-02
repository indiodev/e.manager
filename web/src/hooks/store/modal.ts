/* eslint-disable no-unused-vars */
import { create } from 'zustand';

type Key =
	| 'extract-import'
	| 'extract-filter'
	| 'leiaute-create'
	| 'create-version';

interface UseModal {
	isOpen: boolean;
	key: Key | null;
	open: ({ key }: { key: Key }) => void;
	close: () => void;
}

export const useModal = create<UseModal>()((set) => ({
	isOpen: false,
	key: null,
	open: ({ key }: { key: Key }): void =>
		set((state) => ({ ...state, isOpen: true, key })),
	close: (): void => set((state) => ({ ...state, isOpen: false, key: null })),
}));
