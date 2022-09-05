import React, { useEffect, useState } from "react";

import networks from "./networks";
import { ethers } from "ethers";

const data = {
	address: "0x210285B0c985C7cAeb145AAcF852dd8FA5B3ba34",
	balance: "$ 20",
	chain: "Ethereum",
};

const Wallet = () => {
	const [tooltip, setTooltip] = useState(false);
	const [errorMessage, setErrorMessage] = useState(null);
	const [account, setAccount] = useState(null);
	const [balance, setBalance] = useState(null);

	// Copy address onClick of button
	const copyAddress = () => {
		navigator.clipboard.writeText(data.address);
		setTooltip(true);
		setTimeout(() => {
			setTooltip(false);
		}, 2000);
	};

	if (errorMessage) {
		alert(errorMessage);
	}

	useEffect(() => {
		if (window.ethereum) {
			window.ethereum.on("accountsChanged", accountsChanged);
			window.ethereum.on("chainChanged", chainChanged);
		}
	}, [account]);

	const connectHandler = async () => {
		if (window.ethereum) {
			try {
				const res = await window.ethereum.request({
					method: "eth_requestAccounts",
				});
				await accountsChanged(res[0]);
				console.log(res);
			} catch (err) {
				console.error(err);
				setErrorMessage("There was a problem connecting to MetaMask");
			}
		} else {
			setErrorMessage("Install MetaMask");
		}
	};

	const accountsChanged = async (newAccount) => {
		setAccount(newAccount);
		try {
			const balance = await window.ethereum.request({
				method: "eth_getBalance",
				params: [newAccount.toString(), "latest"],
			});
			setBalance(ethers.utils.formatEther(balance));
		} catch (err) {
			console.error(err);
			setErrorMessage("There was a problem connecting to MetaMask");
		}
	};

	const chainChanged = () => {
		setErrorMessage(null);
		setAccount(null);
		setBalance(null);
	};

	return (
		<div className="shadow-2xl bg-white text-black p-6  border rounded-lg border-gray-200  flex justify-between items-center flex-col">
			{!account ? (
				// Connect Wallet button if
				<button
					onClick={() => connectHandler()}
					className="gradient text-white text-xl px-4 py-2 rounded-full hover:transform transition hover:scale-105 duration-300 ease-in-out"
				>
					Connect Wallet
				</button>
			) : (
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
							{account?.slice(0, 20) + "..." + account?.slice(38, 42)}

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
							{balance} {balance ? "ETH" : null}
						</h1>
					</div>

					{/* ========Action Buttons======== */}
					<div className="flex justify-between mt-3 w-full">
						<div
							id="chain"
							className="flex  py-2 px-4 bg-gray-200 rounded-full items-center"
						>
							<h1 className="bold text-sm">{data.chain}</h1>
							<div className="bg-green-500 w-3 rounded-full h-3 ml-1"></div>
						</div>

						{/* ========Button to Disconnect======== */}
						<button className=" gradient text-white text-xl px-4 py-2 rounded-full hover:transform transition hover:scale-105 duration-300 ease-in-out">
							Disconnect
						</button>
					</div>

					{/* Switch Networks */}
					<button
						onClick={connectHandler}
						className="mt-3  text-black border border-gray-500 text-xl px-4 py-2 rounded-full hover:transform transition hover:scale-105 duration-300 ease-in-out"
					>
						Switch to Polygon
					</button>
					<button
						onClick={connectHandler}
						className="mt-3  text-black border border-gray-500 text-xl px-4 py-2 rounded-full hover:transform transition hover:scale-105 duration-300 ease-in-out"
					>
						Switch to BSC
					</button>
				</>
			)}
		</div>
	);
};

export default Wallet;
