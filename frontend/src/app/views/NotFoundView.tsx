import React from "react";
import { Link } from "react-router-dom";

export function NotFoundView() {
	return (
		<div
			className="flex items-center justify-center h-screen"
			style={{ userSelect: "none" }}
		>
			<div className="text-center relative bottom-[8%]">
				<h1 className="text-6xl font-bold mb-4">404</h1>
				<h2 className="text-2xl mb-6">Page Not Found</h2>
				<p className="mb-6 text-lg">
					Oops! The page you're looking for doesn't exist.
				</p>
				<Link
					to="/"
					className="px-4 py-2 bg-[#e50914] text-white rounded-md text-lg font-semibold hover:bg-red-700"
				>
					Go Back Home
				</Link>
			</div>
		</div>
	);
}
