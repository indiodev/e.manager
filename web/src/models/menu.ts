import type { Icon } from '@phosphor-icons/react';

export type MenuPath =
	| 'signin'
	| 'leiautes'
	| 'leiautes/:id'
	| 'leiautes/create'
	| 'extracts'
	| 'extracts/detail'
	| 'extracts/data'
	| 'logout';

export interface Menu {
	label: string;
	path: MenuPath;
	icon?: Icon;
}
