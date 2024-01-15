/* eslint-disable no-unused-vars */
import { useState } from 'react';

interface UseParams<T> {
	params: T;
	setParams: <K extends keyof T>(key: K, value: T[K]) => void;
}

export function useParams<T>(state: Partial<T>): UseParams<T> {
	const [params, setParams] = useState<T>(state as T);

	function handle<K extends keyof T>(key: K, value: T[K]): void {
		setParams((state) => ({ ...state, [key]: value }));
	}

	return { params, setParams: handle };
}
