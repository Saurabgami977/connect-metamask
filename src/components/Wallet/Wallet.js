import React, { useEffect, useState } from "react";

//
import networks from "./networks";
import Loader from "../Loader";
//
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";

const Wallet = () => {
	const [tooltip, setTooltip] = useState(false);
	const [accountBalance, setAccountBalance] = useState();
	const { status, connect, account, switchChain, chainId } = useMetaMask();

	// Connect on button click
	const connectHandler = async () => {
		connect();
		// Do something Here
	};

	// function to get balance of the current account
	const getBalance = async (account) => {
		try {
			const balance = await window.ethereum.request({
				method: "eth_getBalance",
				params: [account, "latest"],
			});
			setAccountBalance(ethers.utils.formatEther(balance));
		} catch (err) {
			alert(err);
		}
	};

	useEffect(() => {
		// After account is rendered run getBalance function
		account && getBalance(account);
	}, [account]);

	// Copy address onClick of button
	const copyAddress = () => {
		navigator.clipboard.writeText(account);
		setTooltip(true);
		setTimeout(() => {
			setTooltip(false);
		}, 2000);
	};

	return (
		<div className="shadow-2xl bg-white text-black p-6 border rounded-lg border-gray-200  flex justify-between items-center flex-col">
			{/* When Initializing */}
			{status === "initializing" && (
				<>
					<Loader />
					Initializing...
				</>
			)}

			{/* When Metamask is not available */}
			{status === "unavailable" && (
				<div>Please install Metamask to connect</div>
			)}

			{/* If Wallet is not connected */}
			{status === "notConnected" && (
				<button
					onClick={() => connectHandler()}
					className="gradient text-white text-xl px-4 py-2 rounded-full hover:transform transition hover:scale-105 duration-300 ease-in-out"
				>
					Connect Wallet
				</button>
			)}

			{/* When user clicks Connect and account is in the process of connection */}
			{status === "connecting" && (
				<>
					<Loader />
					Connecting...
				</>
			)}

			{/* When account is connected */}
			{status === "connected" && (
				<>
					<h1 className="bold text-gray-400 text-5xl border-b border-gray-700">
						Wallet
					</h1>
					{/* =======Address======= */}
					<div
						id="address"
						className="flex items-center flex-col justify-center mt-3"
					>
						<h1 className="bold ">Address</h1>
						<h1 className="text-center p-2 rounded-md bg-gray-100 flex items-center cursor-pointer relative">
							{/* ========Address Value======== */}
							{account.slice(0, 20) + "..." + account.slice(38, 42)}

							{/* ========SVG========*/}
							<svg
								className="h-8 w-8 text-gray-900"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								strokeWidth="2"
								stroke="currentColor"
								fill="none"
								strokeLinecap="round"
								strokeLinejoin="round"
								onClick={() => copyAddress()}
							>
								<path stroke="none" d="M0 0h24v24H0z" />
								<rect x="8" y="8" width="12" height="12" rx="2" />
								<path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
							</svg>

							{/* ========Tooltip to show "COPIED" after copying======== */}
							<div
								className={
									(tooltip ? "" : "hidden ") +
									"bg-white absolute border-0 z-50 font-normal  text-sm  rounded-lg right-5"
								}
							>
								<div
									className={
										"bg-black text-white opacity-75 font-semibold p-3 mb-0 border-b border-solid border-slate-100 uppercase rounded-lg"
									}
								>
									Copied
								</div>
							</div>
						</h1>
					</div>

					{/* ========Balance======== */}
					<div className="mt-3">
						<h1 className="bold  w-max m-auto ">Balance</h1>
						<h1 className="flex items-center cursor-pointer text-6xl text-gray-500">
							{accountBalance}
							{chainId === "0x1" ? "ETH" : "Matic"}
						</h1>
					</div>

					{/* ========Status======== */}
					<div className="mt-3">
						<div
							id="chain"
							className="flex  py-2 px-4 bg-gray-200 rounded-full items-center"
						>
							{/* Network chain name */}
							<h1 className="bold text-sm">
								{chainId === "0x1"
									? networks.ethereum.chainName
									: chainId === "0x89"
									? networks.polygon.chainName
									: "Network not identified"}
							</h1>

							{/* Online status */}
							<div className="bg-green-500 w-3 rounded-full h-3 ml-1"></div>
						</div>
					</div>

					{/* Switch Networks */}
					<button
						onClick={() =>
							switchChain(
								chainId === "0x1"
									? networks.polygon.chainId
									: networks.ethereum.chainId,
							)
						}
						className="mt-3  text-black border border-gray-500 text-xl px-4 py-2 rounded-full hover:transform transition hover:scale-105 duration-300 ease-in-out"
					>
						Switch to {`${chainId === "0x1" ? "Polygon" : "Ethereum"}`}
					</button>
				</>
			)}
		</div>
	);
};

export default Wallet;
