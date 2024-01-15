import { ChevronLeftIcon, DownloadIcon } from '@radix-ui/react-icons';
import type { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	Button,
	Input,
	Label,
} from '@/src/components';
import { useSchemaReport, useShowSchema } from '@/src/hooks';

export function Detail(): ReactElement {
	const { mutateAsync: report } = useSchemaReport();
	const { id } = useParams();
	const navigate = useNavigate();
	const {
		data: schema,
		isLoading,
		isSuccess,
		isError,
	} = useShowSchema(id as string);

	if (isLoading) return <div>Loading</div>;

	if (isError || !isSuccess) return <div>Error</div>;

	if (isSuccess && !schema)
		return <div>Houve problemas ao encontrar dados do schema ${id}</div>;

	return (
		<div className="container flex flex-col gap-8">
			<div className="flex w-full justify-between">
				<Button
					onClick={() => navigate('-1', { replace: true })}
					className="bg-transparent flex gap-1 text-foreground hover:bg-primary-foreground items-center"
				>
					<ChevronLeftIcon />
					<span>Voltar</span>
				</Button>
				<h2>
					<em>
						<strong>
							Schema: {schema.e_social_id} - {schema.prefix}
						</strong>
					</em>
				</h2>
				<Button
					onClick={(): Promise<void> => report(schema.e_social_id)}
					className="text-foreground flex gap-1"
				>
					<DownloadIcon />
					<span>Download</span>
				</Button>
			</div>

			<div className="flex flex-col gap-2 max-h-[70vh] overflow-hidden">
				<Accordion
					type="single"
					collapsible
					className="w-full overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-800 scrollbar-w-2"
				>
					{schema.nodes
						.filter(({ children }) => children.length > 0)
						.map((node) => {
							if (node.type === 'multiple') {
								return (
									<AccordionItem
										value={node.name}
										key={node.name}
									>
										<AccordionTrigger className="font-bold decoration-none hover:no-underline hover:bg-primary-foreground px-4">
											{node.name}
										</AccordionTrigger>
										<AccordionContent className="flex flex-col px-4 pt-4 pb-8 gap-4">
											{node.values?.map((item, index) => (
												<div
													key={`item_${index + 1}`}
													className="flex flex-col gap-2"
												>
													<span className="font-bold italic">
														Item #{index + 1}
													</span>

													<div className="grid grid-cols-3 gap-3">
														{Object.entries(item).map(([key, value]) => (
															<div
																className="flex flex-col gap-2"
																key={`${key}_${index}_id`}
															>
																<Label
																	htmlFor={`${key}_${index}_id`}
																	className="font-bold"
																>
																	{key}:
																</Label>
																<Input
																	value={value}
																	id={`${key}_${index}_id`}
																	className="w-full font-bold italic"
																	disabled
																/>
															</div>
														))}
													</div>
												</div>
											))}
										</AccordionContent>
									</AccordionItem>
								);
							}

							return (
								<AccordionItem
									value={node.name}
									key={node.name}
								>
									<AccordionTrigger className="font-bold decoration-none hover:no-underline hover:bg-primary-foreground px-4">
										{node.name}
									</AccordionTrigger>
									<AccordionContent className="grid gap-4 grid-cols-2 px-4 pt-4 pb-8">
										{node?.children.map((child) => (
											<div
												key={child.name}
												className="flex flex-col gap-2"
											>
												<Label
													htmlFor={`${child.value}_id`}
													className="font-bold"
												>
													{child.name}:
												</Label>
												<Input
													value={child.value}
													id={`${child.value}_id`}
													className="w-full font-bold italic"
													disabled
												/>
											</div>
										))}
									</AccordionContent>
								</AccordionItem>
							);
						})}
				</Accordion>
			</div>
		</div>
	);
}
