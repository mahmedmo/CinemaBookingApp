import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TicketSummary from "../../features/payment/components/TicketSummary";
import PaymentForm from "../../features/payment/components/PaymentForm";
import CreditPaymentForm from "../../features/payment/components/CreditPaymentForm";
import { PaymentDetails } from "../../features/payment/types/PaymentTypes";
import { PaymentData } from "../../types/PaymentData";
import { LocalDateTime } from "@js-joda/core";
import { TicketService } from "../../services/TicketService";
import { ShowtimeService } from "../../services/ShowtimeService";
import { ReceiptService } from "../../services/ReceiptService";
import { UserService } from "../../services/UserService";
import { calcSeatNo } from "../../types/Seat";
import { useUser } from "../UserContext";

export function PaymentView() {
	const navigate = useNavigate();
	const { user } = useUser();
	const [paymentSuccess, setPaymentSuccess] = useState(false);
	const [selectedTab, setSelectedTab] = useState<"creditCard" | "credits">(
		"creditCard"
	);
	const location = useLocation();

	const { paymentData } =
		(location.state as { paymentData: PaymentData }) || {};

	useEffect(() => {
		if (!paymentData) {
			navigate("/browse", { replace: true });
			return;
		}
	}, [paymentData, navigate]);

	useEffect(() => {
		const closeModalAndRedirect = () => {
			navigate("/order-confirmed", { state: { accessGranted: true } });
		};
		if (paymentSuccess) {
			closeModalAndRedirect();
		}
	}, [navigate, paymentSuccess]);

	const resolveUserId = async (email: string): Promise<number> => {
		try {
			return await UserService.getUserIdByEmail(email);
		} catch (error) {
			const newUser = await new UserService().createUser(email);
			return newUser.id;
		}
	};
	const ticketSends = async (email: string) => {
		try {
			const resolvedUserId = await resolveUserId(email);
			let remainingAdults = paymentData.ticketSelection.adultTickets;
			let remainingChildren = paymentData.ticketSelection.childTickets;
			const seatIdsToReserve = [];
			const tickets = [];
			const receipts = [];
			const seatNumbers = [];

			for (const seat of paymentData.seats) {
				let ticketCost, ageCategory;

				if (remainingAdults > 0) {
					ticketCost = 19.99;
					ageCategory = 0;
					remainingAdults--;
				} else if (remainingChildren > 0) {
					ticketCost = 9.99;
					ageCategory = 1;
					remainingChildren--;
				} else {
					break;
				}

				const ticket = await TicketService.createTicket({
					userId: resolvedUserId,
					movieId: paymentData.movie.id,
					showtimeId: paymentData.showtime.id,
					seatId: seat.id,
					state: 0,
					age: ageCategory,
				});

				tickets.push(ticket);
				seatIdsToReserve.push(seat.id);

				const seatNo = calcSeatNo(seat.row, seat.column);
				seatNumbers.push(seatNo);

				if (!ticket.id) return;
				const receipt = await ReceiptService.createReceipt({
					datePlaced: LocalDateTime.now(),
					cost: ticketCost,
					userId: resolvedUserId,
					ticketId: ticket.id,
				});

				receipts.push(receipt);
			}

			await Promise.all(
				seatIdsToReserve.map((seatId) =>
					ShowtimeService.setSeatReserved(paymentData.showtime.id, seatId)
				)
			);

			setPaymentSuccess(true);

			navigate("/order-confirmed", { state: { receipts, seatNumbers } });
		} catch (error) {}
	};

	const handlePaymentSubmit = async (details: PaymentDetails) => {
		await ticketSends(details.email);
	};

	const handleCreditPaymentSubmit = async (email: string) => {
		await ticketSends(email);
	};

	const calculateTotal = () => {
		if (!paymentData) return 0;
		return (
			paymentData.ticketSelection.adultTickets * 19.99 +
			paymentData.ticketSelection.childTickets * 9.99
		);
	};

	return (
		<div className="w-full mx-auto mt-auto p-4 bg-black rounded shadow">
			<div className="max-w-3xl mx-auto mt-auto p-4 bg-dark1 rounded-3xl shadow">
				<div className="mt-4 mb-6 p-4 rounded">
					<h2 className="text-3xl text-white text-center font-bold mb-2">
						{paymentData.movie.title}
					</h2>
					<img
						src={paymentData.movie.image}
						alt={`${paymentData.movie.title} poster`}
						className="w-full h-96 object-contain mb-10 rounded"
					/>
					<TicketSummary ticketSelection={paymentData.ticketSelection} />
				</div>
				{!user?.payment && (
					<div className="mb-6 border border-white bg-[#e50914] p-6 rounded-xl flex items-center justify-between shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
						<div>
							<h3 className="text-4xl font-extrabold text-white">
								Unlock the Ultimate Cinema Experience!
							</h3>
							<p className="text-xl text-gray-100 mt-4">
								Early access to movie details, priority seating, and exclusive
								perks—all for you.
							</p>
							<p className="text-lg text-gray-200 mt-2">
								No hidden fees. Cancel anytime. Start your premium journey now!
							</p>
						</div>
						<div>
							<button
								onClick={() => navigate("/register")}
								className="text-2xl font-bold bg-white text-[#e50914] px-6 py-3 rounded-full shadow-md hover:bg-gray-100 hover:text-red-700 transition-all duration-300"
							>
								Join for $20.00/year
							</button>
						</div>
					</div>
				)}
				<div className="flex justify-center mb-4">
					<button
						onClick={() => setSelectedTab("creditCard")}
						className={`px-4 py-2 rounded-lg ${
							selectedTab === "creditCard"
								? "bg-[#e50914] text-white font-bold"
								: "bg-dark2 text-white"
						}`}
					>
						Pay with Credit Card
					</button>
					<button
						onClick={() => setSelectedTab("credits")}
						className={`px-4 py-2 rounded-lg ${
							selectedTab === "credits"
								? "bg-[#e50914] text-white font-bold"
								: "bg-dark2 text-white"
						}`}
					>
						Pay with Credits
					</button>
				</div>
				<div
					className="relative overflow-y-scroll"
					style={{ minHeight: "600px" }}
				>
					<div
						className={`absolute inset-0 transition-transform duration-500 transform ${
							selectedTab === "creditCard"
								? "translate-x-0"
								: "-translate-x-full"
						}`}
					>
						<PaymentForm
							onSubmit={handlePaymentSubmit}
							initialEmail={user?.email}
							initialPayment={user?.payment}
							initialAddress={user?.address}
						/>
					</div>
					<div
						className={`absolute inset-0 transition-transform duration-500 transform ${
							selectedTab === "credits" ? "translate-x-0" : "translate-x-full"
						}`}
					>
						<CreditPaymentForm
							onSubmit={handleCreditPaymentSubmit}
							initialEmail={user?.email}
							requiredAmount={calculateTotal()}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
