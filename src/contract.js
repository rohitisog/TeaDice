export const contractAddress = "0x52619a44887a9370Acdce3BDee82122320550200";
// export const contractAddress = "0x7F4f1f89B7A1481b6aBC37df2D725C24D6d5c3cC";
export const abi =[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "player",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "diceResult",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newScore",
				"type": "uint256"
			}
		],
		"name": "DiceRolled",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "rollDice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPlayers",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_player",
				"type": "address"
			}
		],
		"name": "getUserScore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "players",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "scores",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]










// export const abi = [
//     {
//       anonymous: false,
//       inputs: [
//         {
//           indexed: true,
//           internalType: "address",
//           name: "player",
//           type: "address",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "diceResult",
//           type: "uint256",
//         },
//         {
//           indexed: false,
//           internalType: "uint256",
//           name: "newScore",
//           type: "uint256",
//         },
//       ],
//       name: "DiceRolled",
//       type: "event",
//     },
//     {
//       inputs: [],
//       name: "rollDice",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "nonpayable",
//       type: "function",
//     },
//     {
//       inputs: [],
//       name: "getPlayers",
//       outputs: [
//         {
//           internalType: "address[]",
//           name: "",
//           type: "address[]",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "_player",
//           type: "address",
//         },
//       ],
//       name: "getUserScore",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       name: "players",
//       outputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//     {
//       inputs: [
//         {
//           internalType: "address",
//           name: "",
//           type: "address",
//         },
//       ],
//       name: "scores",
//       outputs: [
//         {
//           internalType: "uint256",
//           name: "",
//           type: "uint256",
//         },
//       ],
//       stateMutability: "view",
//       type: "function",
//     },
//   ];