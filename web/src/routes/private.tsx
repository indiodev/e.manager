import type { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Layout } from '../layouts';
import { SchemaDetail, Schemas } from '../pages';
import { MappingNodes } from '../pages/schemas/mapping-nodes';

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

				<Route
					path="/schemas/:id"
					element={<SchemaDetail />}
				/>

				<Route
					path="/schemas/mapping"
					element={<MappingNodes />}
				/>
			</Route>
		</Routes>
	);
}
