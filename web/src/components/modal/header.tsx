import type { StackProps } from '@mui/material';
import { Button, Stack, Typography } from '@mui/material';
import { X } from '@phosphor-icons/react';
import type { ReactElement } from 'react';

type ExcludeMap = 'display' | 'direction' | 'justifyContent' | 'alignItems';

interface Props extends Omit<StackProps, 'children' | ExcludeMap> {
	onClose: () => void;
	title: string;
}

export function Header({ onClose, title, ...rest }: Props): ReactElement {
	return (
		<Stack
			display="flex"
			direction="row"
			justifyContent="space-between"
			alignItems="center"
			{...rest}
		>
			<Typography variant="h5">{title}</Typography>
			<Button
				variant="text"
				onClick={onClose}
				sx={{
					display: 'flex',
					justifyContent: 'flex-end',
					minWidth: 0,
					padding: 0.5,
				}}
			>
				<X
					weight="bold"
					size={20}
				/>
			</Button>
		</Stack>
	);
}
