import type { Route } from '~/models';
import * as Page from '~/pages';

export const PrivateRoutes: Route[] = [
	{
		path: 'leiautes',
		component: Page.Leiautes,
	},
	{
		path: 'extracts',
		component: Page.Extracts,
	},
	{
		path: 'leiautes/create',
		component: Page.LeiauteView.Create,
	},
	{
		path: 'leiautes/:id',
		component: Page.LeiauteView.Detail,
	},
	{
		path: 'extracts/detail',
		component: Page.ExtractView.Detail,
	},
	{
		path: 'extracts/data',
		component: Page.ExtractView.Extract,
	},
];
