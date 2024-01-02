import type { FunctionComponent } from 'react';

import type { Menu } from './menu';

export type Route = Pick<Menu, 'path'> & {
	component: FunctionComponent;
};
