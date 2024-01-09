import type { ReactElement } from 'react';

import { useAuthStore } from '../hooks';

import { Private } from './private';
import { Public } from './public';

export function Router(): ReactElement {
	const { isLogged } = useAuthStore().check();

	if (!isLogged) return <Public />;

	return <Private />;
}
