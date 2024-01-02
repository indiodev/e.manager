import { z } from 'zod';

export const CreateUserSchema = z.object({
	email: z
		.string()
		.nonempty({ message: 'E-mail é obrigatório' })
		.email({ message: 'E-mail inválido' }),
	name: z.string().nonempty({ message: 'Nome é obrigatório' }),
	password: z.string().nonempty({ message: 'Senha é obrigatória' }),
	active: z.boolean().default(true),
});

export type CreateUserType = z.infer<typeof CreateUserSchema>;
