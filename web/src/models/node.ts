import type { Child } from './child';

export interface Node {
	name: string;
	children: Child[];
	type: 'unique' | 'multiple';
	values?: { [key: string]: number | string }[];
}
