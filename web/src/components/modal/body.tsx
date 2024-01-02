import type { StackProps } from '@mui/material';
import { Stack } from '@mui/material';
import type { ReactElement } from 'react';

interface Props extends StackProps {}

export function Body({ children, ...rest }: Props): ReactElement {
	return (
		<Stack
			{...rest}
			sx={{ overflowY: 'auto' }}
		>
			{children}
		</Stack>
	);
}
