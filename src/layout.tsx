import '@fontsource/inter'
import { Box, CssBaseline, Divider, GlobalStyles, Stack } from '@mui/joy'
import { CssVarsProvider } from '@mui/joy/styles'
import type { FC } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Settings } from './components/settings'
import { theme } from './theme'

export const Layout: FC = () => (
	<CssVarsProvider
		theme={theme}
		defaultColorScheme="light"
		disableTransitionOnChange
	>
		<CssBaseline />
		<GlobalStyles
			styles={(theme) => ({
				a: {
					textDecoration: 'none',
					color: theme.vars.palette.primary['400'],
					'&:hover': {
						color: theme.vars.palette.primary['700'],
					},
				},
			})}
		/>
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				minHeight: '100dvh',
				flexDirection: 'column',
				minWidth: '40rem',
			}}
		>
			<Box
				component="main"
				sx={{
					width: '100%',
					maxWidth: '60rem',
					px: 3,
					py: 2,
					display: 'flex',
					alignItems: 'center',
					flexDirection: 'row',
					justifyContent: 'space-between',
					gap: 1,
				}}
			>
				<Stack direction="row" gap={3} alignItems="center">
					<Link to="https://docs.dmap.name">Get started</Link>
					<Link to="https://docs.dmap.name">Docs</Link>
					<Link to="https://github.com/blackbird-merula/dmap-app">Source</Link>
				</Stack>
				<Settings />
			</Box>
			<Box
				component="main"
				sx={{
					px: { xs: 2, md: 6 },
					pt: 4,
					pb: { xs: 2, sm: 2, md: 3 },
					flex: 1,
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
					maxWidth: '60rem',
					height: '100dvh',
					gap: 1,
				}}
			>
				<Outlet />
			</Box>
		</Box>
	</CssVarsProvider>
)
