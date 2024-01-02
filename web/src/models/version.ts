import type { Base } from './base';

export interface Version extends Base {
	name: string;
	prefix: string;
	description: string;
	year: number;
}
