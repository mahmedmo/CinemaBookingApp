import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserService } from "../../../services/UserService";
import { useUser } from "../../../app/UserContext";
import { User } from "../../../types/User";

export function LoginCard() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const { setUser } = useUser();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		const email = (e.target as any).email.value;
		const password = (e.target as any).password.value;

		try {
			const userService = new UserService();
			const user: User | null = await userService.validatePassword(
				email,
				password
			);
			if (user) {
				setUser(user);
				navigate("/login-success", { state: { accessGranted: true } });
			} else {
				setError("Invalid email or password");
			}
		} catch (err) {
			console.error("Login error:", err);
			setError("An error occurred during login.");
		}
	};
	return (
		<div className="h-screen flex flex-col flex-1 justify-center items-center text-white bg-black">
			<div className="w-[30%] rounded-lg pl-8 pr-8 pt-4 pb-4 bg-dark1 relative bottom-[8%] overflow-y-auto">
				<h3 className="text-3xl text-white font-bold mb-6 mt-4">Login</h3>
				{error && <div className="text-red-500 text-sm mb-4">{error}</div>}
				<form onSubmit={handleLogin}>
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
					<div className="mt-6">
						<button
							type="submit"
							className="w-full bg-[#e50914] text-white py-2 px-4 rounded-md hover:bg-red-700"
						>
							Login
						</button>
					</div>
				</form>
				<div className="text-dark4 text-sm pt-2 flex flex-row gap-1 mb-6 mt-2">
					Don't have an account?{" "}
					<div
						onClick={() => {
							navigate("/register");
						}}
						className="text-blue-500 hover:underline cursor-pointer font-semibold"
					>
						Register here
					</div>
				</div>
			</div>
		</div>
	);
}
