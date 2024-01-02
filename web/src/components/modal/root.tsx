import type { ModalProps } from '@mui/material';
import { Modal, Stack, styled } from '@mui/material';
import type { ReactElement, ReactNode } from 'react';

interface Props extends Omit<ModalProps, 'children'> {
	children: ReactNode;
}

const Container = styled(Stack)(({ theme }) => ({
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%,-50%)',
	padding: '1rem',
	background: theme.palette.background.paper,
	borderRadius: '16px',
	minWidth: '12.5rem',
	maxWidth: '31.25rem',
	width: '90%',

	...(theme.breakpoints.down('md') && {
		width: '90%',
	}),

	// width: '100%',
	// minWidth: '18.75rem',
	// maxWidth: '90%',
	zIndex: 9999,
}));

export function Root({
	children,
	onClose,
	open,
	...rest
}: Props): ReactElement {
	return (
		<Modal
			open={open}
			onClose={onClose}
			{...rest}
		>
			<Container>{children}</Container>
		</Modal>
	);
}
