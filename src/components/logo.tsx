import styled from '@emotion/styled'
import type { FC } from 'react'
import { theme } from '../theme'

const Container = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	text-align: center;
	gap: 0.5rem;
	
	.icon {
		width: 3.5rem;
		color: ${theme.palette.primary[400]};
		font-size: 2.5rem;
		font-weight: lighter;
	}
	
	h1 {
		font-size: 2.5rem;
		margin: 0;
	}
	
	h2 {
		font-weight: normal;
		font-size: 1.2rem;
		margin: 0;
	}
`

const Logo: FC<{ title: string; icon: string; subtitle: string }> = ({
	title,
	icon,
	subtitle,
}) => (
	<Container>
		<h1>
			<span className="icon">{icon}</span> {title}
		</h1>
		<h2>{subtitle}</h2>
	</Container>
)

export const DmapLogo = () => (
	<Logo title="dmap" subtitle="Verify-immutable name registry" icon={'{d}'} />
)

export const DpathLogo = () => (
	<Logo title="dpath" subtitle="Immutable path resolution" icon={'.d:'} />
)

export const DpackLogo = () => (
	<Logo title="dpack" subtitle="Immutable lockfile" icon={'[d]'} />
)
