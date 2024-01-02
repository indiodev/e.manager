import type { GridProps } from '@mui/material';
import { Grid } from '@mui/material';
import type { ReactElement } from 'react';

interface Props extends GridProps {}

export function Item({ children, ...rest }: Props): ReactElement {
	return (
		<Grid
			item
			sx={{
				padding: '0.5rem',
			}}
			{...rest}
		>
			{children}
		</Grid>
	);
}
