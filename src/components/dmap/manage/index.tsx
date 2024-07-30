import { Stack } from '@mui/joy'
import type { FC } from 'react'
import { useTraceQuery } from '../../../hooks/useTraceQuery'
import { ManageFreeZone } from './freeZone'

export const Manage: FC = () => {
	// const [config] = useContext(configContext)
	const traceQuery = useTraceQuery()

	if (!traceQuery.data) {
		return null
	}

	// TODO freeZone config
	// const isFreeZone = traceQuery.data?.zone === config.freeZone
	const isFreeZone = true

	// For now, only FreeZone is supported
	return (
		<Stack gap={2}>
			{isFreeZone && <ManageFreeZone trace={traceQuery.data} />}
		</Stack>
	)
}
