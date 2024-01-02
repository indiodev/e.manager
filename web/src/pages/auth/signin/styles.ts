import { Box, Stack, styled } from '@mui/material';

export const Container = styled(Box)({
	width: '100vw',
	height: '100vh',
	position: 'absolute',
	top: 0,
	left: 0,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	flexDirection: 'column',
	gap: '3.5rem',
	zIndex: 9999,
});

export const FormContainer = styled(Stack)({
	width: '43rem',
});
