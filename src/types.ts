import type { Entry } from '@dsuite/core/types'
import type { Address, Hex } from 'viem'

export type Trace = {
	entries: Entry[]
	dpath: string
	meta: Hex
	data: Hex
	cid?: string
	zone: Address
	zoneKey: Hex
	locked: boolean
}
