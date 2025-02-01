import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function RegisterSucessView() {
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		if (!location.state || !location.state.accessGranted) {
			navigate("/");
		}
	}, [location.state, navigate]);
	if (!location.state || !location.state.accessGranted) {
		return null;
	}
	return (
		<div
			className="flex items-center justify-center h-screen"
			style={{ userSelect: "none" }}
		>
			<div className="text-center relative bottom-[8%]">
				<h1 className="text-6xl font-bold mb-4">Registration Success!</h1>
				<h2 className="text-2xl mb-6">You have successfuly become a member!</h2>
				<p className="mb-6 text-lg">
					You may now have access to our various member benefits
				</p>
				<Link
					to="/browse"
					className="px-4 py-2 bg-[#e50914] text-white rounded-md text-lg font-semibold hover:bg-red-700"
				>
					Explore
				</Link>
			</div>
		</div>
	);
}
