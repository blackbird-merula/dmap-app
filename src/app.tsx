import '@fontsource/inter'
// import '@rainbow-me/rainbowkit/styles.css'

import type { FC } from 'react'
import { ContextProvider } from './context'
import { Router } from './router'

export const App: FC = () => (
	<ContextProvider>
		<Router />
	</ContextProvider>
)
