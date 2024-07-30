import {
	type Dispatch,
	type ReactNode,
	type SetStateAction,
	createContext,
	createElement,
	useContext,
	useState,
} from 'react'

// Via https://github.com/streamich/react-use/blob/master/src/factory/createStateContext.ts
export const createStateContext = <T>(defaultInitialValue: T) => {
	const context = createContext<[T, Dispatch<SetStateAction<T>>] | undefined>(
		undefined,
	)
	// biome-ignore lint/suspicious/noExplicitAny: inherited from lib
	const providerFactory = (props: any, children: any) =>
		createElement(context.Provider, props, children)

	const StateProvider = ({
		children,
		initialValue,
	}: {
		children?: ReactNode
		initialValue?: T
	}) => {
		const state = useState<T>(
			initialValue !== undefined ? initialValue : defaultInitialValue,
		)
		return providerFactory({ value: state }, children)
	}

	const useStateContext = () => {
		const state = useContext(context)
		if (state == null) {
			throw new Error('useStateContext must be used inside a StateProvider.')
		}
		return state
	}

	return [useStateContext, StateProvider, context] as const
}
