import { Typography } from '@mui/material';
import type { Icon } from '@phosphor-icons/react';
import type { HTMLAttributes, ReactElement } from 'react';

import { Button } from './styles';

import type { MenuPath } from '~/models';

interface SidebarButtonProps
	extends HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
	label?: string;
	path?: MenuPath;
	Icon?: Icon;
}

export function SidebarButton({
	label,
	Icon,
	path,
	...rest
}: SidebarButtonProps): ReactElement {
	return (
		<Button
			to={`/${path}`}
			{...rest}
		>
			{Icon && (
				<Icon
					size={24}
					weight="fill"
				/>
			)}
			{label && <Typography>{label}</Typography>}
		</Button>
	);
}
