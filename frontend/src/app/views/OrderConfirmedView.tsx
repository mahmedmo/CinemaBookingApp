import { DateTimeFormatter, LocalDateTime } from "@js-joda/core";
import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Receipt } from "../../types/Receipt";

export default function OrderConfirmedView() {
	const location = useLocation();
	const navigate = useNavigate();
	const { receipts, seatNumbers } = location.state || {};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		if (!receipts || receipts.length === 0 || !seatNumbers) {
			navigate("/", { replace: true });
		}
	}, [receipts, seatNumbers, navigate]);

	if (!receipts || receipts.length === 0 || !seatNumbers) {
		return null;
	}
	const formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm:ss");
	return (
		<div className="flex items-center justify-center h-screen bg-black">
			<div className="text-center p-6 bg-black rounded-lg shadow-lg">
				<h1 className="text-6xl font-bold mb-4 text-white">Order Confirmed!</h1>
				<h2 className="text-2xl mb-6 text-white">Thank you for your order!</h2>
				<p className="text-lg mb-6 text-dark4">Here are your ticket details:</p>
				<div className="text-left">
					{receipts.map((receipt: Receipt, index: number) => (
						<div
							key={index}
							className="mb-4 p-4 bg-dark2 rounded-lg shadow-md text-white"
						>
							<p>
								<strong>Ticket No:</strong> {receipt.ticketId}
							</p>
							<p>
								<strong>Seat No:</strong> {seatNumbers[index]}
							</p>
							<p>
								<strong>Ticket Cost:</strong> ${receipt.cost.toFixed(2)}
							</p>
							<p>
								<strong>Purchase Date:</strong>{" "}
								{LocalDateTime.parse(receipt.datePlaced.toString()).format(
									formatter
								)}
							</p>
						</div>
					))}
				</div>
				<Link
					to="/"
					className="mt-6 inline-block px-4 py-2 bg-[#e50914] text-white rounded-md text-lg font-semibold hover:bg-red-700"
				>
					Go Back Home
				</Link>
			</div>
		</div>
	);
}
