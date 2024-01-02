/* eslint-disable no-unused-vars */
import {
	Box,
	Button,
	Container,
	Divider,
	Grid,
	Stack,
	Typography,
} from '@mui/material';
import { CaretLeft, Upload } from '@phosphor-icons/react';
import type { AxiosError } from 'axios';
import { Fragment, type ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import { useExtractBuild } from '~/hooks';
import type { ExtractData, LeiauteQuery } from '~/models';

enum ExtractKeyMap {
	id = 'id',
	e_social_id = 'e_social_id',
	leiaute_id = 'leiaute_id',
	created_at = 'created_at',
	event_type = 'event_type',
	updated_at = 'updated_at',
}

interface UseLocation {
	state: Pick<ExtractData, 'extracts'> &
		Pick<LeiauteQuery, 'prefix' | 'version'>;
}

export function Extract(): ReactElement {
	const navigate = useNavigate();
	const {
		state: { extracts, prefix, version },
	} = useLocation() as UseLocation;

	function onError(error: AxiosError | Error): void {
		toast.error('Houve um erro ao tentar armazenar dados.');
	}

	function onSuccess(data: ExtractData): void {
		navigate('-1', { replace: true });
		toast.success('Dados armazenados com sucesso.');
	}

	const { mutateAsync: extract_build } = useExtractBuild({
		onError,
		onSuccess,
	});

	return (
		<Container
			maxWidth="xl"
			style={{
				paddingTop: '5rem',
				paddingBottom: '2rem',
				height: '100vh',
				overflowY: 'auto',
				overflowX: 'hidden',
			}}
		>
			<Box
				display="flex"
				flex="1"
				justifyContent="space-between"
				alignItems="center"
			>
				<Stack
					direction="row"
					alignItems="center"
					gap={2}
					style={{
						cursor: 'pointer',
					}}
					component="div"
					onClick={(): void => navigate(-1)}
				>
					<CaretLeft
						size={36}
						weight="bold"
					/>
					<Typography variant="h4">Dados extraídos</Typography>
				</Stack>

				<Stack
					direction="row"
					alignItems="center"
					gap={2}
				>
					<Button
						size="medium"
						endIcon={<Upload weight="bold" />}
						onClick={(): Promise<ExtractData> =>
							extract_build({ extracts, version, prefix })
						}
					>
						Armazenar
					</Button>
				</Stack>
			</Box>

			{extracts.length > 0 && (
				<Fragment>
					{extracts.map((item) => (
						<Fragment key={uuidv4()}>
							<Grid
								container
								spacing={1}
								style={{
									marginTop: '1rem',
									marginBottom: '1rem',
								}}
							>
								{Object.entries(item)
									.filter(([key]) => !(key in ExtractKeyMap))
									.map(([key, value]) => (
										<Grid
											item
											key={uuidv4()}
											xl={4}
											xs={6}
										>
											<Stack
												color="#F4F4f4"
												style={{
													background: '#5C73DB99',
													borderRadius: '8px',
													padding: '1rem',
												}}
											>
												<Typography
													variant="body1"
													fontWeight="bold"
													color="#F4F4f4"
												>
													{key}
												</Typography>
												{value}
											</Stack>
										</Grid>
									))}
							</Grid>
							<Divider />
						</Fragment>
					))}
				</Fragment>
			)}
		</Container>
	);
}
