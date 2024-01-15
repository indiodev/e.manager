import { EyeOpenIcon } from '@radix-ui/react-icons';
import type { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import type { Schema } from '../../models';

import {
	Button,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	Table as TableRoot,
	TableRow,
} from '@/src/components';

interface Props {
	data: Schema[];
	columns: string[];
}

export function Table({ data, columns }: Props): ReactElement {
	const navigate = useNavigate();

	return (
		<section className="rounded-sm">
			<TableRoot>
				<TableHeader>
					<TableRow>
						{columns.map((column) => (
							<TableHead key={column}>{column}</TableHead>
						))}
					</TableRow>
				</TableHeader>
				<TableBody>
					{data.map((item) => (
						<TableRow key={item.e_social_id}>
							<TableCell>{item.e_social_id}</TableCell>
							<TableCell>{item.prefix}</TableCell>
							<TableCell>
								{new Intl.DateTimeFormat('pt-BR', {
									dateStyle: 'full',
								}).format(new Date(item.created_at))}
							</TableCell>
							<TableCell>
								<Button
									onClick={() => navigate(`/schemas/${item.e_social_id}`)}
									className="bg-transparent hover:bg-primary-foreground text-white border border-transparent hover:border-white"
								>
									<EyeOpenIcon />
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</TableRoot>
		</section>
	);
}
