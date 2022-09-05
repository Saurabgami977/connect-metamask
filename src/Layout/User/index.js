import React from "react";

//
import { Outlet } from "react-router-dom";

//
import Navbar from "../Navbar";

// Gives Base styles for each layout
const BaseLayout = ({ children }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100%",
				overflow: "hidden",
			}}
		>
			{children}
		</div>
	);
};

const User = () => {
	return (
		<BaseLayout>
			{/* Header */}
			<Navbar />

			{/*  Nested Components or Paths*/}
			<Outlet />

			{/* Footer */}
		</BaseLayout>
	);
};

export default User;
