import { walk } from '@dsuite/dmap'
import { unpackCID } from '@dsuite/dpack/cid'
import { type UseQueryOptions, useQuery } from '@tanstack/react-query'
import { useDebounceValue } from 'usehooks-ts'
import { toHex } from 'viem'
import { useSearch } from '../components/dmap/context'
import { useConfig } from '../context/config'
import type { Trace } from '../types'

export const useTraceQuery = (
	queryOptions?: Partial<UseQueryOptions<Trace | null>>,
) => {
	const [search] = useSearch()
	const [debouncedInput] = useDebounceValue(search, 250)
	const config = useConfig()

	return useQuery({
		queryKey: ['trace', debouncedInput],
		queryFn: async () => {
			if (!debouncedInput) return null

			return walk(config, debouncedInput, { trace: true }).then((entries) => {
				const last = entries.at(-1)

				// TODO maybe just return zero everything
				if (!last) return null

				const { zone, locked, name, meta, data } = last
				let cid: string | undefined = undefined
				try {
					cid = unpackCID(meta, data)?.toV1().toString()
				} catch {}
				const zoneKey = toHex(name, { size: 32 })
				const dpath = debouncedInput // TODO: prefix with : if no ./: at start
				return {
					entries,
					dpath,
					zone,
					zoneKey,
					meta,
					data,
					cid,
					locked,
				}
			})
		},
		retry: false,
		...queryOptions,
	})
}
