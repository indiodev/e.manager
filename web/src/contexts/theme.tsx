import { Box, ThemeProvider as MuiThemeProvider } from '@mui/material';
import type { ReactElement, ReactNode } from 'react';
import { createContext, useCallback, useMemo, useState } from 'react';

import { MaterialTheme } from '~/styles';

export interface ThemeContextType {
	themeName: 'dark' | 'light';
	toggle: () => void;
}

interface ThemeProviderProps {
	children: ReactNode;
}

export const ThemeContext = createContext({} as ThemeContextType);

export function ThemeProvider({ children }: ThemeProviderProps): ReactElement {
	const [themeName, setThemeName] = useState<'dark' | 'light'>('light');

	const toggle = useCallback(() => {
		setThemeName((state) => (state === 'light' ? 'dark' : 'light'));
	}, []);

	const theme = useMemo(() => {
		return themeName === 'light' ? MaterialTheme : MaterialTheme;
		// return themeName === 'light' ? MaterialTheme : DarkTheme;
	}, [themeName]);

	return (
		<ThemeContext.Provider value={{ themeName, toggle }}>
			<MuiThemeProvider theme={theme}>
				<Box
					width="100wh"
					height="100vh"
					bgcolor={theme.palette.background.default}
				>
					{children}
				</Box>
			</MuiThemeProvider>
		</ThemeContext.Provider>
	);
}
