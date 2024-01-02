import {
	Box,
	IconButton,
	Stack,
	styled,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';
import type { Icon } from '@phosphor-icons/react';
import {
	CaretDoubleLeft,
	CaretDoubleRight,
	SignOut,
} from '@phosphor-icons/react';
import { useState, type ReactElement } from 'react';
import { toast } from 'react-toastify';

import { PrivateMenus } from './menus';
import { SidebarButton } from './SidebarButton';

import { Small } from '~/components';
import { useAuth } from '~/hooks/store';

export function Sidebar(): ReactElement {
	const { logout } = useAuth();

	const theme = useTheme();
	const isMdDown = useMediaQuery(theme.breakpoints.down('md'));

	function handleLogout(): void {
		logout();
		toast.success('Logout efetuado com sucesso!');
	}

	const [open, setOpen] = useState(true);

	const SidebarMenu = styled(Box)(({ theme }) => ({
		display: 'flex',
		flexDirection: 'column',
		width: open && !isMdDown ? 180 : 60,
		backgroundColor: '#5C73DB',
		minHeight: '100vh',
		// position: 'relative',
		...(open && {
			transition: theme.transitions.create('all', {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
		}),
	}));

	return (
		<>
			<SidebarMenu>
				<Stack
					sx={{
						flexDirection: 'row',
						alignItems: 'center',
						gap: '0.5rem',
						justifyContent: 'center',
						padding: '1.5rem 0',
					}}
				>
					<Small />

					{open && !isMdDown && (
						<Typography
							variant="h6"
							fontWeight="bold"
							sx={{
								color: '#f4f4f4',
							}}
						>
							eManager
						</Typography>
					)}
				</Stack>

				<Box sx={{ position: 'relative' }}>
					{!isMdDown && (
						<IconButton
							size="large"
							edge="start"
							onClick={(): void => setOpen((state) => !state)}
							sx={{
								position: 'absolute',
								right: -8,
								top: -10,
								transition: 'all 0.2s ease',
								padding: '3px',
								color: '#f4f4f4',
								backgroundColor: '#708aff',
								zIndex: 10,

								'&:hover': {
									backgroundColor: '#282b41',
								},
							}}
						>
							{!open && (
								<CaretDoubleRight
									size={20}
									weight="fill"
								/>
							)}

							{open && (
								<CaretDoubleLeft
									size={20}
									weight="fill"
								/>
							)}
						</IconButton>
					)}

					{/* <Divider sx={{ border: '4px solid #b7beec77' }} /> */}

					{(!open || isMdDown) && (
						<>
							{PrivateMenus.map((menu) => (
								<SidebarButton
									key={menu.label}
									path={menu.path}
									Icon={menu.icon as Icon}
								/>
							))}
							<SidebarButton
								Icon={SignOut}
								onClick={handleLogout}
							/>
						</>
					)}

					{open && !isMdDown && (
						<>
							{PrivateMenus.map((menu) => (
								<SidebarButton
									key={menu.label}
									label={menu.label}
									path={menu.path}
									Icon={menu.icon as Icon}
								/>
							))}

							<SidebarButton
								label="Sair"
								Icon={SignOut}
								onClick={handleLogout}
							/>
						</>
					)}
				</Box>
			</SidebarMenu>
		</>
	);
}
