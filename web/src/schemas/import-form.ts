import { z } from 'zod';

export const ImportFormSchema = z.object({
	prefix: z
		.string({
			required_error: 'Informe o prefixo.',
		})
		.regex(/S\d{4}/, {
			message: 'Prefixo deve seguir o padrão S0000.',
		}),
	count: z.object(
		{
			xml: z.number().default(0),
			zip: z.number().default(0),
			total: z.number().default(0),
		},
		{ required_error: 'Adicione ao menos um arquivo.' },
	),
	formData: z.instanceof(FormData).default(new FormData()),
});
