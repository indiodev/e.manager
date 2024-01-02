import { Box, Stack, Typography } from '@mui/material';
import { CaretRight } from '@phosphor-icons/react';
import { type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table } from '~/components';
import { type Leiaute } from '~/models';

interface ListProps {
	data: Leiaute[];
	labels: string[];
}

export function List({ data, labels }: ListProps): ReactElement {
	const navigate = useNavigate();

	return (
		<Box>
			<Table.Root size="small">
				<Table.Head>
					<Table.Row>
						{labels.map((label) => (
							<Table.Column
								component="th"
								key={label}
								style={{ fontWeight: 'bold' }}
							>
								{label}
							</Table.Column>
						))}
						<Table.Column component="th" />
					</Table.Row>
				</Table.Head>
				<Table.Body>
					{data.map((item) => (
						<Table.Row
							key={item.id}
							onClick={(): void => navigate(`/leiautes/${item.id}`)}
						>
							<Table.Column component="td">{item.name || '-'}</Table.Column>
							<Table.Column component="td">{item.prefix || '-'}</Table.Column>
							<Table.Column component="td">
								{item.version.prefix.replace('V', '').split('').join('.') ||
									'-'}
							</Table.Column>

							<Table.Column component="td">
								{item.active && (
									<Stack
										component="span"
										style={{
											background: '#1b992e43',
											display: 'flex',
											alignItems: 'center',
											borderRadius: '8px',
										}}
									>
										<Typography
											variant="body1"
											color="#1b992e"
										>
											Ativo
										</Typography>
									</Stack>
								)}

								{!item.active && (
									<Stack
										component="span"
										style={{
											background: '#991b1b43',
											display: 'flex',
											alignItems: 'center',
											borderRadius: '8px',
										}}
									>
										<Typography
											variant="body1"
											color="#991B1B"
										>
											Inativo
										</Typography>
									</Stack>
								)}
							</Table.Column>

							<Table.Column
								component="td"
								align="right"
							>
								<CaretRight size={20} />
							</Table.Column>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Box>
	);
}
