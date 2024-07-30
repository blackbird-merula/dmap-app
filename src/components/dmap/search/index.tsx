import { DataObject, Keyboard, Lock, LockOpen } from '@mui/icons-material'
import { Divider, FormControl, FormHelperText, Stack, Tooltip } from '@mui/joy'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { useTraceQuery } from '../../../hooks/useTraceQuery'
import { SearchInput } from './searchInput'

export const Search: FC = () => {
	const traceQuery = useTraceQuery()

	// TODO split up components
	return (
		<Stack alignItems="center" py={3}>
			<FormControl error={traceQuery.isError} inputMode="text">
				<SearchInput />
				<FormHelperText sx={{ mt: 1 }}>
					{traceQuery.error ? (
						traceQuery.error.message
					) : traceQuery.isFetching ? (
						<>&nbsp;</>
					) : traceQuery.data ? (
						traceQuery.data.locked ? (
							<Tooltip
								title="This path is fully immutable"
								arrow
								placement="left"
							>
								<Stack direction="row" gap={0.3}>
									<Lock /> Locked
								</Stack>
							</Tooltip>
						) : (
							<Tooltip
								title="The content of this path may change"
								arrow
								placement="left"
							>
								<Stack direction="row" gap={0.3}>
									<LockOpen /> Unlocked
								</Stack>
							</Tooltip>
						)
					) : (
						<>
							<Keyboard /> Enter a dpath
						</>
					)}
				</FormHelperText>
				{traceQuery.data && <Divider sx={{ mt: 1, mb: 0.5 }} />}
				<FormHelperText>
					{traceQuery.data ? (
						<Tooltip title="Zone contract" arrow placement="left">
							<Stack direction="row" gap={0.3}>
								<img
									src="/ethereum.svg"
									width="20"
									height="20"
									alt="Zone contract"
								/>
								<Link
									to={`https://etherscan.io/address/${traceQuery.data.zone}`}
									target="_blank"
									rel="noreferrer"
								>
									{traceQuery.data.zone}
								</Link>
							</Stack>
						</Tooltip>
					) : (
						<>&nbsp;</>
					)}
				</FormHelperText>
				<FormHelperText>
					{traceQuery.data ? (
						<Tooltip title="dmap meta" arrow placement="left">
							<Stack direction="row" gap={0.3}>
								<DataObject />
								{traceQuery.data.meta}
							</Stack>
						</Tooltip>
					) : (
						<>&nbsp;</>
					)}
				</FormHelperText>
				<FormHelperText>
					{traceQuery.data ? (
						<Tooltip title="dmap data" arrow placement="left">
							<Stack direction="row" gap={0.3}>
								<DataObject />
								{traceQuery.data.data}
							</Stack>
						</Tooltip>
					) : (
						<>&nbsp;</>
					)}
				</FormHelperText>
				<FormHelperText>
					{traceQuery.data?.cid ? (
						<Tooltip title="IPFS content" arrow placement="left">
							<Stack direction="row" gap={0.3}>
								<img
									src="/ipfs.svg"
									width="20"
									height="20"
									alt="IPFS content"
								/>
								<Link
									to={`http://localhost:5001/ipfs/bafybeigggyffcf6yfhx5irtwzx3cgnk6n3dwylkvcpckzhqqrigsxowjwe/#/ipfs/${traceQuery.data.cid}`}
									target="_blank"
									rel="noreferrer"
								>
									{traceQuery.data.cid}
								</Link>
							</Stack>
						</Tooltip>
					) : (
						<>&nbsp;</>
					)}
				</FormHelperText>
			</FormControl>
		</Stack>
	)
}
