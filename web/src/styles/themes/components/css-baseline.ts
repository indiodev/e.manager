import type { Components, Theme } from '@mui/material';

type MuiCssBaselineProps = Components<
	Omit<Theme, 'components'>
>['MuiCssBaseline'];

export const MuiCssBaseline: MuiCssBaselineProps = {
	styleOverrides: {
		':root': {
			'@media (max-width: 1090px)': {
				fontSize: '87.5%',
			},
		},
		body: {
			scrollbarColor: '#6b6b6b #2b2b2b',
			'&::-webkit-scrollbar, & *::-webkit-scrollbar': {
				backgroundColor: '#5C73DB44',
				width: '8px',
				height: '8px',
			},
			'&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
				borderRadius: 10,
				backgroundColor: '#5C73DB',
				minHeight: 24,
			},
			'&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
				backgroundColor: '#959595ff',
			},
			'&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
				{
					backgroundColor: '#959595ff',
				},
			'&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
				backgroundColor: '#959595ff',
			},
			'&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
				backgroundColor: '#2b2b2bff',
			},
		},
	},
};
