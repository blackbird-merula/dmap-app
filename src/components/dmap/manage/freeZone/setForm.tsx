import { prepareCID, unpackCID } from '@dsuite/dpack/cid'

import { InfoRounded } from '@mui/icons-material'
import {
	Box,
	Checkbox,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Stack,
	Typography,
} from '@mui/joy'
import { type QueryKey, useQueryClient } from '@tanstack/react-query'
import { CID } from 'multiformats/cid'
import { type FC, useEffect, useState } from 'react'
import { toHex, zeroHash } from 'viem'
import { freeZoneAbi } from '../../../../abis'
import { useCidV1Input, useHexInput } from '../../../../hooks/inputs'
import { usePrevious } from '../../../../hooks/usePrevious'
import type { Trace } from '../../../../types'
import { TxButton } from '../../../txButton'
import type { FreeZoneEntry } from './types'

// FIXME bug: when the entry is locked, we should update the path input,
// because otherwise meta is set incorrectly; and it can't be set anyway
export const SetForm: FC<{
	trace: Trace
	entry: FreeZoneEntry
	invalidateQueriesOnSuccess: QueryKey[]
}> = ({
	trace: { zone, dpath, meta, data, cid, locked },
	entry: { isOwner, isOwned, zoneKey },
	invalidateQueriesOnSuccess,
}) => {
	const queryClient = useQueryClient()

	const [metaInput, setMetaInput] = useHexInput(32, 'left', meta)
	const [dataInput, setDataInput] = useHexInput(32, 'right', data)
	const [cidInput, setCidInput] = useCidV1Input(cid)
	const [lockFlag, setLockFlag] = useState(locked)

	const prevMeta = usePrevious(metaInput.value)
	const prevData = usePrevious(dataInput.value)
	const prevCid = usePrevious(cidInput.value)
	const prevLockFlag = usePrevious(lockFlag)

	useEffect(() => {
		if (locked) {
			return
		}
		if (cidInput.value && prevCid !== cidInput.value) {
			try {
				// when cidv1 changed, update meta/data
				const cid = CID.parse(cidInput.value)
				const prepared = prepareCID(cid, lockFlag)
				setMetaInput(toHex(prepared.meta))
				setDataInput(toHex(prepared.data))
			} catch {}
		} else if (prevMeta !== metaInput.value || prevData !== dataInput.value) {
			// If meta + data != cid, update cid (it may contain a new cid, or none)
			;(() => {
				if (metaInput.value && dataInput.value) {
					try {
						const unpackedCid = unpackCID(metaInput.value, dataInput.value)
						if (unpackedCid) {
							setCidInput(unpackedCid.toV1().toString())
							return
						}
					} catch (error) {}
				}
				setCidInput('')
			})()
			// update lockFlag for meta
			setLockFlag(
				!!(
					metaInput.value &&
					metaInput.value.length === 66 &&
					metaInput.value.endsWith('1')
				),
			)
		} else if (prevLockFlag !== lockFlag) {
			// when lockFlag changed, update meta
			setMetaInput(
				`${(metaInput.value ?? zeroHash).slice(0, 65)}${lockFlag ? 1 : 0}`,
			)
		}
	}, [
		locked,
		prevMeta,
		prevData,
		prevCid,
		prevLockFlag,
		cidInput.value,
		metaInput.value,
		dataInput.value,
		lockFlag,
		setMetaInput,
		setDataInput,
		setCidInput,
	])

	const unchanged =
		locked === lockFlag && meta === metaInput.value && data === dataInput.value

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
			<Typography>
				Set the content that dpath://{dpath} resolves to; optionally lock the
				entry
			</Typography>
			<FormControl error={!!validation}>
				<FormHelperText>{validation}</FormHelperText>
			</FormControl>
			<FormControl error={!!cidInput.error}>
				<FormLabel>IPFS CID (v1)</FormLabel>
				<Input
					type="text"
					name="cidV1"
					disabled={disabled}
					sx={{
						maxWidth: '70ch',
						fontFamily: 'monospace',
						fontSize: '0.8rem',
					}}
					value={cidInput.input}
					onChange={(el) => setCidInput(el.target.value)}
				/>
				<FormHelperText
					sx={(theme) => ({ color: theme.vars.palette.text.tertiary })}
				>
					<InfoRounded /> The IPFS CID is encoded into the meta and data fields
					(optional).
				</FormHelperText>
				<FormHelperText>{cidInput.error}&nbsp;</FormHelperText>
			</FormControl>
			<FormControl error={!!metaInput.error}>
				<FormLabel>Meta</FormLabel>
				<Input
					type="text"
					name="meta"
					disabled={disabled}
					sx={{
						maxWidth: '70ch',
						fontFamily: 'monospace',
						fontSize: '0.8rem',
					}}
					value={metaInput.input}
					onChange={(el) =>
						el.target.value.length <= 66 && setMetaInput(el.target.value)
					}
				/>
				<FormHelperText
					sx={(theme) => ({ color: theme.vars.palette.text.tertiary })}
				>
					<InfoRounded /> The last hex digit of the meta field is the entry's
					lock (0 or 1).
				</FormHelperText>
				<FormHelperText>{metaInput.error}&nbsp;</FormHelperText>
			</FormControl>
			<FormControl error={!!dataInput.error}>
				<FormLabel>Data</FormLabel>
				<Input
					type="text"
					name="data"
					disabled={disabled}
					sx={{
						maxWidth: '70ch',
						fontFamily: 'monospace',
						fontSize: '0.8rem',
					}}
					value={dataInput.input}
					onChange={(el) =>
						el.target.value.length <= 66 && setDataInput(el.target.value)
					}
				/>
				<FormHelperText
					sx={(theme) => ({ color: theme.vars.palette.text.tertiary })}
				>
					<InfoRounded /> The data contains the content the entry resolves to
					(eg. an IPFS CID, a zone address, etc).
				</FormHelperText>
				<FormHelperText>{dataInput.error}&nbsp;</FormHelperText>
			</FormControl>
			<FormControl>
				<FormLabel>Lock</FormLabel>
				<Box>
					<Checkbox
						name="lock"
						disabled={disabled}
						checked={lockFlag}
						onChange={(el) => setLockFlag(el.target.checked)}
					/>
				</Box>
				<FormHelperText
					sx={(theme) => ({ color: theme.vars.palette.text.tertiary })}
				>
					<InfoRounded /> Locking the entry will make it immutable (ie. cannot
					be changed again in any way).
				</FormHelperText>
			</FormControl>
			<FormControl sx={{ pt: 2 }}>
				<TxButton
					sx={{ maxWidth: '4rem' }}
					disabled={
						disabled || !metaInput.value || !dataInput.value || unchanged
					}
					params={
						metaInput.value && dataInput.value
							? {
									address: zone,
									abi: freeZoneAbi,
									functionName: 'set',
									args: [zoneKey, metaInput.value, dataInput.value],
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
					Set
				</TxButton>
			</FormControl>
		</Stack>
	)
}
