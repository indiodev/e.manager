import type { Components, Theme } from '@mui/material';

export const MuiDrawer: Components<Omit<Theme, 'components'>>['MuiDrawer'] = {
	styleOverrides: {
		paper: ({ theme }) => ({
			backgroundColor: theme.palette.primary.main,
			...(theme.breakpoints.down('md') && {
				width: 150,
				border: '2px solid red',
				gap: '1.5rem',
				transition: theme.transitions.create('padding', {
					easing: theme.transitions.easing.sharp,
					duration: theme.transitions.duration.enteringScreen,
				}),
			}),
		}),
	},
};
