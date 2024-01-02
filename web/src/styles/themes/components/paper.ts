import type { Components, Theme } from '@mui/material';
import { buttonBaseClasses, typographyClasses } from '@mui/material';
import {
	pickersCalendarHeaderClasses,
	pickersDayClasses,
	pickersFadeTransitionGroupClasses,
} from '@mui/x-date-pickers';

type MuiPaperProps = Components<Omit<Theme, 'components'>>['MuiPaper'];

export const MuiPaper: MuiPaperProps = {
	styleOverrides: {
		root: {
			// To DatePicker - initial
			[`& .${pickersCalendarHeaderClasses.root}`]: {
				[`& .${buttonBaseClasses.root}`]: {
					color: '#f4f4f4',
				},
			},

			[`& .${pickersFadeTransitionGroupClasses.root}`]: {
				[`& .${pickersDayClasses.today}`]: {
					border: '1px solid #f4f4f4',
				},

				[`& .${pickersDayClasses.disabled}`]: {
					color: '#f4f4f498 !important',
				},

				[`& .${typographyClasses.root}`]: {
					color: '#f4f4f498',
					fontWeight: 'bold',
				},
			},
			// To DatePicker - final
		},
	},
};
