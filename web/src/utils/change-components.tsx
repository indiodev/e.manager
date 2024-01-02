import { IconButton } from '@mui/material';
import { PencilSimpleLine } from '@phosphor-icons/react';
import type { ReactElement } from 'react';
import { Children, cloneElement } from 'react';

import { useModal } from '~/hooks';

export function addEditIconToAutoCompleteEndAdornment(
	endAdornment: ReactElement,
): ReactElement {
	const modal = useModal.getState();

	const items = Children.toArray(endAdornment?.props?.children);

	items.push(
		<IconButton
			size="medium"
			onClick={(): void => modal.open({ key: 'create-version' })}
			key="edit-icon"
			sx={{
				padding: '2px',
			}}
		>
			<PencilSimpleLine
				weight="light"
				size={14}
			/>
		</IconButton>,
	);

	const [clear, popup, edit] = items;

	return cloneElement(endAdornment as ReactElement, {}, [clear, edit, popup]);
}
