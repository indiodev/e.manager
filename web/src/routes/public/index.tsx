import type { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { PublicRoutes } from './routes';

export function Public(): ReactElement {
	return (
		<Routes>
			<Route
				path="*"
				element={<Navigate to={'/signin'} />}
			/>

			<Route
				path="/"
				element={<Navigate to={'/signin'} />}
			/>

			{PublicRoutes.map((route) => (
				<Route
					path={route.path}
					element={<route.component />}
					key={route.path}
				/>
			))}
		</Routes>
	);
}
