/* eslint-disable no-unused-vars */
import type { InputBaseComponentProps } from '@mui/material';
import type { RefCallback } from 'react';
import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

interface InputProps {
	onChange: (event: { target: { name: string; value: string } }) => void;
	name: string;
}

export const VersionPrefixInputMask = forwardRef<
	HTMLInputElement,
	Omit<InputBaseComponentProps, 'onChange'> & InputProps
>(({ ...props }, ref) => {
	const { onChange, name, ...rest } = props;
	return (
		<IMaskInput
			{...rest}
			mask="0.0"
			inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
			onAccept={(value): void => onChange({ target: { name, value } })}
			overwrite
		/>
	);
});

VersionPrefixInputMask.displayName = 'VersionPrefixInputMask';

export const LeiautePrefixInputMask = forwardRef<
	HTMLInputElement,
	Omit<InputBaseComponentProps, 'onChange'> & InputProps
>(({ ...props }, ref) => {
	const { onChange, name, ...rest } = props;
	return (
		<IMaskInput
			{...rest}
			mask="S0000"
			inputRef={ref as RefCallback<HTMLTextAreaElement | HTMLInputElement>}
			onAccept={(value): void => onChange({ target: { name, value } })}
			overwrite
		/>
	);
});

LeiautePrefixInputMask.displayName = 'LeiautePrefixInputMask';
