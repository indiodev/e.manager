import type { Meta } from './meta';

export interface Paginate<Type> {
	meta: Meta;
	data: Type[];
}
