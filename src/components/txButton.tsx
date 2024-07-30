import { DoneRounded, ErrorRounded } from '@mui/icons-material'
import {
	Button,
	type ButtonProps,
	CircularProgress,
	FormControl,
	FormHelperText,
	Stack,
} from '@mui/joy'
import type { Abi, AbiStateMutability } from 'abitype'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { ContractFunctionArgs, ContractFunctionName } from 'viem'
import type { WriteContractFunctionParameters } from 'viem/experimental'
import {
	type BaseError,
	useWaitForTransactionReceipt,
	useWriteContract,
} from 'wagmi'

export function TxButton<
	abi extends Abi | readonly unknown[] = Abi,
	mutability extends AbiStateMutability = AbiStateMutability,
	functionName extends ContractFunctionName<
		abi,
		mutability
	> = ContractFunctionName<abi, mutability>,
	args extends ContractFunctionArgs<
		abi,
		mutability,
		functionName
	> = ContractFunctionArgs<abi, mutability, functionName>,
>({
	children,
	disabled,
	params,
	onSuccess,
	...props
}: Omit<ButtonProps, 'onClick'> & {
	params?: WriteContractFunctionParameters<abi, mutability, functionName, args>
	onSuccess?(): Promise<void>
}) {
	const { data: hash, error, isPending, writeContract } = useWriteContract()

	const { isLoading, isSuccess } = useWaitForTransactionReceipt({
		hash,
	})

	useEffect(() => {
		if (isSuccess && onSuccess) {
			onSuccess().catch(console.error)
		}
	}, [isSuccess, onSuccess])

	return (
		<FormControl error={!!error}>
			<Button
				{...props}
				disabled={disabled || isLoading || isPending || !params}
				onClick={() =>
					writeContract(params! as Parameters<typeof writeContract>[0])
				}
			>
				{children}
			</Button>
			<FormHelperText>
				<Stack direction="row" gap={0.6}>
					{error ? (
						<ErrorRounded />
					) : isPending || isLoading ? (
						<CircularProgress
							size="sm"
							sx={{ '--CircularProgress-size': '18px' }}
						/>
					) : isSuccess ? (
						<DoneRounded />
					) : null}
					{isPending && 'Pending...'}
					{isLoading && 'Waiting for confirmation...'}
					{isSuccess && 'Transaction confirmed'}
					{error && ((error as BaseError).shortMessage ?? error.message)}
					&nbsp;
				</Stack>
			</FormHelperText>
			<FormHelperText>
				{hash ? (
					<Link to={`https://etherscan.io/tx/${hash}`} target="_blank">
						<Stack direction="row" gap={0.3}>
							<img
								src="/ethereum.svg"
								width="20"
								height="20"
								alt="Transaction"
							/>{' '}
							View transaction
						</Stack>
					</Link>
				) : (
					<>&nbsp;</>
				)}
			</FormHelperText>
		</FormControl>
	)
}
