import type { Base } from './base';

export interface User extends Base {
	name: string;
	email: string;
	active: boolean;
	password: string;
}
