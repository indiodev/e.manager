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
import { CaretLeft, Download } from '@phosphor-icons/react';
import { Fragment, type ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Loading } from '~/components';
import { useExtractBySocial, useLeiauteReport } from '~/hooks';
import type { Extract, LeiautePrefix, LeiauteVersion } from '~/models';

interface UseLocation {
	state: {
		extract: Extract;
	};
}

enum ExtractKeyMap {
	id = 'id',
	e_social_id = 'e_social_id',
	leiaute_id = 'leiaute_id',
	created_at = 'created_at',
	event_type = 'event_type',
	updated_at = 'updated_at',
}

export function Detail(): ReactElement {
	const {
		state: { extract },
	} = useLocation() as UseLocation;

	const navigate = useNavigate();

	const { mutateAsync: report } = useLeiauteReport();

	const {
		data: extract_list,
		isSuccess,
		isLoading,
	} = useExtractBySocial({
		prefix: extract.prefix as LeiautePrefix,
		version: extract.version as LeiauteVersion,
		e_social_id: extract.e_social_id,
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
					<Typography variant="h4">Detalhes da extração</Typography>
				</Stack>

				<Button
					size="medium"
					endIcon={<Download weight="bold" />}
					onClick={(): Promise<void> =>
						report({
							prefix: extract.prefix as LeiautePrefix,
							version: extract.version as LeiauteVersion,
							e_social_id: extract.e_social_id,
							export_type: 'csv',
						})
					}
				>
					Baixar dados
				</Button>
			</Box>

			<Stack paddingTop={2}>
				{isLoading && <Loading />}
				{isSuccess && extract_list.extracts.length > 0 && (
					<Fragment>
						{extract_list.extracts.map((item) => (
							<Fragment key={item.id}>
								<Grid
									container
									spacing={1}
									style={{
										marginTop: '1rem',
										marginBottom: '1rem',
									}}
								>
									{Object.entries(item)
										.filter(
											([key, value]) =>
												!(key in ExtractKeyMap) && !(value === null),
										)
										.map(([key, value]) => (
											<Grid
												item
												key={key}
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
			</Stack>
		</Container>
	);
}
