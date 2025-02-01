import React, { useEffect, useState } from "react";
import TicketSearchBar from "./TicketSearchBar";
import {
	faCircleXmark,
	faFaceSadTear,
	faExclamationTriangle,
	faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TicketService } from "../../../services/TicketService";
import { ShowtimeService } from "../../../services/ShowtimeService";
import { CreditService } from "../../../services/CreditService";
import { UserService } from "../../../services/UserService";
import { Ticket } from "../../../types/Ticket";

export default function TicketSearch() {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [ticket, setTicket] = useState<Ticket | null>(null);
	const [showPopup, setShowPopup] = useState(false);
	const [inputEmail, setInputEmail] = useState("");
	const [error, setError] = useState("");
	const [ticketStatus, setTicketStatus] = useState<
		"valid" | "cancelled" | "expired" | "not-found"
	>("not-found");
	const [isUnregistered, setIsUnregistered] = useState(false);
	const [refundAmount, setRefundAmount] = useState<number>(0);

	const handleSearch = async (ticketNumber: string) => {
		try {
			const fetchedTicket = await TicketService.getTicketById(
				parseInt(ticketNumber)
			);

			if (!fetchedTicket) {
				throw new Error("Ticket not found");
			}

			// Check the cancellation status
			if (fetchedTicket.state === 1) {
				setTicketStatus("cancelled");
				setTicket(fetchedTicket);
				return;
			}

			// Check if the ticket is expired based on showtime
			const showtimeDate = await ShowtimeService.getShowtimeDateById(
				fetchedTicket.showtimeId
			);
			const showtime = new Date(showtimeDate);
			const now = new Date();
			const hoursDiff = (showtime.getTime() - now.getTime()) / (1000 * 60 * 60);

			if (hoursDiff < 72) {
				setTicketStatus("expired");
			} else {
				setTicketStatus("valid");
			}

			// Determine if the user is unregistered
			const userService = new UserService();
			let user = null;
			try {
				user = await userService.getUserOrRegisteredUserById(
					fetchedTicket.userId
				);
			} catch (error) {}

			const isUserUnregistered = !user || !user.payment || !user.address;
			setIsUnregistered(isUserUnregistered);

			// Calculate refund amount
			const ticketCost = fetchedTicket.age === 0 ? 19.99 : 9.99; // Adult: $19.99, Child: $9.99
			const refund = isUserUnregistered ? ticketCost * 0.85 : ticketCost;
			setRefundAmount(refund);

			setTicket(fetchedTicket);
		} catch (error) {
			setTicket(null);
			setTicketStatus("not-found");
		}
	};

	const handleCancelTicket = () => {
		if (!ticket) return;
		setShowPopup(true);
		setInputEmail("");
		setError("");
	};

	const confirmCancel = async () => {
		if (!ticket || ticket.id === undefined) return;

		const userService = new UserService();
		const ticketEmail = await userService.getEmailByUserId(ticket.userId);
		if (inputEmail.trim().toLowerCase() !== ticketEmail.toLowerCase()) {
			setError(
				"The email entered does not match the email associated with this ticket."
			);
			return;
		}
		try {
			await CreditService.createCredit({
				userId: ticket.userId,
				creditAmount: refundAmount,
				createdOn: new Date(),
			});

			await TicketService.cancelTicket(ticket.id);
			setTicketStatus("cancelled");
			setShowPopup(false);
			setError("");
		} catch (error) {
			setError("Failed to cancel ticket. Please try again.");
		}
	};

	const closePopup = () => {
		setShowPopup(false);
	};

	return (
		<div className="flex flex-col items-center h-screen w-screen bg-black relative">
			<div className="text-4xl font-bold text-white w-[90%] items-center">
				<div>My Tickets</div>
				<div className="mt-5 w-[50%]">
					<TicketSearchBar onChange={handleSearch} />
				</div>
				<div className="mt-5 text-sm">
					{ticket ? (
						<div className="flex items-center justify-between p-4 bg-dark2 text-white rounded-lg shadow-lg">
							<div>Ticket#{ticket.id}</div>
							{ticketStatus === "cancelled" ? (
								<div className="text-dark4 font-bold text-sm">
									Ticket Cancelled
								</div>
							) : ticketStatus === "expired" ? (
								<div className="text-dark4 font-bold text-sm">
									Ticket Expired
								</div>
							) : (
								<button
									className="text-red-500 hover:text-red-700 font-bold text-sm ml-4"
									onClick={handleCancelTicket}
								>
									<div className="flex items-center gap-2">
										<FontAwesomeIcon icon={faCircleXmark} />
										Cancel Ticket
									</div>
								</button>
							)}
						</div>
					) : (
						<div className="pl-6 text-dark4 font-normal text-lg">
							<FontAwesomeIcon icon={faFaceSadTear} />
							<span className="pl-2">Such empty...</span>
						</div>
					)}
				</div>
			</div>
			{showPopup && (
				<div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center rounded-lg">
					<div className="bg-dark1 text-white p-6 rounded-lg shadow-lg animate-zoomInBounce relative bottom-[8%]">
						<div className="text-lg font-semibold mb-4">
							Are you sure you want to cancel your ticket?
						</div>
						{isUnregistered && (
							<div className="text-sm mb-4 text-yellow-500 flex items-center gap-2">
								<FontAwesomeIcon icon={faExclamationTriangle} />
								<span>
									15% of the ticket price is non-refundable. You will receive $
									{refundAmount.toFixed(2)} as a credit.
								</span>
							</div>
						)}
						{!isUnregistered && (
							<div className="text-sm mb-4 text-green-500 flex items-center gap-2">
								<FontAwesomeIcon icon={faCheck} />
								<span>
									You will receive a full refund of ${refundAmount.toFixed(2)}.
								</span>
							</div>
						)}
						<div className="text-sm mb-4">
							Please confirm by entering the email associated with this ticket:
						</div>
						<input
							type="email"
							className="w-full p-2 bg-dark3 placeholder-dark4 text-white rounded-lg mb-4"
							placeholder="Enter your email"
							value={inputEmail}
							onChange={(e) => setInputEmail(e.target.value)}
						/>
						{error && <div className="text-red-500 text-sm mb-4">{error}</div>}
						<div className="flex justify-end gap-4">
							<button
								className="bg-[#e50914] hover:bg-red-700 text-white py-2 px-4 rounded"
								onClick={closePopup}
							>
								No
							</button>
							<button
								className="bg-dark2 hover:bg-dark3 text-white py-2 px-4 rounded-md"
								onClick={confirmCancel}
							>
								Yes
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
