import { z } from 'zod';

export const Login = z.object({
	email: z
		.string({
			required_error: 'Informe e-mail.',
		})
		.email({ message: 'Informe e-mail válido.' }),
	password: z
		.string({
			required_error: 'Informe sua senha.',
		})
		.min(6, { message: 'Informe ao menos 6 caracteres.' }),
});

export const Auth = {
	Login,
};
