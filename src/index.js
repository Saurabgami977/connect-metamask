import React from "react";
import ReactDOM from "react-dom/client";

//
import { BrowserRouter } from "react-router-dom";
import { MetaMaskProvider } from "metamask-react";

//
import App from "./App";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<MetaMaskProvider>
				<App />
			</MetaMaskProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
