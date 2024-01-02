/* eslint-disable no-unused-vars */
import { zodResolver } from '@hookform/resolvers/zod';
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { CaretDown, Download, Upload, X } from '@phosphor-icons/react';
import type { AxiosError } from 'axios';
import type { ReactNode } from 'react';
import { Fragment, useRef, type ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { Loading, Modal } from '~/components';
import {
	useExtractLeiaute,
	useLeiauteActiveList,
	useModal,
	useVersionList,
} from '~/hooks';
import type { ExtractData } from '~/models';
import { LeiautePrefixEnum, LeiauteVersionEnum } from '~/models';

const Schema = z.object({
	prefix: z.nativeEnum(LeiautePrefixEnum, {
		errorMap: () => ({ message: 'Selecione prefixo' }),
	}),
	version: z.nativeEnum(LeiauteVersionEnum, {
		errorMap: () => ({ message: 'Selecione versão' }),
	}),
	leiautes: z.instanceof(FormData, {
		message: 'Adicione arquivos XML',
	}),
});

type FormType = z.infer<typeof Schema>;

export function Import(): ReactElement {
	const modal = useModal();

	const {
		data: leiaute_active_list,
		isSuccess,
		isLoading,
	} = useLeiauteActiveList();

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		setValue,
	} = useForm<FormType>({
		mode: 'onSubmit',
		resolver: zodResolver(Schema),
	});

	const { data: version_list, isSuccess: versionListIsSuccess } =
		useVersionList();

	const prefix = watch('prefix');
	const version = watch('version');
	const leiautes = watch('leiautes');

	const isValidPrefixAndVersion =
		!!version?.length && !!prefix?.length && !!leiautes;

	const navigate = useNavigate();

	const inputFile = useRef<HTMLInputElement | null>(null);

	function onError(error: AxiosError | Error): void {
		modal.close();
		toast.error('Houver algum erro ao tentar importar dados.');
	}

	function onSuccess({ extracts }: ExtractData): void {
		modal.close();
		navigate('/extracts/data', { state: { extracts, version, prefix } });
		toast.success('Dados importados com sucesso.');
	}

	const { mutateAsync: generate_extract, isLoading: is_loading_extract } =
		useExtractLeiaute({
			onError,
			onSuccess,
		});

	function handleExtract(data: FormType): void {
		generate_extract(data);
	}

	return (
		<Modal.Root
			open={modal.isOpen && modal.key === 'extract-import'}
			onClose={modal.close}
			component="form"
			onSubmit={handleSubmit(handleExtract)}
		>
			<Modal.Header
				title="Extrair dados"
				onClose={modal.close}
			/>
			<Modal.Body>
				<Box
					display="flex"
					flexDirection="column"
					gap={2}
					sx={{ padding: '1rem 0' }}
				>
					{isLoading && <Loading />}

					{is_loading_extract && <Loading />}

					{!is_loading_extract &&
						!isLoading &&
						isSuccess &&
						leiaute_active_list.length > 0 && (
							<Fragment>
								<Autocomplete
									disablePortal
									options={
										leiaute_active_list?.map((leiaute) => leiaute.prefix) || []
									}
									noOptionsText="Nenhum prefixo encontrado"
									popupIcon={<CaretDown size={14} />}
									clearIcon={<X size={14} />}
									renderInput={(p): ReactNode => (
										<TextField
											{...p}
											fullWidth
											id="extract-prefix"
											label="Prefixo"
											size="small"
											{...register('prefix')}
										/>
									)}
								/>

								<Autocomplete
									disablePortal
									options={version_list?.map((version) => version.prefix) || []}
									getOptionLabel={(option): string =>
										option?.replace(/S_/g, '')?.replace(/_/g, '.') || ''
									}
									noOptionsText="Nenhuma versão encontrada"
									popupIcon={<CaretDown size={14} />}
									clearIcon={<X size={14} />}
									onChange={(_, value): void => {
										setValue(
											'version',
											LeiauteVersionEnum[
												value as keyof typeof LeiauteVersionEnum
											],
										);
									}}
									renderInput={(p): ReactNode => (
										<TextField
											{...p}
											fullWidth
											id="extract-version"
											label="Versão"
											size="small"
										/>
									)}
								/>
							</Fragment>
						)}
				</Box>
			</Modal.Body>
			<Modal.Footer>
				{!is_loading_extract && !isLoading && !isValidPrefixAndVersion && (
					<Button
						endIcon={
							<Upload
								size={20}
								weight="bold"
							/>
						}
						type="button"
						variant="contained"
						color="error"
						onClick={(): void => inputFile.current?.click()}
					>
						Importar
					</Button>
				)}

				<input
					ref={inputFile}
					type="file"
					accept="text/xml"
					multiple
					onChange={(event): void => {
						const form = new FormData();
						const files = [...(event.target.files as FileList)].filter(
							(item) =>
								item.name.includes(prefix) ||
								item.name.includes(prefix?.replace('S', 'S-')) ||
								item.name.includes(prefix?.replace('S', 'S_')),
						);

						for (const file of files) form.append('leiautes[]', file);

						setValue('leiautes', form);
					}}
					style={{ display: 'none' }}
				/>

				{!is_loading_extract && !isLoading && isValidPrefixAndVersion && (
					<Button
						endIcon={
							<Download
								size={20}
								weight="bold"
							/>
						}
						type="submit"
						variant="contained"
					>
						Iniciar
					</Button>
				)}
			</Modal.Footer>
		</Modal.Root>
	);
}
