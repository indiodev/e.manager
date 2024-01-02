import type { Components, Theme } from '@mui/material';
import {
	inputAdornmentClasses,
	inputBaseClasses,
	selectClasses,
} from '@mui/material';

type TextFieldProps = Components<Omit<Theme, 'components'>>['MuiTextField'];

export const MuiTextField: TextFieldProps = {
	styleOverrides: {
		root: ({ theme }) => ({
			borderRadius: 8,

			[`& .${inputBaseClasses.error}`]: {
				color: theme.palette.error.main,

				[`& .${inputAdornmentClasses.root}`]: {
					color: theme.palette.error.main,
					border: '1px solid red',
				},
			},

			[`& .${selectClasses.icon}`]: {
				color: theme.palette.text.primary,
				outline: 'none',
			},
		}),
	},
};
