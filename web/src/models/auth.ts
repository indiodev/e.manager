import type { z } from 'zod';

import type { Auth } from '../schemas';

export interface Token {
	type: string;
	token: string;
}

export type Login = z.infer<typeof Auth.Login>;
