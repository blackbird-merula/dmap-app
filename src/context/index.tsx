import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import type { FC, PropsWithChildren } from 'react'
import { connectKitTheme } from '../theme'
import { ConfigProvider } from './config'
import { WagmiProvider } from './wagmi'

export const queryClient = new QueryClient()

export const ContextProvider: FC<PropsWithChildren> = ({ children }) => (
	<ConfigProvider>
		<WagmiProvider>
			<QueryClientProvider client={queryClient}>
				<ConnectKitProvider customTheme={connectKitTheme}>
					{children}
				</ConnectKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	</ConfigProvider>
)
