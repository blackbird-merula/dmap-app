import { getDefaultConfig } from 'connectkit'
import type { FC, PropsWithChildren } from 'react'
import { http, WagmiProvider as WagmiProviderBase, createConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'

const wagmiConfig = createConfig(
	getDefaultConfig({
		// chains: [foundry],
		chains: [mainnet],
		walletConnectProjectId: import.meta.env.VITE_WALLETCONNECT_PROJECT_ID,
		appName: 'dsuite',
		transports: {
			[mainnet.id]: http(import.meta.env.VITE_RPC),
			// [foundry.id]: http(),
		},
	}),
)

export const WagmiProvider: FC<PropsWithChildren> = ({ children }) => {
	// TODO: seems that wagmi has errors (at least in the dev build)
	//  when the config is created non-statically, so we can't
	//  do user-defined RPC at the moment, unless we use localStorage
	//  and refresh the page or something
	// const [{ rpc }] = useContext(configContext)

	// Unmount on RPC change
	return <WagmiProviderBase config={wagmiConfig}>{children}</WagmiProviderBase>
}

declare module 'wagmi' {
	interface Register {
		config: typeof wagmiConfig
	}
}
