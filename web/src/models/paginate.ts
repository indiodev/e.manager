import type { Meta } from './meta';

export interface Paginate<T> {
	meta: Meta;
	data: T[];
}
