import React, { useState } from "react";
import { CreditService } from "../../../services/CreditService";
import { UserService } from "../../../services/UserService";

interface CreditPaymentFormProps {
	onSubmit: (email: string) => void;
	initialEmail?: string;
	requiredAmount: number;
}

const CreditPaymentForm: React.FC<CreditPaymentFormProps> = ({
	onSubmit,
	initialEmail,
	requiredAmount,
}) => {
	const [email, setEmail] = useState(initialEmail || "");
	const [creditBalance, setCreditBalance] = useState<number | null>(null);
	const [loadingBalance, setLoadingBalance] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [canSubmit, setCanSubmit] = useState(false);

	const handleCheckBalance = async () => {
		setLoadingBalance(true);
		setErrorMessage("");
		setCreditBalance(null);
		setCanSubmit(false);

		await new Promise((resolve) => setTimeout(resolve, 500));

		try {
			const userId = await UserService.getUserIdByEmail(email.trim());
			if (!userId) {
				setErrorMessage("No user found with this email address.");
				return;
			}

			const credits = await CreditService.getCreditsByUserId(userId);
			if (credits.length === 0) {
				setErrorMessage("No credits associated with this account.");
				return;
			}

			const totalBalance = credits.reduce(
				(sum, credit) => sum + credit.creditAmount,
				0
			);
			setCreditBalance(totalBalance);

			if (totalBalance >= requiredAmount) {
				setCanSubmit(true);
			} else {
				setErrorMessage(
					`Insufficient credits. You need $${requiredAmount.toFixed(
						2
					)}, but only have $${totalBalance.toFixed(2)}.`
				);
			}
		} catch (error: any) {
			if (error.response && error.response.status === 404) {
				setErrorMessage("No user or credits found for this email.");
			} else {
				setErrorMessage(
					"Failed to fetch credit balance. Please try again later."
				);
			}
		} finally {
			setLoadingBalance(false);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (canSubmit) {
			onSubmit(email);
		} else {
			alert("You do not have enough credits to complete this payment.");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="mb-6 p-5 border border-dark1 rounded bg-dark1"
		>
			<h3 className="text-3xl text-white font-bold mb-4">Pay with Credits</h3>
			<label className="text-base text-white mt-2 block">
				Email
				<input
					className="w-full mt-2 p-2 bg-dark3 border border-dark4 text-white rounded placeholder-dark4"
					type="email"
					placeholder="you@example.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
			</label>
			<div className="flex items-center justify-between mt-6">
				<button
					type="button"
					className={`bg-dark2 hover:bg-dark3 text-white px-4 py-2 rounded ${
						loadingBalance ? "opacity-50 cursor-wait" : ""
					}`}
					onClick={handleCheckBalance}
					disabled={loadingBalance}
				>
					{loadingBalance ? "Checking..." : "Check Credit Balance"}
				</button>
				{creditBalance !== null && (
					<span className="text-white font-bold">
						Balance: ${creditBalance.toFixed(2)}
					</span>
				)}
			</div>
			<div
				className={`transition-opacity duration-300 ${
					errorMessage ? "opacity-100" : "opacity-0"
				} text-red-500 text-sm mt-4`}
			>
				{errorMessage}
			</div>
			<button
				className={`mt-8 mb-2 px-5 py-2 mx-auto block ${
					canSubmit
						? "bg-[#e50914] hover:bg-red-700"
						: "bg-dark4 cursor-not-allowed"
				} text-white rounded transition-all duration-300`}
				disabled={!canSubmit}
			>
				Pay with Credits
			</button>
		</form>
	);
};

export default CreditPaymentForm;
