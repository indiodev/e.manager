import type { ReactElement } from 'react';
import { useLocation } from 'react-router-dom';

import type { Schema } from '@/src/models';

interface UseLocation {
	state: {
		data: Schema[];
	};
}

export function MappingNodes(): ReactElement {
	const {
		state: { data },
	} = useLocation() as UseLocation;
	return (
		<div>
			{data.map((item) => (
				<div key={item.e_social_id}>{item.e_social_id}</div>
			))}
		</div>
	);
}
