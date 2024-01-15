import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Toaster } from './components';
import { ThemeProvider } from './contexts';
import { QueryClient } from './lib';
import { Router } from './routes';

import './globals.css';
export function App(): ReactElement {
	return (
		<QueryClientProvider client={QueryClient}>
			<ThemeProvider defaultTheme="dark">
				<Toaster />
				<BrowserRouter>
					<Router />
				</BrowserRouter>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
