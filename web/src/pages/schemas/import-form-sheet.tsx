import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircledIcon, CheckIcon, UploadIcon } from '@radix-ui/react-icons';
import JSZip from 'jszip';
import { useRef, type ReactElement } from 'react';
import { useForm } from 'react-hook-form';

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	toast,
} from '@/src/components';
import { useBuildNodesMutation } from '@/src/hooks';
import { QueryClient } from '@/src/lib';
import type { ImportForm } from '@/src/models';
import { ImportFormSchema } from '@/src/schemas';

export function ImportFormSheet(): ReactElement {
	const closeSheetButtonRef = useRef<HTMLButtonElement>(null);
	const { mutateAsync: build_nodes } = useBuildNodesMutation({
		onError(error) {
			console.log(error);
			toast({
				title: 'Houve um erro, tente mais tarde.',
				variant: 'destructive',
			});
		},

		onSuccess(data) {
			QueryClient.invalidateQueries({ queryKey: ['SCHEMA_PAGINATE'] });
			closeSheetButtonRef.current?.click();
			toast({
				title: 'Operação efetuada.',
				description: (
					<div className="flex flex-col gap-2">
						<em>
							{data.no_exist_count} <strong>arquivos a serem inclusos.</strong>{' '}
							{data.created_count} <strong>arquivos inclusos.</strong>
						</em>
						<em>
							{data.file_count} <strong>arquivos enviados.</strong>{' '}
							{data.exist_count}{' '}
							<strong>arquivos inclusos anteriormente.</strong>
						</em>
						{/* <em>{data.no_exist_count}</em> arquivos já inclusos. */}
					</div>
				),
				className: 'bg-green-500',
			});
		},
	});

	const inputFileUploadRef = useRef<HTMLInputElement>(null);

	const form = useForm<ImportForm>({
		mode: 'onSubmit',
		resolver: zodResolver(ImportFormSchema),
	});

	const form_data = new FormData();
	const total_files = form.watch('count.total');
	const total_xml_files = form.watch('count.xml');
	const total_zip_files = form.watch('count.zip');

	function onSubmit({ formData, prefix }: ImportForm): void {
		formData.append('prefix', prefix);
		build_nodes(formData);
		form.reset();
	}

	const prefixMask = (value: string): string => {
		if (value.length < 1) return '';
		const digitsOnly = value.replace(/\D/g, '').slice(0, 4);
		return `S${digitsOnly}`;
	};

	async function changeUploadFiles(
		e: React.ChangeEvent<HTMLInputElement>,
	): Promise<Promise<void>> {
		const { files } = e.target;

		if (!files || files?.length === 0) return;

		const xml_files_count = [...files].filter(({ type }) =>
			type.includes('xml'),
		).length;

		const zip_files_count = [...files].filter(({ type }) =>
			type.includes('zip'),
		).length;

		for (const file of files) {
			if (file.type.includes('zip')) {
				const content = await readFileContent(file);

				const zip = await JSZip.loadAsync(content as Blob);

				for (const [name, content] of Object.entries(zip.files)) {
					const blob = await content.async('blob');
					form_data.append('xml', blob, name);
				}
			} else form_data.append('xml', file);
		}

		form.setValue('count.total', xml_files_count + zip_files_count);
		form.setValue('count.xml', xml_files_count);
		form.setValue('count.zip', zip_files_count);

		form.setValue('formData', form_data);
	}

	const readFileContent = (file: File): Promise<unknown> => {
		return new Promise((resolve, reject) => {
			const leitor = new FileReader();

			leitor.onload = (event) => {
				resolve(event?.target?.result);
			};

			leitor.onerror = (error) => {
				reject(error);
			};

			leitor.readAsArrayBuffer(file);
		});
	};

	return (
		<SheetContent className="flex flex-col gap-4">
			<SheetHeader>
				<SheetTitle>Nova importação XML e-social</SheetTitle>
				<SheetDescription>
					Adicione quantos arquivos desejar para a sua importação. Entre
					diversos arquivos XML ou um compilado ZIP.
				</SheetDescription>
			</SheetHeader>

			<Form {...form}>
				<form
					className="flex flex-col gap-6 w-full"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FormField
						control={form.control}
						name="prefix"
						render={({ field: { onChange, ...rest } }) => (
							<FormItem>
								<FormLabel>Prefixo</FormLabel>
								<FormControl>
									<Input
										{...rest}
										placeholder="S0000"
										className="uppercase"
										onChange={(e) => onChange(prefixMask(e.target.value))}
									/>
								</FormControl>
								<FormMessage className="text-right" />
							</FormItem>
						)}
					/>

					<FormItem>
						<Button
							type="button"
							onClick={() => inputFileUploadRef.current?.click()}
							className="justify-between text-foreground bg-primary-foreground hover:bg-primary-foreground hover:opacity-90 w-full"
						>
							{!total_files && (
								<>
									<span>Adicionar arquivos</span>
									<UploadIcon
									// className="w-5 h-5 ml-2"
									/>
								</>
							)}

							{total_files && (
								<>
									<span>{total_files} arquivo(s) adicionado(s)</span>
									<CheckIcon className="text-green-500 h-5 w-5" />
								</>
							)}

							<Input
								onChange={changeUploadFiles}
								type="file"
								className="hidden"
								ref={inputFileUploadRef}
								multiple
								accept="text/xml, application/xml, application/zip"
							/>
						</Button>

						<div className="flex gap-4 justify-end">
							{form.formState.errors.count?.message && (
								<span className="space-x-2 flex gap-2 items-center text-xs font-medium text-red-400">
									{form.formState.errors.count?.message}
								</span>
							)}
							{total_xml_files > 1 && (
								<span className="space-x-2 flex gap-2 items-center text-sm">
									{total_xml_files} xml
									<CheckCircledIcon className="text-green-400" />
								</span>
							)}
							{total_zip_files >= 1 && (
								<span className="space-x-2 flex gap-2 items-center text-sm">
									{total_zip_files} zip
									<CheckCircledIcon className="text-green-400" />
								</span>
							)}
						</div>
					</FormItem>

					<div className="flex gap-4">
						<SheetClose
							asChild
							className="flex-1"
							onClick={() => form.reset()}
							ref={closeSheetButtonRef}
						>
							<Button className="bg-secondary-foreground hover:bg-foreground hover:opacity-90">
								Cancelar
							</Button>
						</SheetClose>

						<Button className="flex-1 text-foreground font-bold">
							Extrair
						</Button>
					</div>
				</form>
			</Form>
		</SheetContent>
	);
}
