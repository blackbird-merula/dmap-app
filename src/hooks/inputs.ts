import { CID } from 'multiformats/cid'
import { type Dispatch, type SetStateAction, useState } from 'react'
import { type Address, type Hex, getAddress, isAddress, isHex } from 'viem'

type ValidateReturnValue<Value> =
	| { input: string; value: undefined; error: undefined } // initial state
	| { input: string; value: Value; error: undefined } // valid
	| { input: string; value: undefined; error: string } // error

type Validate<Input, Value> = (input?: Input) => ValidateReturnValue<Value>

type UseValidatedInputReturnValue<Input, Value> = [
	ValidateReturnValue<Value>,
	Dispatch<SetStateAction<Input>>,
]

export type UseValidatedInput<Input, Value> = (
	defaultValue?: Value,
) => UseValidatedInputReturnValue<Input, Value>

const useValidatedInput = <Input, Value>(
	validate: Validate<Input, Value>,
	defaultValue?: Input,
): UseValidatedInputReturnValue<Input, Value> => {
	const [input, setInput] = useState<Input | undefined>(defaultValue)
	const validated = validate(input)
	return [validated, setInput] as UseValidatedInputReturnValue<Input, Value>
}

export const useAddressInput: UseValidatedInput<string, Address> = (
	defaultValue,
) =>
	useValidatedInput<string, Address>(
		(input = '') =>
			input.length === 0
				? { input }
				: isAddress(input)
					? { value: getAddress(input), input }
					: { input, error: 'Invalid address' },
		defaultValue,
	)

export const useHexInput = (
	size = 32,
	_dir: 'left' | 'right' = 'left',
	defaultValue?: Hex,
) =>
	useValidatedInput<string, Hex>((input = '') => {
		if (input.length === 0) {
			return { input }
		}
		if (isHex(input)) {
			try {
				// todo may not want to pad it, can break during input
				// const value = padHex(input, { dir, size })
				if (input.length === 2 + size * 2) {
					return { input, value: input }
				}
			} catch (error) {
				return { input, error: (error as Error).message }
			}
		}
		return { input, error: `Invalid ${size}-byte hex value` }
	}, defaultValue)

export const useCidV1Input = (defaultValue?: string) =>
	useValidatedInput<string, string>((input = '') => {
		if (input.length === 0) {
			return { input }
		}
		try {
			const cid = CID.parse(input)
			if (cid.multihash.size <= 32) {
				return { input, value: cid.toString() }
			}
			return { input, error: 'Hash exceeds 256 bits' }
		} catch (error) {}
		return { input, error: 'Invalid CID' }
	}, defaultValue)

export const useUrlInput = () =>
	useValidatedInput<string, string>((input = '') => {
		if (input.length === 0) {
			return { input }
		}
		try {
			new URL(input)
			return { input, value: input, error: undefined }
		} catch (error) {}
		return { input, error: 'Invalid URL' }
	})
