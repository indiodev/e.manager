import type { Route } from '~/models';
import { Signin } from '~/pages';

export const PublicRoutes: Route[] = [
	{
		path: 'signin',
		component: Signin,
	},
];
