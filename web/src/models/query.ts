import type { Date } from './date';

export interface Query {
	search: string | null;
	page: number | null;
	limit: number | null;
	order: 'asc' | 'desc';
	date: Date;
}
