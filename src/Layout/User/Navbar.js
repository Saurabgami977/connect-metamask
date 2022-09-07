import React, { useEffect, useState } from "react";

//
import { Link } from "react-router-dom";

// Navigation items
const navigation = [
	{ name: "Home", to: "/" },
	{ name: "About us", to: "/about" },
	{ name: "Contact", to: "/contact" },
];

const Navbar = () => {
	const [scrolled, setScrolled] = useState(); // True or False

	useEffect(() => {
		// Changes states when scrolled so we can apply different classes on navbar
		window.onscroll = () => setScrolled(window.pageYOffset > 10);
	}, []);

	return (
		<nav
			id="header"
			className={`fixed w-full z-30 top-0 text-white shadow-2xl px-2 ${
				scrolled ? "bg-white" : "gradient"
			}`}
		>
			{/* Navbar content */}
			<div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
				{/* LOGO */}
				<div className="pl-4 flex items-center">
					<Link
						className={`toggleColour  no-underline hover:no-underline font-bold text-4xl ${
							scrolled ? "text-gray-800" : "text-white"
						} `}
						to="/"
					>
						YOUR NFT
					</Link>
				</div>

				{/* NAVIGATION */}
				<div
					className="flex-grow flex items-center justify-center w-auto mt-2 bg-white bg-transparent text-black p-0 z-20"
					id="nav-content"
				>
					{/* Main Navigation */}
					<ul className="list-reset flex justify-end flex-1 items-center">
						{/* Mapping nav items array */}
						{navigation.map((item) => (
							<li className="mr-3" key={item.name}>
								<Link
									className="inline-block text-skin-inverted no-underline hover:text-gray-800 hover:text-underline py-2 px-4"
									to={item.to}
								>
									{item.name}
								</Link>
							</li>
						))}
					</ul>

					{/* Connect Wallet Action Button*/}
					<button
						id="navAction"
						className={` mx-0 hover:underline  font-bold rounded-full mt-0 py-4 px-8 shadow opacity-75 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out ${
							scrolled ? `gradient text-white ` : `bg-white text-gray-800`
						} `}
					>
						Connect Wallet
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
