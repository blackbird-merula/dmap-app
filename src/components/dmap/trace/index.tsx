import { Lock, LockOpen } from '@mui/icons-material'
import { Sheet, Stack, Table, Typography } from '@mui/joy'
import type { FC } from 'react'
import { useTraceQuery } from '../../../hooks/useTraceQuery'

export const Trace: FC = () => {
	const traceQuery = useTraceQuery({ enabled: false })
	if (!traceQuery.data) {
		return null
	}
	return (
		<Stack gap={2}>
			<Typography level="h4">Trace</Typography>
			<Sheet>
				<Table variant="outlined">
					<thead>
						<tr>
							<th style={{ width: '4rem' }}>step</th>
							<th style={{ width: '4rem' }}>lock</th>
							<th style={{ width: '10rem' }}>name</th>
							<th style={{ width: '42ch' }}>zone</th>
						</tr>
					</thead>
					<tbody>
						{traceQuery.data ? (
							traceQuery.data.entries.map((step, index) => (
								<tr key={index}>
									<td>{index}</td>
									<td>{step.locked ? <Lock /> : <LockOpen />}</td>
									<td>{step.name}</td>
									<td>
										<a
											href={`https://etherscan.io/address/${step.zone}`}
											target="_blank"
											rel="noreferrer"
										>
											{step.zone}
										</a>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={4}>no results</td>
							</tr>
						)}
					</tbody>
				</Table>
			</Sheet>
		</Stack>
	)
}
