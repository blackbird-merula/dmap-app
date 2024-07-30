import type { FC } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { Dmap } from './components/dmap'
import { Layout } from './layout'

export const Router: FC = () => (
	<HashRouter basename="/">
		<Routes>
			<Route Component={Layout}>
				<Route Component={Dmap} index path="/:path?" />
			</Route>
		</Routes>
	</HashRouter>
)
