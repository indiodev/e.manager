import type { ReactElement } from 'react';
import { Fragment } from 'react';

import { Private } from './private';
import { Public } from './public';

import { useAuth } from '~/hooks/store';

export function Router(): ReactElement {
	const { isLogged } = useAuth().check();

	return (
		<Fragment>
			{!isLogged && <Public />}
			{isLogged && <Private />}
		</Fragment>
	);
}
