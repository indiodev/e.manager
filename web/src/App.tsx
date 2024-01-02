import { CssBaseline } from '@mui/material';
import { LocalizationProvider, ptBR } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { QueryClientProvider } from '@tanstack/react-query';
import type { ReactElement } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from './contexts';
import { queryClient } from './hooks';
import { Router } from './routes';

export function App(): ReactElement {
	return (
		<LocalizationProvider
			dateAdapter={AdapterLuxon}
			localeText={
				ptBR.components.MuiLocalizationProvider.defaultProps.localeText
			}
			adapterLocale="pt-br"
		>
			<ThemeProvider>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<Router />
					</BrowserRouter>
				</QueryClientProvider>

				<ToastContainer theme="colored" />
				<CssBaseline />
			</ThemeProvider>
		</LocalizationProvider>
	);
}
