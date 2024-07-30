import {
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Stack,
	Typography,
} from '@mui/joy'
import { type QueryKey, useQueryClient } from '@tanstack/react-query'
import type { FC } from 'react'
import { freeZoneAbi } from '../../../../abis'
import { useAddressInput } from '../../../../hooks/inputs'
import type { Trace } from '../../../../types'
import { TxButton } from '../../../txButton'
import type { FreeZoneEntry } from './types'

export const GiveForm: FC<{
	trace: Trace
	entry: FreeZoneEntry
	invalidateQueriesOnSuccess: QueryKey[]
}> = ({
	trace: { locked, dpath, zone, zoneKey },
	entry: { owner, isOwner, isOwned },
	invalidateQueriesOnSuccess,
}) => {
	const queryClient = useQueryClient()
	const [recipient, setRecipient] = useAddressInput(owner)
	const disabled = !isOwner || locked
	const validation = locked
		? 'This entry is locked and can no longer be modified.'
		: !isOwned
			? 'This entry must be controlled first (Take).'
			: !isOwner
				? 'You are not the controller of this entry.'
				: null

	return (
		<Stack gap={2}>
			<Typography>Change the controller of dmap://{dpath}</Typography>
			<FormControl error={!!recipient.error || !!validation}>
				<FormHelperText>{recipient.error ?? validation}</FormHelperText>
			</FormControl>
			<FormControl error={!!recipient.error}>
				<FormLabel>Controller</FormLabel>
				<Input
					type="text"
					placeholder="Recipient account"
					value={recipient.input}
					disabled={disabled}
					sx={{
						maxWidth: '46ch',
						fontFamily: 'monospace',
						fontSize: '0.9rem',
					}}
					onChange={(el) => setRecipient(el.target.value)}
				/>
				<TxButton
					sx={{ maxWidth: '4rem', mt: 4 }}
					disabled={disabled || !recipient.value}
					params={
						recipient.value
							? {
									address: zone,
									abi: freeZoneAbi,
									functionName: 'give',
									args: [zoneKey, recipient.value],
								}
							: undefined
					}
					onSuccess={async () => {
						await Promise.all(
							invalidateQueriesOnSuccess.map((queryKey) =>
								queryClient.invalidateQueries({ queryKey }),
							),
						)
					}}
				>
					Give
				</TxButton>
			</FormControl>
		</Stack>
	)
}
