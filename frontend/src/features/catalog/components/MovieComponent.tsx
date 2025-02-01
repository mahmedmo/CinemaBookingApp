import React from "react";
import { Movie } from "../../../types/Movie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoltLightning, faLock } from "@fortawesome/free-solid-svg-icons";

export interface MovieProps {
	movie: Movie;
	isRestricted: boolean;
	isEarlyAccess: boolean;
	isFull: boolean;
	onClick: () => void;
}

export default function MovieComponent({
	movie,
	isRestricted,
	isEarlyAccess,
	isFull,
	onClick,
}: MovieProps) {
	return (
		<div
			onClick={onClick}
			className="relative mt-4 w-1/6 bg-dark2 rounded-xl transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:shadow-[#e50914] cursor-pointer"
			style={{
				height: "50%",
				backgroundImage: `url(${movie.image})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
		>
			{isEarlyAccess && !isFull && (
				<div
					className="absolute top-2 left-2 bg-[#e50914] text-white px-2 py-1 rounded"
					style={{ cursor: "pointer" }}
				>
					Early Access
				</div>
			)}
			{isFull && (
				<div
					className="absolute inset-0 bg-red-600 bg-opacity-70 flex items-center justify-center rounded-xl"
					style={{ cursor: "not-allowed" }}
				>
					<FontAwesomeIcon
						icon={faBoltLightning}
						size="2x"
						className="text-white mr-2"
					/>
					<span className="text-white font-bold">EARLY ACCESS FULL</span>
				</div>
			)}

			{isRestricted && !isFull && (
				<div
					className="absolute inset-0 bg-yellow-500 bg-opacity-50 flex items-center justify-center rounded-xl"
					style={{ cursor: "pointer" }}
				>
					<FontAwesomeIcon icon={faLock} size="2x" className="text-white" />
				</div>
			)}
		</div>
	);
}
