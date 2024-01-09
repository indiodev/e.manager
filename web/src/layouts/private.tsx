import type { ReactElement } from 'react';
import { Outlet } from 'react-router-dom';

export function Private(): ReactElement {
	return (
		<main className="w-screen min-h-screen items-center justify-center py-16">
			<Outlet />
		</main>
	);
}
