const networks = {
	polygon: {
		chainId: `0x${Number(137).toString(16)}`,
		chainName: "Polygon Mainnet",
		nativeCurrency: {
			name: "MATIC",
			symbol: "MATIC",
			decimals: 18,
		},
		rpcUrls: ["https://polygon-rpc.com/"],
		blockExplorerUrls: ["https://polygonscan.com/"],
	},
	ethereum: {
		chainId: `0x${Number(1).toString(16)}`,
		chainName: "Ethereum Mainnet",
		nativeCurrency: {
			name: "Ether",
			symbol: "ETH",
			decimals: 18,
		},
		rpcUrls: ["https://api.mycryptoapi.com/eth", "https://cloudflare-eth.com"],
		blockExplorerUrls: ["https://etherscan.io"],
	},
};
export default networks;
