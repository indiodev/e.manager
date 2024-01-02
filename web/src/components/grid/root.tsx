import type { GridProps } from '@mui/material';
import { Grid } from '@mui/material';
import type { ReactElement } from 'react';

interface Props extends GridProps {}

export function Root({ children, ...rest }: Props): ReactElement {
	return (
		<Grid
			container
			{...rest}
		>
			{children}
		</Grid>
	);
}
