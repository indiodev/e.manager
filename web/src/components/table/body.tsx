import type { TableBodyProps } from '@mui/material';
import { TableBody } from '@mui/material';
import type { ReactElement } from 'react';

interface BodyProps extends TableBodyProps {}

export function Body({ children, ...rest }: BodyProps): ReactElement {
	return <TableBody {...rest}>{children}</TableBody>;
}
