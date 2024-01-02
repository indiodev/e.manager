import { Box } from '@mui/material';
import { CaretRight } from '@phosphor-icons/react';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { Table } from '~/components';
import { LeiauteVersionNormalize, type Extract } from '~/models';

interface ListProps {
	data: Extract[];
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
							key={item.e_social_id}
							onClick={(): void =>
								navigate('/extracts/detail', { state: { extract: item } })
							}
						>
							<Table.Column component="td">
								{item.e_social_id || '-'}
							</Table.Column>
							<Table.Column component="td">
								{item.event_type || '-'}
							</Table.Column>
							<Table.Column component="td">{item.prefix || '-'}</Table.Column>
							<Table.Column component="td">
								{LeiauteVersionNormalize[
									item.version as keyof typeof LeiauteVersionNormalize
								] || '-'}
							</Table.Column>

							<Table.Column component="td">{item.count || '-'}</Table.Column>

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
