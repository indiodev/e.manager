import type { Base } from './base';
import type { Node } from './node';

export interface Schema extends Base {
	e_social_id: string;
	prefix: string;
	nodes: Node[];
}
