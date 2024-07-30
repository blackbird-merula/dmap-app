import {
	Chip,
	Divider,
	List,
	ListItem,
	ListItemContent,
	ListItemDecorator,
	Stack,
	Typography,
} from '@mui/joy'
import type { FC, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import { useSearch } from '../context'

export const About: FC = () => {
	const [search] = useSearch()
	if (search) {
		return null
	}
	return (
		<Stack gap={2}>
			<Divider />
			<section>
				<Typography level="h4">dmap is:</Typography>
				<List marker="disc">
					<ListItem>
						<ListItemDecorator>Simple.</ListItemDecorator>
						<ListItemContent>
							Map a human-readable name to a value; nothing more.
						</ListItemContent>
					</ListItem>
					<ListItem>
						<ListItemDecorator>Safe.</ListItemDecorator>
						<ListItemContent>
							Auditable, user-verifiable and dependency-free.
						</ListItemContent>
					</ListItem>
					<ListItem>
						<ListItemDecorator>Free.</ListItemDecorator>
						<ListItemContent>
							Open, extensible public good; no rent extraction.
						</ListItemContent>
					</ListItem>
					<ListItem>
						<ListItemDecorator>Forever.</ListItemDecorator>
						<ListItemContent>
							Opt-in immutability for{' '}
							<Chip sx={{ fontFamily: 'monospace' }}>:anyname</Chip>.
						</ListItemContent>
					</ListItem>
				</List>
			</section>
			<Divider />
			<section style={{ maxWidth: '60ch' }}>
				<Typography level="h4">What is dmap?</Typography>
				<p>
					dmap is 32 lines of Solidity assembly deployed as a contract on
					Ethereum.
				</p>
				<p>
					It is an ultra-minimal name registry with supporting tools to empower
					users and developers.
				</p>
			</section>
			<Divider />
			<section style={{ maxWidth: '60ch' }}>
				<Typography level="h4">Why use dmap?</Typography>
				<p>
					If users have to trust web2 infrastructure in order to use dapps, this
					can be insecure, brittle, and renders many web3 benefits moot.
				</p>
				<p>
					For developers, <C>npm i @myproject/contracts</C> is not trivially
					verifiable.
				</p>
				<p>
					Solving the missing secure link between users and contracts is a
					cultural problem first and a technical problem second.
				</p>
				<p>
					dmap offers a solution to the problem; to secure the software supply
					chain with small programs and minimal specs.
				</p>
			</section>
			<Divider />
			<section style={{ maxWidth: '60ch' }}>
				<Typography level="h4">How does it work?</Typography>
				<p>The dmap contract is a key-value store with simple rules.</p>
				<p>
					All names are defined on this contract's storage slots, but it is
					multi-dimensional and completely user-configurable.
				</p>
				<Typography level="h5">Path traversal</Typography>
				<p>
					A format called{' '}
					<Link to="https://docs.dmap.name/dpath" target="_blank">
						dpath
					</Link>{' '}
					is used to resolve these names to values.
				</p>
				<p>
					Example dpath: <C>:foo:bar.baz.qux</C>
				</p>
				<p>
					<C>:foo:bar</C> will always resolve to the same value, but from there{' '}
					<C>.baz.qux</C> could change.
				</p>
				<Typography level="h5">Storage</Typography>
				<p>
					dmap provides two storage slots for each key: <C>meta</C> and{' '}
					<C>data</C>.
				</p>
				<p>
					dmap defines one core flag set on the <C>meta</C> slot: <C>locked</C>.
					Once this is set for a key, it can no longer be changed; this is what{' '}
					<C>:</C> represents in dpaths.
				</p>
				<p>
					Other than the <C>locked</C> flag, any data or flags can be set. A
					common use-case is storing an IPFS CID; a format called{' '}
					<Link to="https://docs.dmap.name/dpack" target="_blank">
						dpack
					</Link>{' '}
					can be used to distribute contract artifacts in this way. The{' '}
					<C>data</C> slot can also be used to define a zone (user-configurable
					registry).
				</p>
				<Typography level="h5">Learn more</Typography>
				<p>
					Detailed information can be found in the{' '}
					<Link to="https://docs.dmap.name" target="_blank">
						docs
					</Link>
					.
				</p>
			</section>
			<Divider />
		</Stack>
	)
}

const C: FC<PropsWithChildren> = ({ children }) => (
	<Chip sx={{ fontFamily: 'monospace' }}>{children}</Chip>
)
