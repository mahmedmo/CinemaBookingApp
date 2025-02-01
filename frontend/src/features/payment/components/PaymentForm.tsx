import React, { useEffect, useState } from "react";
import { PaymentDetails } from "../types/PaymentTypes";
import { Payment } from "../../../types/Payment";
import { Address } from "../../../types/Address";
import { UserService } from "../../../services/UserService";

interface PaymentFormProps {
	onSubmit: (details: PaymentDetails & { address: string }) => void;
	initialEmail?: string;
	initialPayment?: Payment;
	initialAddress?: Address;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
	onSubmit,
	initialEmail,
	initialPayment = {},
	initialAddress = {},
}) => {
	const formatCardNumber = (cardNumber: string) => {
		return cardNumber.replace(/\D/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
	};
	const [cardNumber, setCardNumber] = useState<string>(
		initialPayment.cardNumber ? formatCardNumber(initialPayment.cardNumber) : ""
	);
	const [expiryDate, setExpiryDate] = useState<string>(
		initialPayment.expiry || ""
	);
	const [cvv, setCvv] = useState<string>(initialPayment.cvv || "");
	const [email, setEmail] = useState<string>(initialEmail || "");
	const formattedAddress = [
		initialAddress.street,
		initialAddress.city,
		initialAddress.state,
		initialAddress.zipCode,
	]
		.filter((part) => part)
		.join(", ");

	const [address, setAddress] = useState<string>(formattedAddress || "");
	const [errors, setErrors] = useState<Record<string, string | null>>({
		email: null,
		cardNumber: null,
		expiryDate: null,
		cvv: null,
		address: null,
	});

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const cardNumberRegex = /^\d{4}(\s\d{4}){3}$/;
	const expiryDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
	const cvvRegex = /^\d{3}$/;

	const validateFields = (): boolean => {
		const newErrors: Record<string, string | null> = {};

		if (!emailRegex.test(email)) {
			newErrors.email = "Invalid email format. Use yourname@example.com.";
		}
		if (!cardNumberRegex.test(cardNumber)) {
			newErrors.cardNumber = "Invalid card number. Use 1234 5678 9012 3456.";
		}
		if (!expiryDateRegex.test(expiryDate)) {
			newErrors.expiryDate = "Invalid expiry date. Use MM/YY.";
		}
		if (!cvvRegex.test(cvv)) {
			newErrors.cvv = "Invalid CVV. Use a 3-digit number.";
		}
		if (!address) {
			newErrors.address = "Billing address is required.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleCardNumberChange = (value: string) => {
		let cleaned = value.replace(/\D/g, "");
		if (cleaned.length > 16) {
			cleaned = cleaned.slice(0, 16);
		}
		const formatted = cleaned.replace(/(\d{4})(?=\d)/g, "$1 ");
		setCardNumber(formatted);
	};
	const handleExpiryDateChange = (value: string) => {
		let cleaned = value.replace(/\D/g, "");
		if (cleaned.length > 4) {
			cleaned = cleaned.slice(0, 4);
		}
		if (cleaned.length > 2) {
			cleaned = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
		}
		setExpiryDate(cleaned);
	};
	useEffect(() => {
		if (initialPayment?.expiry) {
			const cleaned = initialPayment.expiry.replace(/\D/g, "");
			if (cleaned.length === 4) {
				const formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
				setExpiryDate(formatted);
			}
		}
	}, [initialPayment?.expiry]);
	const handleCvvChange = (value: string) => {
		let cleaned = value.replace(/\D/g, "");
		if (cleaned.length > 3) {
			cleaned = cleaned.slice(0, 3);
		}
		setCvv(cleaned);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateFields()) return;

		try {
			try {
				await UserService.getUserIdByEmail(email);
			} catch (error) {
				const userService = new UserService();
				await userService.createUser(email);
			}

			onSubmit({ cardNumber, expiryDate, cvv, email, address });
		} catch (error) {
			alert("An error occurred. Please try again.");
		}
	};

	return (
		<div className="mb-6 p-5 border border-dark1 rounded bg-dark1">
			<form onSubmit={handleSubmit}>
				<h3 className="text-3xl text-white font-bold mb-4">
					Enter Payment Details
				</h3>
				<label className="text-base text-white mt-2 block">
					Email
					<input
						className="w-full mt-2 p-2 bg-dark3 border border-dark4 text-white rounded placeholder-dark4"
						type="email"
						placeholder="you@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						disabled={Boolean(
							initialPayment?.cardNumber || initialAddress?.street
						)}
						required
					/>
				</label>
				{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
				<label className="text-base text-white mt-2 block">
					Card Number
					<input
						className="w-full mt-2 p-2 bg-dark3 border border-dark4 text-white rounded placeholder-dark4"
						type="text"
						placeholder="1234 5678 9012 3456"
						value={cardNumber}
						onChange={(e) => handleCardNumberChange(e.target.value)}
						disabled={Boolean(initialPayment?.cardNumber)}
						required
						pattern="\d{4} \d{4} \d{4} \d{4}"
						title="Card number must be 16 digits"
						maxLength={19}
					/>
				</label>
				{errors.cardNumber && (
					<p className="text-red-500 text-sm">{errors.cardNumber}</p>
				)}
				<label className="text-base text-white mt-2 block">
					Expiration Date
					<input
						className="w-full mt-2 p-2 bg-dark3 border border-dark4 text-white rounded placeholder-dark4"
						type="text"
						placeholder="MM/YY"
						value={expiryDate}
						onChange={(e) => handleExpiryDateChange(e.target.value)}
						disabled={Boolean(initialPayment?.expiry)}
						required
						maxLength={5}
						pattern="\d{2}/\d{2}"
						title="Expiration date must be in the format MM/YY"
					/>
				</label>

				<label className="text-base text-white mt-2 block">
					CVV
					<input
						className="w-full mt-2 p-2 bg-dark3 border border-dark4 text-white rounded placeholder-dark4"
						type="password"
						placeholder="•••"
						value={cvv}
						onChange={(e) => handleCvvChange(e.target.value)}
						disabled={Boolean(initialPayment?.cvv)}
						required
						pattern="\d{3}"
						title="CVV must be exactly 3 digits"
						maxLength={3}
					/>
				</label>
				{errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
				<div className="mt-4">
					<label className="text-base text-white mt-2 block">
						Billing Address
						<input
							className="w-full mt-2 p-2 bg-dark3 border border-dark4 text-white rounded placeholder-dark4"
							type="text"
							placeholder="Street Address, City, State/Province, ZIP/Postal Code"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							disabled={Boolean(initialAddress?.street)}
							required
						/>
					</label>
				</div>
				<button className="mt-8 mb-2 px-5 py-2 mx-auto block bg-[#e50914] text-white rounded hover:bg-red-700">
					Submit
				</button>
			</form>
		</div>
	);
};

export default PaymentForm;
