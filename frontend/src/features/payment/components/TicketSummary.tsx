import React from "react";
import { TicketSelection } from "../types/PaymentTypes";

interface TicketSummaryProps {
	ticketSelection: TicketSelection;
}

const TicketSummary: React.FC<TicketSummaryProps> = ({ ticketSelection }) => {
	const ADULT_PRICE = 19.99;
	const CHILD_PRICE = 9.99;

	const adultTotal = ticketSelection.adultTickets * ADULT_PRICE;
	const childTotal = ticketSelection.childTickets * CHILD_PRICE;
	const taxes = (adultTotal + childTotal) * 0.05;
	const total = adultTotal + childTotal + taxes;

	return (
		<div className="mb-6 p-5 border border-dark1 rounded bg-dark1">
			<h3 className="text-3xl text-white font-bold mb-4">Order Summary</h3>
			<div className="flex items-center justify-between mb-2 pt-2">
				<span className="text-lg font-medium text-white">
					Adult Tickets ({ticketSelection.adultTickets}):
				</span>
				<span className="text-lg font-medium text-white">
					${adultTotal.toFixed(2)}
				</span>
			</div>
			<div className="flex items-center justify-between mb-2">
				<span className="text-lg font-medium text-white">
					Child Tickets ({ticketSelection.childTickets}):
				</span>
				<span className="text-lg font-medium text-white">
					${childTotal.toFixed(2)}
				</span>
			</div>
			<div className="flex items-center justify-between mb-4">
				<span className="text-lg font-medium text-white">5% GST:</span>
				<span className="text-lg font-medium text-white">
					${taxes.toFixed(2)}
				</span>
			</div>
			<div className="flex items-center justify-between pt-2">
				<span className="text-2xl font-bold text-white">Total</span>
				<span className="text-2xl font-bold text-white">
					${total.toFixed(2)}
				</span>
			</div>
		</div>
	);
};

export default TicketSummary;
