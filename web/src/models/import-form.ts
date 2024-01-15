import type { z } from 'zod';

import type { ImportFormSchema } from '../schemas';

export type ImportForm = z.infer<typeof ImportFormSchema>;
