import type {
	FilledInputProps,
	InputProps,
	OutlinedInputProps,
} from '@mui/material';

export type MuiInputProps =
	| Partial<FilledInputProps>
	| Partial<OutlinedInputProps>
	| Partial<InputProps>
	| undefined;
