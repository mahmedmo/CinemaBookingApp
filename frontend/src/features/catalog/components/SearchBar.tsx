import { useState } from "react";

export default function SearchBar({
	onChange,
}: {
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setIsLoading(true);
		setTimeout(() => {
			setIsLoading(false);
			onChange(e);
		}, 500);
	};

	return (
		<div
			className="relative w-full h-full border-black rounded-2xl"
			style={{ backgroundColor: "#222222" }}
		>
			<input
				className="w-full h-full placeholder-dark4 rounded-2xl text-white text-xl bg-transparent pl-5 pr-10"
				type="text"
				placeholder="Search movie catalog..."
				onChange={handleChange}
			/>
			{isLoading && (
				<div className="absolute right-5 top-1/2 transform -translate-y-1/2 text-white">
					<svg
						className="animate-spin h-6 w-6 text-white"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8v8H4z"
						></path>
					</svg>
				</div>
			)}
		</div>
	);
}
