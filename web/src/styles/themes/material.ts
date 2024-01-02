import type { Theme } from '@mui/material';
import {
	buttonBaseClasses,
	createTheme,
	inputClasses,
	tableBodyClasses,
	tableCellClasses,
	tableRowClasses,
} from '@mui/material';

import { MuiButton, MuiCssBaseline, MuiDrawer, MuiPaper } from './components';
import { MuiTextField } from './components/text-field';
import { Palette } from './palette';
import { Typography } from './typography';

export const MaterialTheme: Theme = createTheme({
	palette: Palette,
	typography: Typography,
	shape: {
		borderRadius: 8,
	},

	components: {
		MuiTextField: MuiTextField,
		MuiPaper: MuiPaper,
		MuiCssBaseline: MuiCssBaseline,
		MuiButton: MuiButton,
		MuiCheckbox: {
			styleOverrides: {
				root: {
					color: '#f4f4f4',
				},
			},
		},
		MuiRating: {
			styleOverrides: {
				iconEmpty: {
					color: '#f4f4f499',
				},
			},
		},

		MuiAccordion: {
			styleOverrides: {
				root: () => ({
					padding: 0,
					boxShadow: 'none',
				}),

				expanded: () => ({
					margin: 0,
					padding: 0,
				}),
			},
		},
		MuiAccordionSummary: {
			styleOverrides: {
				root: () => ({
					padding: 0,
					height: '1rem',
				}),
				expanded: () => ({
					margin: 0,
					background: '#3B435C55',
					minHeight: '3rem',
				}),
			},
		},
		MuiAccordionDetails: {
			styleOverrides: {
				root: () => ({
					border: '2px solid #3B435C55',
				}),
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					borderColor: 'rgba(255, 255, 255, 0.5)',
				},
			},
		},

		MuiTable: {
			styleOverrides: {
				root: () => ({
					[`& .${tableBodyClasses.root}`]: {
						[`& .${tableRowClasses.root}`]: {
							cursor: 'pointer',
							':hover': {},
						},
					},
				}),
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: ({ theme }) => ({
					height: '100%',
					background: theme.palette.primary.main,

					[`& .${tableCellClasses.root}`]: {
						color: theme.palette.background.default,
						fontWeight: 'bold',
					},
				}),
			},
		},

		MuiTableCell: {
			styleOverrides: {
				root: ({ theme }) => ({
					color: theme.palette.primary.main,
				}),
			},
		},

		MuiDrawer: MuiDrawer,

		MuiAutocomplete: {
			styleOverrides: {
				clearIndicator: ({ theme }) => ({
					color: theme.palette.primary.main,
				}),
				popupIndicator: ({ theme }) => ({
					color: theme.palette.primary.main,
				}),
				endAdornment: ({ theme }) => ({
					top: 'calc(50% - 12px)',

					[`& .${buttonBaseClasses.root}`]: {
						color: theme.palette.primary.main,
					},
				}),
				inputRoot: ({ theme }) => ({
					[`&.${inputClasses.error}`]: {
						[`& .${buttonBaseClasses.root}`]: {
							color: theme.palette.error.main,
						},
					},
				}),
			},
		},

		MuiIconButton: {
			styleOverrides: {
				root: ({ theme }) => ({
					color: theme.palette.primary.main,
				}),
			},
		},
	},
});
