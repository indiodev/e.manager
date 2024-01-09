import { MagnifyingGlass } from '@phosphor-icons/react';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import type { ReactElement } from 'react';

import {
	Button,
	Input,
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/src/components';
import { useSchemaPaginateQuery } from '@/src/hooks';

export function Schemas(): ReactElement {
	const { data: schemas, isSuccess } = useSchemaPaginateQuery({
		params: { limit: 15, page: 1 },
	});

	return (
		<div className="container flex flex-col space-y-8">
			<div className="flex space-x-2">
				<div className="flex relative w-full">
					<Input
						type="text"
						placeholder="Pesquise por evento..."
						className="w-full absolute left-0 right-0"
					/>
					<Button className="text-white font-bold absolute right-0 bg-transparent hover:bg-primary-foreground">
						<MagnifyingGlass size={18} />
					</Button>
				</div>

				<Button className="text-white font-bold">Importar</Button>
			</div>

			{isSuccess && (
				<section className="rounded-sm">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="font-semibold">ESocial ID</TableHead>
								<TableHead className="font-semibold">Prefixo</TableHead>
								<TableHead className="font-semibold">
									Data de Importação
								</TableHead>
								<TableHead className="w-20"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{schemas.data.map((schema) => (
								<TableRow key={schema.e_social_id}>
									<TableCell>{schema.e_social_id}</TableCell>
									<TableCell>{schema.prefix}</TableCell>
									<TableCell>
										{new Intl.DateTimeFormat('pt-BR', {
											dateStyle: 'long',
										}).format(new Date(schema.created_at))}
									</TableCell>
									<TableCell>
										<Button className="bg-transparent hover:bg-primary-foreground text-white border border-transparent hover:border-white">
											<EyeOpenIcon />
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</section>
			)}

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	);
}
