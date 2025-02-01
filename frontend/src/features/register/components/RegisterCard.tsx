import { useNavigate } from "react-router-dom";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { UserService } from "../../../services/UserService";
import { useUser } from "../../../app/UserContext";
import { User } from "../../../types/User";

export function RegisterCard() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const { setUser } = useUser();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		const email = (e.target as any).email.value;
		const password = (e.target as any).password.value;
		const cardNumber = (e.target as any).cardNumber.value.replace(/\s/g, "");
		const address = (e.target as any).address.value;
		const expiry = (e.target as any).Expiry.value;
		const cvv = (e.target as any).CVV.value;

		const addressParts = address.split(",").map((part: string) => part.trim());
		if (addressParts.length !== 4) {
			setError(
				"Address must be in the format: Street Address, City, State/Province, ZIP/Postal Code"
			);
			return;
		}
		const [street, city, state, zipCode] = addressParts;

		try {
			const userService = new UserService();
			await userService.registerUser(
				email,
				street,
				city,
				state,
				zipCode,
				cardNumber,
				expiry,
				cvv,
				password
			);
			const signInUser: User | null = await userService.validatePassword(
				email,
				password
			);
			if (signInUser) {
				setUser(signInUser);
			}
			navigate("/register-success", { state: { accessGranted: true } });
		} catch (err) {
			setError("An error occurred during registration.");
		}
	};

	return (
		<div className="h-screen flex flex-col flex-1 justify-center items-center text-white bg-black">
			<div className="w-[30%] rounded-lg pl-8 pr-8 pt-4 pb-4 bg-dark1 relative bottom-[5%] overflow-y-auto">
				<h3 className="text-3xl text-white font-bold mb-6 mt-4">Register</h3>
				{error && <div className="text-red-500 text-sm mb-4">{error}</div>}
				<form onSubmit={handleRegister}>
					<span className="text-2xl font-semibold text-white">Credentials</span>
					<div className="mb-2">
						<label className="text-base text-white mt-2 block">
							Email
							<input
								type="email"
								id="email"
								name="email"
								className="w-full mt-2 p-2 bg-dark3 border border-dark4 text-white rounded placeholder-dark4"
								placeholder="you@example.com"
								required
							/>
						</label>
					</div>
					<div className="mb-2">
						<label className="text-base text-white mt-2 block">
							Password
							<input
								type="password"
								id="password"
								name="password"
								className="w-full mt-2 p-2 bg-dark3 border border-dark4 text-white rounded placeholder-dark4"
								placeholder="••••••••••"
								required
							/>
						</label>
					</div>
					<h2 className="mt-6 text-2xl text-white font-semibold flex items-center">
						Payment Details
						<span className="ml-2 group relative cursor-pointer font-normal">
							<FontAwesomeIcon
								icon={faCircleQuestion}
								size="xs"
								className="text-dark4"
							/>
							<div className="absolute w-52 transform -translate-x-1/2 left-32 top-0 bg-dark2 text-white text-xs p-2 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
								Payment is required for an annual account fee of $20.
							</div>
						</span>
					</h2>
					<div className="mb-2">
						<label className="text-base text-white mt-2 block">
							Card Number
							<input
								type="text"
								id="cardNumber"
								name="cardNumber"
								className="w-full mt-2 p-2 bg-dark3 border border-dark4 text-white rounded placeholder-dark4"
								placeholder="1122 3344 5566 7788"
								required
								pattern="\d{4} \d{4} \d{4} \d{4}"
								title="Card number must be 16 digits"
								maxLength={19}
								onInput={(e: React.FormEvent<HTMLInputElement>) => {
									const input = e.target as HTMLInputElement;
									let value = input.value.replace(/\D/g, "");
									value = value.replace(/(\d{4})(?=\d)/g, "$1 ");
									input.value = value;
								}}
							/>
						</label>
					</div>
					<div className="mb-2">
						<label className="text-base text-white mt-2 block">
							Billing Address
							<input
								type="text"
								id="address"
								name="address"
								className="w-full mt-2 p-2 bg-dark3 border border-dark4 text-white rounded placeholder-dark4"
								placeholder="Street Address, City, State/Province, ZIP/Postal Code"
								required
								pattern="^(\d+\s[A-Za-z\s]+,\s[A-Za-z\s]+,\s[A-Za-z\s]+,\s[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d|\d+\s[A-Za-z\s]+,\s[A-Za-z\s]+,\s[A-Za-z\s]+,\s\d{5})$"
								title="Address must be in the format: Street Address, City, State/Province, ZIP/Postal Code (e.g., 123 Main Street, Springfield, Alaska, 12345)"
							/>
						</label>
					</div>
					<div className="mb-2">
						<label className="text-base text-white mt-2 block">
							Expiration Date
							<input
								type="text"
								id="Expiry"
								name="Expiry"
								className="w-full mt-2 p-2 bg-dark3 border border-dark4 text-white rounded placeholder-dark4"
								placeholder="MM/YY"
								required
								maxLength={5}
								pattern="\d{2}/\d{2}"
								title="Expiration date must be in the format MM/YY"
								onInput={(e: React.FormEvent<HTMLInputElement>) => {
									const input = e.target as HTMLInputElement;
									let value = input.value.replace(/\D/g, "");
									if (value.length > 2) {
										value = `${value.slice(0, 2)}/${value.slice(2)}`;
									}
									input.value = value;
								}}
							/>
						</label>
					</div>
					<div className="mb-2">
						<label className="text-base text-white mt-2 block">
							CVV
							<input
								type="password"
								id="CVV"
								name="CVV"
								className="w-full mt-2 p-2 bg-dark3 border border-dark4 text-white rounded placeholder-dark4"
								placeholder="•••"
								required
								pattern="\d{3}"
								title="CVV must be exactly 3 digits"
								maxLength={3}
								onInput={(e: React.FormEvent<HTMLInputElement>) => {
									const input = e.target as HTMLInputElement;
									let value = input.value.replace(/\D/g, "");
									input.value = value;
								}}
							/>
						</label>
					</div>
					<div className="mt-6">
						<button
							type="submit"
							className="w-full bg-[#e50914] text-white py-2 px-4 rounded-md hover:bg-red-700"
						>
							Register
						</button>
					</div>
				</form>
				<div className="text-dark4 text-sm pt-2 flex flex-row gap-1 mb-6 mt-2">
					Already have an account?{" "}
					<div
						onClick={() => {
							navigate("/login");
						}}
						className="text-blue-500 hover:underline cursor-pointer font-semibold"
					>
						Login here
					</div>
				</div>
			</div>
		</div>
	);
}
