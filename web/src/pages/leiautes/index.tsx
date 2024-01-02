import {
	Box,
	Button,
	Container,
	InputAdornment,
	Pagination,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { MagnifyingGlass, Plus, X } from '@phosphor-icons/react';
import type { ReactElement } from 'react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { List } from './table/list';

import { Grid, Loading } from '~/components';
import { useLeiautePaginate, useParams } from '~/hooks';
import type { LeiauteQuery } from '~/models';

const labels = ['Nome', 'Prefixo', 'Versão', 'Status'];

export function Leiautes(): ReactElement {
	const navigate = useNavigate();
	const searchInputRef = useRef<HTMLInputElement>(null);

	const { params, handleParams: append } = useParams<LeiauteQuery>({
		limit: 15,
	});

	const {
		data: list_data,
		isLoading,
		isSuccess,
	} = useLeiautePaginate({ ...params });

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
			<Stack sx={{ padding: '0 0.5rem' }}>
				<Typography
					variant="h4"
					component="h1"
				>
					Leiautes
				</Typography>
			</Stack>

			<Box>
				<Grid.Root>
					<Grid.Item
						xs={10}
						// sm={6}
						// xl={8}
					>
						<TextField
							size="small"
							fullWidth
							placeholder="Pesquisar por nome ou prefixo"
							inputRef={searchInputRef}
							onChange={(event): void => {
								if (!event.target.value || !searchInputRef.current?.value) {
									append('search', null);
									return;
								}
							}}
							onKeyDown={(event): void => {
								if (event.key === 'Enter' && searchInputRef.current?.value) {
									append('search', searchInputRef.current?.value);
									return;
								}
							}}
							sx={{ height: '100%' }}
							InputProps={{
								endAdornment: (
									<InputAdornment
										position="end"
										sx={{ cursor: 'pointer' }}
									>
										{params.search && (
											<X
												size={18}
												weight="bold"
												onClick={(): void => {
													if (searchInputRef.current?.value) {
														searchInputRef.current.value = '';
													}
													append('search', null);
												}}
											/>
										)}

										{!params.search && (
											<MagnifyingGlass
												size={18}
												weight="bold"
												onClick={(): void => {
													if (!searchInputRef?.current?.value) return;

													append('search', searchInputRef?.current?.value);
												}}
											/>
										)}
									</InputAdornment>
								),
							}}
						/>
					</Grid.Item>

					<Grid.Item
						xs={2}
						// xl={2}
						// sm={3}
					>
						<Button
							fullWidth
							size="medium"
							variant="contained"
							sx={{ gap: '0.5rem', height: '100%' }}
							onClick={(): void => navigate('/leiautes/create')}
						>
							<Plus
								size={18}
								weight="bold"
							/>
							<Typography sx={{ display: { xs: 'none', md: 'block' } }}>
								Novo
							</Typography>
						</Button>
					</Grid.Item>
				</Grid.Root>

				{isLoading && <Loading />}

				{isSuccess && !(list_data.data.length > 0) && (
					<Box marginTop="1rem">
						<Typography variant="h6">Nenhum registro encontrado</Typography>
					</Box>
				)}

				{isSuccess && list_data.data.length > 0 && (
					<Stack sx={{ padding: '0 0.5rem' }}>
						<List
							data={list_data.data}
							labels={labels}
						/>

						{list_data.meta.total > list_data.meta.per_page && (
							<Stack
								alignItems={'flex-end'}
								direction={'column'}
								paddingTop={2}
							>
								<Pagination
									count={list_data.meta.last_page}
									page={list_data.meta.current_page}
									onChange={(_, page): void => append('page', page)}
									color="primary"
								/>
							</Stack>
						)}
					</Stack>
				)}
			</Box>
		</Container>
	);
}
