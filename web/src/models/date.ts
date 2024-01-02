import type { DateTime } from 'luxon';

export interface Date {
	initial: DateTime | string | null;
	final: DateTime | string | null;
}
