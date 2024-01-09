import type { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '../layouts';
import { Signin } from '../pages';

export function Public(): ReactElement {
	return (
		<Routes>
			<Route
				path="/"
				element={<Layout.Public />}
			>
				<Route
					path="*"
					element={<Navigate to={'/signin'} />}
				/>
				<Route
					path="/"
					element={<Navigate to={'/signin'} />}
				/>

				<Route
					path="/signin"
					element={<Signin />}
				/>
			</Route>
		</Routes>
	);
}
