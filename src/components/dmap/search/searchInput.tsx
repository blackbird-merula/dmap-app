import {
	SearchRounded,
	SentimentVeryDissatisfiedRounded,
} from '@mui/icons-material'
import { CircularProgress, Input, Stack } from '@mui/joy'
import { type FC, useState } from 'react'
import { useTraceQuery } from '../../../hooks/useTraceQuery'
import { useTyping } from '../../../hooks/useTyping'
import { useSearch } from '../context'

export const SearchInput: FC = () => {
	const [focus, setFocus] = useState(false)
	const [search, setSearch] = useSearch()
	const traceQuery = useTraceQuery({ enabled: false })

	const placeholder = useTyping([
		'free.bird',
		'pack:rico.latest',
		'app:aave:v2',
		'npm:wagmi.latest',
		'hdmap.timdaub',
	])

	return (
		<Input
			autoFocus
			value={search ?? ''}
			placeholder={placeholder}
			onChange={(event) => {
				const input = event.target.value
				if (!input) {
					setSearch('')
					return
				}
				setSearch(input)
			}}
			autoComplete="off"
			name="path"
			size="lg"
			sx={{
				minWidth: {
					sm: '56ch',
				},
				'.MuiInput-startDecorator': {
					marginRight: 0.25,
				},
				'--Input-focused': '1',
				'--Input-focusedThickness': focus ? '5px' : '2px',
				transition: '--Input-focusedHighlight .25s',
			}}
			startDecorator={
				<Stack
					direction="row"
					gap={1}
					alignItems="center"
					sx={{
						'.prefix': {
							color: '#aaa',
							userSelect: 'none',
						},
					}}
				>
					{traceQuery.isError ? (
						<SentimentVeryDissatisfiedRounded color="error" />
					) : traceQuery.isFetching ? (
						<CircularProgress
							size="sm"
							sx={{ '--CircularProgress-size': '20px' }}
						/>
					) : (
						<SearchRounded
							color={
								traceQuery.data && traceQuery.isFetched ? 'success' : 'primary'
							}
						/>
					)}
					<span className="prefix">dmap://</span>
				</Stack>
			}
			fullWidth
			onFocus={() => setFocus(true)}
			onBlur={() => setFocus(false)}
			color={
				traceQuery.error ? 'danger' : traceQuery.data ? 'success' : 'primary'
			}
		/>
	)
}
