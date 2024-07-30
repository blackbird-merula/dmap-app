// import type { Config } from '@dsuite/core/types'
import { SaveRounded } from '@mui/icons-material'
import {
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Modal,
	ModalClose,
	ModalDialog,
	Stack,
	Typography,
} from '@mui/joy'
import { ConnectKitButton } from 'connectkit'
import { type FC, useContext, useState } from 'react'
import { useClient } from 'wagmi'
import { configContext, initialConfig } from '../context/config'
import {
	type UseValidatedInput,
	useAddressInput,
	useUrlInput,
} from '../hooks/inputs'

// TODO fix types
function ConfigItem<Input, Value>({
	name,
	label,
	useValidatedInput,
}: {
	name: string
	label: string
	useValidatedInput: UseValidatedInput<Input, Value>
}) {
	const [config, setConfig] = useContext(configContext)
	const [input, setInput] = useValidatedInput(
		config[name as keyof typeof config] as Value,
	)
	return (
		<FormControl error={!!input.error}>
			<FormLabel>{label}</FormLabel>
			<Stack direction="row" gap={1}>
				<Input
					sx={{ minWidth: '44ch' }}
					type="text"
					defaultValue={config[name as never]}
					onChange={(event) => setInput(event.target.value as Input)}
				/>
				<Button
					disabled={config[name as never] === input.value}
					onClick={() => {
						if (input.value) {
							setConfig((c) => ({ ...c, [name]: input.value }))
						}
					}}
				>
					<SaveRounded />
				</Button>
			</Stack>
			<FormHelperText>{input.error}</FormHelperText>
		</FormControl>
	)
}

export const Settings: FC = () => {
	const [, setConfig] = useContext(configContext)
	const [modalOpen, setModalOpen] = useState(false)
	const client = useClient()

	return (
		<Stack direction="row" gap={1}>
			<Button
				color="neutral"
				variant="soft"
				onClick={() => setModalOpen((s) => !s)}
			>
				Settings
			</Button>
			<Modal open={modalOpen} onClose={() => setModalOpen(false)}>
				<ModalDialog>
					<ModalClose />
					<Typography level="h4">Settings</Typography>
					<Stack gap={2}>
						<Button
							onClick={() =>
								client?.request({
									// @ts-ignore
									method: 'evm_mine',
								})
							}
						>
							(dev) Mine block
						</Button>
						<ConfigItem
							name="dmap"
							label="dmap contract"
							useValidatedInput={useAddressInput}
						/>
						<ConfigItem
							name="root"
							label="RootZone contract"
							useValidatedInput={useAddressInput}
						/>
						<ConfigItem
							name="free"
							label="FreeZone contract"
							useValidatedInput={useAddressInput}
						/>
						<ConfigItem
							name="rpc"
							label="RPC endpoint"
							useValidatedInput={useUrlInput}
						/>
						<ConfigItem
							name="ipfsNode"
							label="IPFS node"
							useValidatedInput={useUrlInput}
						/>
						<Button onClick={() => setConfig(initialConfig as never)}>
							Reset to defaults
						</Button>
					</Stack>
				</ModalDialog>
			</Modal>
			<ConnectKitButton label="Connect" />
		</Stack>
	)
}
