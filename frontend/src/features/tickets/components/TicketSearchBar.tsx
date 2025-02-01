import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function TicketSearchBar({
	onChange,
}: {
	onChange: (value: string) => void;
}) {
	const [inputValue, setInputValue] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	const handleSearch = () => {
		if (inputValue.trim()) {
			onChange(inputValue);
		}
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<div
			className="w-full h-full border-black rounded-2xl flex items-center"
			style={{ backgroundColor: "#222222" }}
		>
			<input
				className="w-full h-full placeholder-dark4 font-normal rounded-2xl text-white text-xl bg-transparent pl-5 outline-none"
				type="text"
				placeholder="Enter ticket number..."
				value={inputValue}
				onChange={handleInputChange}
				onKeyPress={handleKeyPress}
			/>
			<button
				className="ml-3 bg-dark1 hover:bg-dark3 text-white font-semibold py-2 px-4 rounded-2xl"
				onClick={handleSearch}
			>
				<FontAwesomeIcon icon={faSearch} size="xs" />
			</button>
		</div>
	);
}
