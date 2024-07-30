import { Stack, Tab, TabList, TabPanel, Tabs, Typography } from '@mui/joy'
import { type FC, useState } from 'react'
import { zeroAddress } from 'viem'
import { useAccount, useReadContract } from 'wagmi'
import { freeZoneAbi } from '../../../../abis'
import type { Trace } from '../../../../types'
import { useSearch } from '../../context'
import { GiveForm } from './giveForm'
import { SetForm } from './setForm'
import { TakeForm } from './takeForm'
import type { FreeZoneEntry } from './types'

export const ManageFreeZone: FC<{ trace: Trace }> = ({
	trace: { zone, zoneKey },
	trace,
}) => {
	const [search] = useSearch()

	const account = useAccount()

	const owner = useReadContract({
		abi: freeZoneAbi,
		address: zone,
		functionName: 'controllers',
		args: [zoneKey],
	})

	const entry: FreeZoneEntry = {
		isOwned: !!owner.data && owner.data !== zeroAddress,
		isOwner: !!owner.data && owner.data === account.address,
		owner: owner.data,
		zoneKey,
	}

	const [tabValue, setTabValue] = useState<number>(entry.isOwned ? 2 : 0)

	return (
		<Stack gap={2}>
			<Typography level="h4">Manage (FreeZone)</Typography>
			<Tabs
				value={tabValue}
				onChange={(_el, value) => setTabValue(value as number)}
			>
				<TabList>
					<Tab>Take</Tab>
					<Tab>Give</Tab>
					<Tab>Set</Tab>
				</TabList>
				<TabPanel value={0}>
					<TakeForm
						trace={trace}
						entry={entry}
						invalidateQueriesOnSuccess={[owner.queryKey, ['trace', search]]}
					/>
				</TabPanel>
				<TabPanel value={1}>
					<GiveForm
						trace={trace}
						entry={entry}
						invalidateQueriesOnSuccess={[owner.queryKey]}
					/>
				</TabPanel>
				<TabPanel value={2}>
					<SetForm
						trace={trace}
						entry={entry}
						invalidateQueriesOnSuccess={[['trace', search]]}
					/>
				</TabPanel>
			</Tabs>
		</Stack>
	)
}
