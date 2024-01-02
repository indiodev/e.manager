import type { TableProps } from '@mui/material';
import { Paper, Table, TableContainer } from '@mui/material';
import type { ReactElement } from 'react';

interface RootProps extends TableProps {}

export function Root({ children, ...rest }: RootProps): ReactElement {
	return (
		<TableContainer
			component={Paper}
			sx={{ marginTop: '1rem' }}
		>
			<Table
				aria-label="collapsible table"
				{...rest}
			>
				{children}
			</Table>
		</TableContainer>
	);
}
