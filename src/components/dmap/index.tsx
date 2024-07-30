import { Box, Stack } from '@mui/joy'
import { type FC, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTraceQuery } from '../../hooks/useTraceQuery'
import { DmapLogo } from '../logo'
import { About } from './about'
import { FormStateProvider, useSearch } from './context'
import { Manage } from './manage'
import { Search } from './search'
import { Trace } from './trace'

const Content: FC = () => {
	return (
		<Box>
			<DmapLogo />
			<Search />
			<Stack gap={3} py={3}>
				<About />
				<Trace />
				<Manage />
			</Stack>
		</Box>
	)
}

const Effects: FC = () => {
	const [, setSearch] = useSearch()
	const traceQuery = useTraceQuery({ enabled: false })
	const navigate = useNavigate()
	const params = useParams<{ path?: string }>()

	useEffect(() => {
		// FIXME: this can override the search input if a trace completes
		//  before the user finishes typing (because of the redirect below)
		if (params.path) setSearch(params.path)
	}, [params.path, setSearch])

	// TODO consider moving this?
	useEffect(() => {
		if (traceQuery.data) {
			navigate(`/${traceQuery.data.dpath}`)
		} else {
			navigate('/')
		}
	}, [traceQuery.data, navigate])
	return null
}

export const Dmap: FC = () => (
	<FormStateProvider>
		<Content />
		<Effects />
	</FormStateProvider>
)
