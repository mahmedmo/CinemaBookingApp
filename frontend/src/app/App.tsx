import React, { useRef, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import LoadingBar, { LoadingBarRef } from "react-top-loading-bar";

import { RegisterView } from "./views/RegisterView";
import { SplashView } from "./views/SplashView";
import { BrowseView } from "./views/BrowseView";
import Header from "../features/header/components/Header";
import MyTicketsView from "./views/MyTicketsView";
import BookTicketView from "./views/BookTicketView";
import { PaymentView } from "./views/PaymentView";
import { LoginView } from "./views/LoginView";
import Footer from "../features/footer/components/Footer";
import { NotFoundView } from "./views/NotFoundView";
import OrderConfirmedView from "./views/OrderConfirmedView";
import LoginSuccessView from "./views/LoginSuccessView";
import RegisterSucessView from "./views/RegisterSuccessView";
import { UserProvider } from "./UserContext";

const AppContent: React.FC = () => {
	const ref = useRef<LoadingBarRef>(null);
	const location = useLocation();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		ref.current?.continuousStart();
		setLoading(true);
		const timeout = setTimeout(() => {
			ref.current?.complete();
			setLoading(false);
		}, 250);

		return () => clearTimeout(timeout);
	}, [location]);

	return (
		<>
			<LoadingBar color="#e50914" ref={ref} height={3} />
			{!loading ? (
				<>
					<Header />
					<Routes>
						<Route path="/" element={<SplashView />} />
						<Route path="/register" element={<RegisterView />} />
						<Route path="/login" element={<LoginView />} />
						<Route path="/login-success" element={<LoginSuccessView />} />
						<Route path="/register-success" element={<RegisterSucessView />} />
						<Route path="/browse" element={<BrowseView />} />
						<Route path="/my-tickets" element={<MyTicketsView />} />
						<Route path="/book-ticket" element={<BookTicketView />} />
						<Route path="/payment" element={<PaymentView />} />
						<Route path="/order-confirmed" element={<OrderConfirmedView />} />
						<Route path="*" element={<NotFoundView />} />
					</Routes>
					<Footer />
				</>
			) : (
				<div className={"w-screen h-screen"} />
			)}
		</>
	);
};

function App() {
	return (
		<div
			className="App"
			style={{ backgroundColor: "#000000", overflow: "hidden" }}
		>
			<BrowserRouter>
				<UserProvider>
					<AppContent />
				</UserProvider>
			</BrowserRouter>
		</div>
	);
}

export default App;
