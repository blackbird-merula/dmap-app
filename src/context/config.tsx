import { defaultConfig, getViemConfig } from '@dsuite/core/config'
import type { Config } from '@dsuite/core/types'
import {
	type Dispatch,
	type FC,
	type PropsWithChildren,
	type SetStateAction,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { getAddress } from 'viem'
import { usePublicClient } from 'wagmi'

export const initialConfig = {
	ipfs: import.meta.env.VITE_IPFS ?? defaultConfig.ipfs,
	dmap: import.meta.env.VITE_DMAP ?? defaultConfig.dmap,
	freeZone: import.meta.env.VITE_FREE_ZONE
		? getAddress(import.meta.env.VITE_FREE_ZONE)
		: undefined,
	rootZone: import.meta.env.VITE_ROOT_ZONE
		? getAddress(import.meta.env.VITE_ROOT_ZONE)
		: undefined,
	rpc: import.meta.env.VITE_RPC ?? defaultConfig.rpc,
}

export const configContext = createContext<
	[Config, Dispatch<SetStateAction<Config>>]
>(null as never)

// TODO fix types
export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {
	const [configStorage, setConfigStorage] = useLocalStorage(
		'dsuite.config',
		initialConfig,
	)

	const config = useState({
		...initialConfig,
		...configStorage,
	})
	const [state] = config

	useEffect(() => setConfigStorage(state), [state, setConfigStorage])

	return (
		<configContext.Provider value={config as never}>
			{children}
		</configContext.Provider>
	)
}

export const useConfig = () => {
	const publicClient = usePublicClient()
	const [config] = useContext(configContext)
	return getViemConfig(publicClient, config)
}
