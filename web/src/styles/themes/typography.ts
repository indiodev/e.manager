/* eslint-disable no-unused-vars */
import type { Palette } from '@mui/material';
import type { TypographyOptions } from '@mui/material/styles/createTypography';

export const Typography:
	| TypographyOptions
	| ((palette: Palette) => TypographyOptions) = {
	allVariants: {
		fontFamily: 'Inter, sans-serif',
	},
};
