import type { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PrivateRoutes } from './routes';

import { DefaultLayout } from '~/layouts';

export function Private(): ReactElement {
	return (
		<Routes>
			<Route
				path="/"
				element={<DefaultLayout />}
			>
				<Route
					path="*"
					element={<Navigate to={'/leiautes'} />}
				/>

				<Route
					path="/"
					element={<Navigate to={'/leiautes'} />}
				/>

				{PrivateRoutes.map((route) => (
					<Route
						path={`/${route.path}`}
						element={<route.component />}
						key={route.path}
					/>
				))}
			</Route>
		</Routes>
	);
}
