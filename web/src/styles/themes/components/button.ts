import type { Components, Theme } from '@mui/material';

type MuiButtonProps = Components<Omit<Theme, 'components'>>['MuiButton'];

export const MuiButton: MuiButtonProps = {
	styleOverrides: {
		root: () => ({
			borderRadius: 8,
		}),
	},
};
