/* eslint-disable no-unused-vars */
import {
	Box,
	Button,
	Container,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { CaretLeft, UploadSimple } from '@phosphor-icons/react';
import type { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Grid, Loading } from '~/components';
import { useGetLeiaute } from '~/hooks/query/leiaute/get-leiaute';

export function Detail(): ReactElement {
	const { id } = useParams<{ id?: string }>();
	const navigate = useNavigate();

	const {
		data: leiaute,
		isSuccess,
		isLoading,
	} = useGetLeiaute({
		params: { id },
		onError(error) {},
		onSuccess(data) {},
	});

	return (
		<Container
			maxWidth="xl"
			style={{
				paddingTop: '5rem',
				paddingBottom: '2rem',
				height: '100vh',
				overflowY: 'auto',
			}}
		>
			{!isSuccess && isLoading && <Loading />}

			{isSuccess && (
				<>
					<Stack
						sx={{
							flexDirection: 'row',
							alignItems: 'center',
							width: 'max-content',
							cursor: 'pointer',
						}}
						component="span"
						onClick={(): void => navigate('-1', { replace: true })}
					>
						<CaretLeft size={26} />
						<Typography sx={{ fontSize: '1.5rem' }}>
							Leiaute e-Social <strong>{leiaute?.name}</strong>,{' '}
							<strong>
								v{leiaute?.version.prefix.replace('V', '').split('').join('.')}
							</strong>
						</Typography>
					</Stack>

					<Stack component="form">
						<Grid.Root>
							<Grid.Item xs={3}>
								<Box>
									<Typography>Nome</Typography>
									<TextField
										name="name"
										disabled
										size="small"
										fullWidth
										defaultValue={leiaute?.name || ''}
									/>
								</Box>
							</Grid.Item>
							<Grid.Item xs={3}>
								<Box>
									<Typography>Prefixo</Typography>
									<TextField
										name="prefix"
										disabled
										size="small"
										fullWidth
										defaultValue={leiaute?.prefix || ''}
									/>
								</Box>
							</Grid.Item>
							<Grid.Item xs={3}>
								<Box>
									<Typography>Versão</Typography>
									<TextField
										name="version"
										disabled
										size="small"
										fullWidth
										defaultValue={
											leiaute?.version?.prefix
												?.replace('V', '')
												.split('')
												.join('.') || ''
										}
									/>
								</Box>
							</Grid.Item>
							<Grid.Item xs={3}>
								<Box>
									<Typography>Status</Typography>
									<TextField
										name="status"
										disabled
										size="small"
										fullWidth
										defaultValue={leiaute?.active ? 'Ativo' : 'Inativo'}
									/>
								</Box>
							</Grid.Item>
							<Grid.Item xs={12}>
								<Box>
									<Typography>Descrição</Typography>
									<TextField
										name="description"
										disabled
										size="small"
										fullWidth
										multiline
										rows={4}
										defaultValue={leiaute?.description}
									/>
								</Box>
							</Grid.Item>
						</Grid.Root>
					</Stack>

					{!leiaute.event_type && (
						<Stack sx={{ alignItems: 'flex-end' }}>
							<Button
								variant="contained"
								sx={{ display: 'flex', gap: '1rem', alignItems: 'center' }}
							>
								Montar schema XML
								<UploadSimple
									weight="bold"
									size={16}
								/>
							</Button>
						</Stack>
					)}
				</>
			)}
		</Container>
	);
}
