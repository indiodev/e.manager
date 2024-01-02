import type { TableCellProps } from '@mui/material';
import { TableCell } from '@mui/material';
import type { ReactElement } from 'react';

interface ColumnProps extends TableCellProps {}

export function Column({ children, ...rest }: ColumnProps): ReactElement {
	return <TableCell {...rest}>{children}</TableCell>;
}
