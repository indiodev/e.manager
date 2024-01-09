import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export function Public(): ReactElement {
	return (
		<main className="absolute left-0 top-0 w-screen">
			<Outlet />
		</main>
	);
}
