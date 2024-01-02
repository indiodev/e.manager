import type { StackProps } from '@mui/material';
import { Stack } from '@mui/material';
import type { ReactElement } from 'react';

interface Props extends StackProps {}

export function Footer({ children, ...rest }: Props): ReactElement {
	return (
		<Stack
			{...rest}
			sx={{ paddingTop: 1 }}
		>
			{children}
		</Stack>
	);
}
