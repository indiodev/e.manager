import type { StackProps } from '@mui/material';
import { CircularProgress, Stack } from '@mui/material';
import type { ReactElement } from 'react';

interface Props extends Omit<StackProps, 'children'> {}

export function Loading({ ...rest }: Props): ReactElement {
	return (
		<Stack
			padding="4rem"
			direction="row"
			display="flex"
			justifyContent="center"
			{...rest}
		>
			<CircularProgress color="primary" />
		</Stack>
	);
}
