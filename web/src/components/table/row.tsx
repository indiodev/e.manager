import { TableRow, type TableRowProps } from '@mui/material';
import type { ReactElement } from 'react';

interface RowProps extends TableRowProps {}

export function Row({ children, ...rest }: RowProps): ReactElement {
	return <TableRow {...rest}>{children}</TableRow>;
}
