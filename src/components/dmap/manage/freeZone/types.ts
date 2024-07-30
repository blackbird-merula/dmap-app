import type { Address, Hex } from 'viem'

export type FreeZoneEntry = {
	isOwner: boolean
	isOwned: boolean
	owner?: Address
	zoneKey: Hex
}
