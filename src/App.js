import React from "react";

// Packages
import { Route, Routes } from "react-router-dom";

// Layouts
import UserLayout from "./Layout/User";

// Components
import Home from "./pages/Home";

function App() {
	return (
		<Routes>
			{/* User Facing Unprotected Routes */}
			<Route path="/" element={<UserLayout />}>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<Home />} />
				<Route path="/contact" element={<Home />} />
			</Route>

			{/* Protected Route */}

			{/* Admin Route */}
		</Routes>
	);
}

export default App;
