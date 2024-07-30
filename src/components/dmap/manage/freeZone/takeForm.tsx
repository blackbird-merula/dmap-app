import { FormControl, FormHelperText, Stack, Typography } from '@mui/joy'
import { type QueryKey, useQueryClient } from '@tanstack/react-query'
import type { FC } from 'react'
import { freeZoneAbi } from '../../../../abis'
import type { Trace } from '../../../../types'
import { TxButton } from '../../../txButton'
import type { FreeZoneEntry } from './types'

export const TakeForm: FC<{
	trace: Trace
	entry: FreeZoneEntry
	invalidateQueriesOnSuccess: QueryKey[]
}> = ({
	trace: { dpath, locked, zone },
	entry: { isOwned, zoneKey },
	invalidateQueriesOnSuccess,
}) => {
	const queryClient = useQueryClient()
	const disabled = isOwned || locked
	return (
		<Stack gap={2}>
			<Typography>
				Set the connected account as the controller of dpath://{dpath}
			</Typography>
			<FormControl error={disabled}>
				<FormHelperText>
					{isOwned
						? 'This entry is already controlled.'
						: locked
							? 'This entry is locked and can no longer be modified.'
							: null}
				</FormHelperText>
			</FormControl>
			<FormControl error={disabled}>
				<TxButton
					sx={{ maxWidth: '4rem', mt: 2 }}
					disabled={disabled}
					params={{
						address: zone,
						abi: freeZoneAbi,
						functionName: 'take',
						args: [zoneKey],
					}}
					onSuccess={async () => {
						await Promise.all(
							invalidateQueriesOnSuccess.map((queryKey) =>
								queryClient.invalidateQueries({ queryKey }),
							),
						)
					}}
				>
					Take
				</TxButton>
			</FormControl>
		</Stack>
	)
}
