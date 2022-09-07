import React from "react";

//
import { Outlet } from "react-router-dom";

//
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToTop from "../ScrollToTop";

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
			<ScrollToTop />
			{/* Header */}
			<Navbar />

			{/*  Nested Components or Paths*/}
			<Outlet />

			{/* Footer */}
			<Footer />
		</BaseLayout>
	);
};

export default User;
