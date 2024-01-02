/* eslint-disable no-unused-vars */
import { Autocomplete, Box, Button, TextField } from '@mui/material';
import { CaretDown, X } from '@phosphor-icons/react';
import type { ReactNode } from 'react';
import { Fragment, type ReactElement } from 'react';

import { Loading, Modal } from '~/components';
import {
	useExtractFilter,
	useLeiauteActiveList,
	useModal,
	useParams,
	useVersionList,
} from '~/hooks';
import type { LeiautePrefix, LeiauteQuery, LeiauteVersion } from '~/models';

export function Filter(): ReactElement {
	const modal = useModal();

	const {
		data: leiaute_active_list,
		isSuccess,
		isLoading,
	} = useLeiauteActiveList();

	const { params: store, append } = useExtractFilter();

	const { params, handleParams } = useParams<LeiauteQuery>({
		...store,
	});

	const { data: version_list, isSuccess: versionListIsSuccess } =
		useVersionList();

	return (
		<Modal.Root
			open={modal.isOpen && modal.key === 'extract-filter'}
			onClose={modal.close}
		>
			<Modal.Header
				title="Filtros"
				onClose={modal.close}
			/>
			<Modal.Body>
				<Box
					// component="form"
					display="flex"
					flexDirection="column"
					gap={2}
					sx={{ padding: '1rem 0' }}
				>
					{isLoading && <Loading />}

					{!isLoading && isSuccess && leiaute_active_list.length > 0 && (
						<Fragment>
							<Autocomplete
								disablePortal
								value={params.prefix}
								options={
									leiaute_active_list?.map((leiaute) => leiaute.prefix) || []
								}
								onChange={(_, value): void =>
									handleParams('prefix', value as LeiautePrefix)
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
									/>
								)}
							/>

							<Autocomplete
								disablePortal
								value={params.version}
								options={version_list?.map((version) => version.prefix) || []}
								onChange={(_, value): void =>
									handleParams('version', value as LeiauteVersion)
								}
								getOptionLabel={(option): string =>
									option?.replace(/S_/g, '')?.replace(/_/g, '.') || ''
								}
								noOptionsText="Nenhuma versão encontrada"
								popupIcon={<CaretDown size={14} />}
								clearIcon={<X size={14} />}
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
				<Button
					variant="contained"
					onClick={(): void => {
						append({ prefix: params.prefix, version: params.version });
						modal.close();
					}}
				>
					Aplicar
				</Button>
			</Modal.Footer>
		</Modal.Root>
	);
}
