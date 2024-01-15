import {
	CircleIcon,
	MagnifyingGlassIcon,
	UploadIcon,
} from '@radix-ui/react-icons';
import { useRef, type ReactElement } from 'react';

import { ImportFormSheet } from './import-form-sheet';
import { Table } from './table';

import {
	Button,
	Input,
	Pagination,
	PaginationContent,
	PaginationFirst,
	PaginationItem,
	PaginationLast,
	PaginationNext,
	PaginationPrevious,
	Sheet,
	SheetTrigger,
} from '@/src/components';
import { useParams, useSchemaPaginateQuery } from '@/src/hooks';

export function Schemas(): ReactElement {
	const searchInputRef = useRef<HTMLInputElement>(null);
	const searchButtonRef = useRef<HTMLButtonElement>(null);

	const { setParams, params } = useParams<{
		page: number;
		limit: number;
		search: string | undefined;
	}>({
		page: 1,
		limit: 10,
		search: undefined,
	});

	const {
		data: schemas,
		isSuccess,
		isLoading,
	} = useSchemaPaginateQuery({
		params,
	});

	return (
		<div className="container flex flex-col space-y-8 overflow-x-hidden">
			<Sheet>
				<div className="flex space-x-2">
					<div className="flex relative w-full">
						<Input
							type="text"
							placeholder="Pesquise por evento..."
							className="w-full absolute left-0 right-0"
							ref={searchInputRef}
							onKeyDown={(event) => {
								if (
									event.currentTarget.value === '' ||
									searchInputRef.current?.value === ''
								) {
									setParams('search', undefined);
									return;
								}

								if (event.key === 'Enter') {
									searchButtonRef.current?.click();
									return;
								}
							}}
						/>
						<Button
							onClick={() => {
								if (searchInputRef.current?.value) {
									setParams('search', searchInputRef.current.value);
									return;
								}
							}}
							ref={searchButtonRef}
							className="text-white font-bold absolute right-0 bg-transparent hover:bg-primary-foreground focus:bg-primary-foreground"
						>
							{!isLoading && <MagnifyingGlassIcon />}
							{isLoading && <CircleIcon />}
						</Button>
					</div>

					<SheetTrigger asChild>
						<Button className="text-white font-bold space-x-2">
							<UploadIcon />
							<span>Importar</span>
						</Button>
					</SheetTrigger>
				</div>

				{isSuccess && !params.search && !(schemas.data.length > 0) && (
					<h2>Nenhum registro encontrado.</h2>
				)}

				{isSuccess && params.search && !(schemas.data.length > 0) && (
					<h2>
						Nenhum registro encontrado para{' '}
						<strong>
							<em> {searchInputRef.current?.value}.</em>
						</strong>
					</h2>
				)}

				{isSuccess && schemas?.meta.total > schemas?.meta.per_page && (
					<Pagination className="justify-between">
						<span className="text-foreground text-sm">
							<em>
								<strong>
									Exibindo {schemas.meta.current_page} de{' '}
									{schemas.meta.last_page} página(s)
								</strong>
							</em>
						</span>
						<PaginationContent>
							<PaginationItem>
								<PaginationFirst onClick={() => setParams('page', 1)} />
							</PaginationItem>
							<PaginationItem>
								<PaginationPrevious
									onClick={() =>
										params.page > 1 && setParams('page', params.page - 1)
									}
								/>
							</PaginationItem>
							<PaginationItem>
								<PaginationNext
									onClick={() =>
										params.page < schemas?.meta.last_page &&
										setParams('page', params.page + 1)
									}
								/>
							</PaginationItem>
							<PaginationItem>
								<PaginationLast
									onClick={() => setParams('page', schemas.meta.last_page)}
								/>
							</PaginationItem>
						</PaginationContent>
					</Pagination>
				)}

				{isSuccess && schemas.data.length > 0 && (
					<section className="rounded-sm">
						<Table
							data={schemas.data}
							columns={['ESocial ID', 'Prefixo', 'Data de Extração', '']}
						/>
					</section>
				)}

				<ImportFormSheet />
			</Sheet>
		</div>
	);
}
