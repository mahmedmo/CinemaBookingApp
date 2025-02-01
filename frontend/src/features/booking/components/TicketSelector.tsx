import React from "react";
import { TicketSelection } from "../../payment/types/PaymentTypes";

interface TicketSelectorProps {
	onSelectionChange: (selection: TicketSelection) => void;
	remainingTickets: number;
	adultTickets: number;
	childTickets: number;
}
const TicketSelector: React.FC<TicketSelectorProps> = ({
	onSelectionChange,
	remainingTickets,
	adultTickets,
	childTickets,
}) => {
	const adultPrice = 19.99;
	const childPrice = 9.99;

	const handleAdultChange = (amount: number) => {
		const newCount = Math.max(0, adultTickets + amount);
		onSelectionChange({ adultTickets: newCount, childTickets });
	};

	const handleChildChange = (amount: number) => {
		const newCount = Math.max(0, childTickets + amount);
		onSelectionChange({ adultTickets, childTickets: newCount });
	};

	return (
		<div className="p-5 border border-dark1 rounded">
			<h3 className="text-3xl text-white font-bold mb-4">Select Tickets</h3>
			<div className="flex items-center justify-between mb-4">
				<span className="w-32 text-lg text-white font-medium">
					Adult (18-64) {adultPrice}
				</span>
				<div className="flex items-center">
					<button
						onClick={() => handleAdultChange(-1)}
						disabled={adultTickets === 0}
						className={`w-8 h-8 ${
							adultTickets === 0
								? "bg-dark4 cursor-not-allowed"
								: "bg-[#e50914] hover:bg-red-700"
						}
							text-white rounded-full`}
					>
						-
					</button>
					<span className="px-10 py-1 text-center text-white">
						{adultTickets}
					</span>
					<button
						onClick={() => handleAdultChange(1)}
						disabled={remainingTickets <= 0}
						className={`w-8 h-8 flex justify-center items-center rounded-full ${
							remainingTickets <= 0
								? "bg-dark4 cursor-not-allowed"
								: "bg-[#e50914] hover:bg-red-700"
						} text-white`}
					>
						+
					</button>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<span className="w-32 text-lg text-white font-medium">
					Child (3-17) {childPrice}
				</span>
				<div className="flex items-center">
					<button
						onClick={() => handleChildChange(-1)}
						disabled={childTickets === 0}
						className={`w-8 h-8 ${
							childTickets === 0
								? "bg-dark4 cursor-not-allowed"
								: "bg-[#e50914] hover:bg-red-700"
						}
							text-white rounded-full`}
					>
						-
					</button>
					<span className="px-10 py-1 text-center text-white">
						{childTickets}
					</span>
					<button
						onClick={() => handleChildChange(1)}
						disabled={remainingTickets <= 0}
						className={`w-8 h-8 flex justify-center items-center rounded-full ${
							remainingTickets <= 0
								? "bg-dark4 cursor-not-allowed"
								: "bg-[#e50914] hover:bg-red-700"
						} text-white`}
					>
						+
					</button>
				</div>
			</div>
		</div>
	);
};

export default TicketSelector;
