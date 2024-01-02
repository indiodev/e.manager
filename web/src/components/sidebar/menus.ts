import { Database, Files } from '@phosphor-icons/react';

import type { Menu } from '~/models';

export const PrivateMenus: Menu[] = [
	{
		label: 'Leiautes',
		path: 'leiautes',
		icon: Files,
	},
	{
		label: 'Extrações',
		path: 'extracts',
		icon: Database,
	},
];
