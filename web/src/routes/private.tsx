import type { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '../layouts';
import { Schemas } from '../pages';

export function Private(): ReactElement {
	return (
		<Routes>
			<Route
				path="/"
				element={<Layout.Private />}
			>
				<Route
					path="*"
					element={<Navigate to={'/schemas'} />}
				/>
				<Route
					path="/"
					element={<Navigate to={'/schemas'} />}
				/>

				<Route
					path="/schemas"
					element={<Schemas />}
				/>
			</Route>
		</Routes>
	);
}
