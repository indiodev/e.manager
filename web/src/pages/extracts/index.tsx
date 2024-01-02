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
import {
	FunnelSimple,
	MagnifyingGlass,
	Upload,
	X,
} from '@phosphor-icons/react';
import type { ReactElement } from 'react';
import { useRef } from 'react';

import { Modal } from './modal';
import { List } from './table';

import { Grid, Loading } from '~/components';
import { useExtractFilter, useExtractPaginate, useModal } from '~/hooks';

const labels = ['E-Social ID', 'Evento', 'Leiaute', 'Versão', 'Registros'];

export function Extracts(): ReactElement {
	const searchInputRef = useRef<HTMLInputElement>(null);

	const modal = useModal();

	const { params, append } = useExtractFilter();

	// const { params, handleParams: append } = useParams<LeiauteQuery>({
	// 	limit: 15,
	// 	prefix: 'S1000',
	// 	version: 'S_1_0',
	// });

	const {
		data: list_data,
		isLoading,
		isSuccess,
	} = useExtractPaginate({ ...params });

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
					Extrações
				</Typography>
			</Stack>

			<Box>
				<Grid.Root>
					<Grid.Item xs={8}>
						<TextField
							size="small"
							fullWidth
							placeholder="Pesquisar por Social ID ou Evento"
							inputRef={searchInputRef}
							sx={{ height: '100%' }}
							onChange={(event): void => {
								if (!event.target.value || !searchInputRef.current?.value) {
									append({ search: null });
									return;
								}
							}}
							onKeyDown={(event): void => {
								if (event.key === 'Enter' && searchInputRef.current?.value) {
									append({ search: searchInputRef.current?.value });
									return;
								}
							}}
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
													append({ search: null });
												}}
											/>
										)}

										{!params.search && (
											<MagnifyingGlass
												size={18}
												weight="bold"
												onClick={(): void => {
													if (!searchInputRef?.current?.value) return;

													append({ search: searchInputRef?.current?.value });
												}}
											/>
										)}
									</InputAdornment>
								),
							}}
						/>
					</Grid.Item>

					<Grid.Item xs={2}>
						<Button
							fullWidth
							// size="medium"
							variant="contained"
							sx={{ gap: '0.5rem', height: '100%' }}
							onClick={(): void => modal.open({ key: 'extract-filter' })}
						>
							<FunnelSimple
								weight="bold"
								size={20}
							/>
							<Typography
								sx={{
									display: {
										xs: 'none',
										lg: 'block',
									},
								}}
							>
								Filtros
							</Typography>
						</Button>
					</Grid.Item>

					<Grid.Item xs={2}>
						<Button
							fullWidth
							size="medium"
							variant="contained"
							sx={{ gap: '0.5rem', height: '100%' }}
							onClick={(): void => modal.open({ key: 'extract-import' })}
						>
							<Upload
								weight="bold"
								size={20}
							/>
							<Typography
								sx={{
									display: {
										xs: 'none',
										md: 'block',
									},
								}}
							>
								Enviar
							</Typography>
						</Button>
					</Grid.Item>

					{/* {is_success_active_list && active_list.length > 0 && (
						<Fragment>
							<Grid.Item
								xl={2}
								xs={2}
								sm={3}
							>
								<TextField
									onChange={(event): void =>
										append('prefix', event.target.value as LeiautePrefix)
									}
									fullWidth
									label="Prefixo"
									defaultValue={params.prefix ?? ''}
									size="small"
									select
									SelectProps={{
										IconComponent: CaretDown,
									}}
								>
									<MenuItem
										value=""
										disabled
									>
										Selecione prefixo
									</MenuItem>

									{active_list.map((item) => (
										<MenuItem
											value={item.prefix}
											key={item.id}
										>
											{item.prefix}
										</MenuItem>
									))}
								</TextField>
							</Grid.Item>

							<Grid.Item
								xl={2}
								xs={2}
								sm={3}
							>
								<TextField
									onChange={(event): void =>
										// handleQuery('version', event.target.value as LeiauteVersion)
										append('version', event.target.value as LeiauteVersion)
									}
									fullWidth
									label="Versão"
									defaultValue={params?.version ?? ''}
									size="small"
									select
									SelectProps={{
										IconComponent: CaretDown,
									}}
								>
									<MenuItem
										value=""
										disabled
									>
										Selecione versão
									</MenuItem>

									{LeiauteVersionList.map((item) => (
										<MenuItem
											value={item.value}
											key={item.id}
											disabled={item.value === 'S_1_1'}
										>
											{item.label}
										</MenuItem>
									))}
								</TextField>
							</Grid.Item>
						</Fragment>
					)} */}
				</Grid.Root>

				{isLoading && params.prefix && params.version && <Loading />}

				{!params.prefix && !params.version && (
					<Stack sx={{ padding: '0 0.5rem' }}>
						<Typography variant="h6">
							Informe prefixo e versão para buscar dados
						</Typography>
					</Stack>
				)}

				{!isLoading && isSuccess && !(list_data.data.length > 0) && (
					<Stack sx={{ padding: '0 0.5rem' }}>
						<Typography
							variant="h6"
							fontWeight="normal"
						>
							Nenhum registro encontrado.
						</Typography>
					</Stack>
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
									// onChange={(_, page): void => handleQuery('page', page)}
									onChange={(_, page): void => append({ page })}
									color="primary"
								/>
							</Stack>
						)}
					</Stack>
				)}
			</Box>

			{modal.key === 'extract-import' && (
				<Modal.Import
				// open={modal.isOpen}
				// onClose={modal.close}
				/>
			)}

			{modal.key === 'extract-filter' && (
				<Modal.Filter
				// open={modal.isOpen}
				// onClose={modal.close}
				/>
			)}
		</Container>
	);
}
