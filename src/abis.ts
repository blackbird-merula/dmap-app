export const dmapAbi = [
	{
		inputs: [
			{
				internalType: 'contract RootZone',
				name: 'rootzone',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		inputs: [],
		name: 'LOCKED',
		type: 'error',
	},
	{
		anonymous: true,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'zone',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'name',
				type: 'bytes32',
			},
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'meta',
				type: 'bytes32',
			},
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'data',
				type: 'bytes32',
			},
		],
		name: 'Set',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'slot',
				type: 'bytes32',
			},
		],
		name: 'get',
		outputs: [
			{
				internalType: 'bytes32',
				name: 'meta',
				type: 'bytes32',
			},
			{
				internalType: 'bytes32',
				name: 'data',
				type: 'bytes32',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'name',
				type: 'bytes32',
			},
			{
				internalType: 'bytes32',
				name: 'meta',
				type: 'bytes32',
			},
			{
				internalType: 'bytes32',
				name: 'data',
				type: 'bytes32',
			},
		],
		name: 'set',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
] as const

export const freeZoneAbi = [
	{
		inputs: [
			{
				internalType: 'contract Dmap',
				name: 'd',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'giver',
				type: 'address',
			},
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'zone',
				type: 'bytes32',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'recipient',
				type: 'address',
			},
		],
		name: 'Give',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		name: 'controllers',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'dmap',
		outputs: [
			{
				internalType: 'contract Dmap',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'key',
				type: 'bytes32',
			},
			{
				internalType: 'address',
				name: 'recipient',
				type: 'address',
			},
		],
		name: 'give',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'last',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'key',
				type: 'bytes32',
			},
			{
				internalType: 'bytes32',
				name: 'meta',
				type: 'bytes32',
			},
			{
				internalType: 'bytes32',
				name: 'data',
				type: 'bytes32',
			},
		],
		name: 'set',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'key',
				type: 'bytes32',
			},
		],
		name: 'take',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
] as const

export const rootZoneAbi = [
	{
		inputs: [
			{
				internalType: 'contract Dmap',
				name: 'd',
				type: 'address',
			},
		],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		inputs: [],
		name: 'ErrExpired',
		type: 'error',
	},
	{
		inputs: [],
		name: 'ErrPayment',
		type: 'error',
	},
	{
		inputs: [],
		name: 'ErrPending',
		type: 'error',
	},
	{
		inputs: [],
		name: 'ErrReceipt',
		type: 'error',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'name',
				type: 'bytes32',
			},
			{
				indexed: true,
				internalType: 'address',
				name: 'zone',
				type: 'address',
			},
		],
		name: 'Etch',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'bytes32',
				name: 'mark',
				type: 'bytes32',
			},
		],
		name: 'Hark',
		type: 'event',
	},
	{
		inputs: [],
		name: 'dmap',
		outputs: [
			{
				internalType: 'contract Dmap',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'salt',
				type: 'bytes32',
			},
			{
				internalType: 'bytes32',
				name: 'name',
				type: 'bytes32',
			},
			{
				internalType: 'address',
				name: 'zone',
				type: 'address',
			},
		],
		name: 'etch',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'bytes32',
				name: 'hash',
				type: 'bytes32',
			},
		],
		name: 'hark',
		outputs: [],
		stateMutability: 'payable',
		type: 'function',
	},
	{
		inputs: [],
		name: 'last',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'mark',
		outputs: [
			{
				internalType: 'bytes32',
				name: '',
				type: 'bytes32',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
] as const
