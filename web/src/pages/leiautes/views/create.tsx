/* eslint-disable no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Autocomplete,
	Box,
	Button,
	Container,
	FormControl,
	FormHelperText,
	MenuItem,
	Stack,
	TextField,
	Typography,
} from '@mui/material';
import { CaretDown, CaretLeft, X } from '@phosphor-icons/react';
import { AxiosError } from 'axios';
import type { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { Modal } from '../modal';

import { Grid } from '~/components';
import { useModal, useVersionList } from '~/hooks';
import { useCreateLeiaute } from '~/hooks/query/leiaute/create';
import { LeiauteStatusList } from '~/models';
import { addEditIconToAutoCompleteEndAdornment } from '~/utils/change-components';
import { LeiautePrefixInputMask } from '~/utils/mask-input';

const RegexLeiautePrefix = new RegExp(/^S\d{4}$/);
const RegexLeiauteVersion = new RegExp(/^V\d{2}$/);

const LeiauteSchema = z
	.object({
		name: z.string().min(1, { message: 'Informe nome do leiaute.' }),
		prefix: z
			.string()
			.regex(RegexLeiautePrefix, 'Por favor, informe um prefixo válido'),
		version: z
			.string({
				errorMap: () => ({ message: 'Por favor, informe versão.' }),
			})
			.regex(RegexLeiauteVersion, 'Por favor, informe uma versão válida.'),
		version_id: z.string().uuid({ message: 'Deve ser informado id da Versão' }),
		active: z.enum(['inactive', 'active']),
		description: z.string().optional(),

		// nodes: z.array(NodeSchema),
	})
	.transform(({ active, version, ...rest }) => ({
		active: active === 'active',
		version: undefined,
		...rest,
	}));

type LeiauteType = z.infer<typeof LeiauteSchema>;

export function Create(): ReactElement {
	const navigate = useNavigate();
	const modal = useModal();

	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
		setValue,
	} = useForm<LeiauteType>({
		mode: 'onSubmit',
		resolver: zodResolver(LeiauteSchema),
	});

	const { mutateAsync: createLeiaute } = useCreateLeiaute({
		onSuccess(data) {
			navigate(`/leiautes/${data.id}`);
			toast.success('Leiaute criado com sucesso!');
			toast.info('Agora é só configurar um modelo e-social.', {
				delay: 3000,
			});
		},
		onError(error) {
			if (error instanceof AxiosError) {
				toast.error('Ops, houve um erro. Tente mais tarde');
			}
		},
	});

	function handleCreate(data: LeiauteType): void {
		createLeiaute(data);
	}

	const { data: version_list, isSuccess: versionListIsSuccess } =
		useVersionList();

	return (
		<Container
			maxWidth="xl"
			style={{
				paddingTop: '5rem',
				paddingBottom: '2rem',
			}}
		>
			<Box sx={{ overflowY: 'hidden' }}>
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
					<Typography sx={{ fontSize: '1.5rem' }}>Novo leiaute</Typography>
				</Stack>

				<Stack
					component="form"
					onSubmit={handleSubmit(handleCreate)}
					padding={2}
					sx={{ overflowY: 'hidden', maxHeight: '80vh' }}
				>
					<Grid.Root>
						<Grid.Item
							xs={12}
							md={6}
							lg={3}
						>
							<TextField
								size="small"
								fullWidth
								placeholder="Nome"
								error={!!errors.name}
								{...register('name')}
							/>
						</Grid.Item>
						<Grid.Item
							xs={12}
							md={6}
							lg={3}
						>
							<FormControl fullWidth>
								<TextField
									label="Prefixo"
									placeholder="S0000"
									size="small"
									fullWidth
									error={!!errors.prefix}
									aria-describedby="prefix-helper-text"
									InputProps={{
										inputComponent: LeiautePrefixInputMask,
									}}
									{...register('prefix')}
								/>
								<FormHelperText
									id="prefix-helper-text"
									variant="standard"
									error={!!errors.prefix}
									sx={{
										textAlign: 'right',
									}}
								>
									{errors.prefix?.message ?? ' '}
								</FormHelperText>
							</FormControl>
						</Grid.Item>
						{versionListIsSuccess && (
							<Grid.Item
								xs={12}
								md={6}
								lg={3}
							>
								<Box flexDirection="row">
									<Controller
										name="version"
										control={control}
										render={({ field: { onChange, value } }): ReactElement => (
											<FormControl fullWidth>
												<Autocomplete
													disablePortal
													options={
														version_list?.map((version) => version.prefix) || []
													}
													getOptionLabel={(option): string =>
														option?.replace(/V/g, '')?.split('')?.join('.') ||
														''
													}
													noOptionsText="Nenhuma versão encontrada"
													popupIcon={<CaretDown size={14} />}
													clearIcon={<X size={14} />}
													value={value ?? ''}
													onChange={(_, v): void => {
														setValue(
															'version_id',
															version_list?.find(
																(version) => version.prefix === v,
															)?.id as string,
														);
														onChange(v ?? '');
													}}
													size="small"
													id="extract-version"
													aria-describedby="version-helper-text"
													renderInput={(params): ReactElement => (
														<TextField
															{...params}
															label="Versão"
															placeholder="0.0"
															error={!!errors.version}
															InputProps={{
																...params.InputProps,
																endAdornment:
																	addEditIconToAutoCompleteEndAdornment(
																		params.InputProps
																			.endAdornment as ReactElement,
																	),
															}}
														/>
													)}
												/>
												<FormHelperText
													id="version-helper-text"
													variant="standard"
													error={!!errors.version}
													sx={{
														textAlign: 'right',
													}}
												>
													{errors.version?.message ?? ' '}
												</FormHelperText>
											</FormControl>
										)}
									/>
								</Box>
							</Grid.Item>
						)}

						<Grid.Item
							xs={12}
							md={6}
							lg={3}
						>
							<Controller
								name="active"
								control={control}
								defaultValue={false}
								render={({ field: { onChange, value } }): ReactElement => (
									<TextField
										select
										fullWidth
										size="small"
										value={value}
										SelectProps={{
											IconComponent: CaretDown,
										}}
										onChange={onChange}
									>
										{LeiauteStatusList.map((status) => (
											<MenuItem
												value={status.value}
												key={status.id}
											>
												{status.label}
											</MenuItem>
										))}
									</TextField>
								)}
							/>
						</Grid.Item>

						<Grid.Item xs={12}>
							<TextField
								fullWidth
								multiline
								rows={3}
								placeholder="Descrição (opcional)"
								error={!!errors.description}
								{...register('description')}
							/>
						</Grid.Item>
					</Grid.Root>

					<Stack
						direction="row"
						justifyContent="flex-end"
						padding={1}
						gap={1}
					>
						<Button
							variant="contained"
							type="submit"
						>
							Criar
						</Button>
					</Stack>
				</Stack>
			</Box>
			{modal.key === 'create-version' && <Modal.CreateVersion />}
		</Container>
	);
}
