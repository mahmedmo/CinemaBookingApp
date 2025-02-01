import React from "react";
import { Movie } from "../../../types/Movie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Theatre } from "../../../types/Theatre";

export interface MoviePopupProps {
	movie: Movie;
	theatre: Theatre;
	onClose: () => void;
}
export default function MoviePopup({
	movie,
	theatre,
	onClose,
}: MoviePopupProps) {
	const navigate = useNavigate();
	return (
		<div
			className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 flex items-center justify-center"
			style={{ zIndex: 1000 }}
		>
			<div
				className="relative w-[40%] h-4/5 bg-black rounded-xl overflow-hidden animate-zoomInBounce flex flex-col pb-6"
				style={{ alignSelf: "center" }}
			>
				<div
					className="absolute top-4 right-4 text-white text-2xl cursor-pointer z-20"
					onClick={onClose}
				>
					<FontAwesomeIcon icon={faXmark} />
				</div>

				<div className="flex flex-col items-center flex-shrink-0">
					<img
						className="mt-16 h-[100%] w-[40%] object-cover rounded-lg"
						src={movie.image}
						alt={movie.title}
					/>
				</div>

				<div className="relative z-10 text-white px-6 flex-shrink-0 text-center">
					<div className="pt-4">
						<h1 className="text-2xl font-bold">{movie.title}</h1>
					</div>
					<div className="pt-2">
						<p className="text-lg font-semibold">Runtime: {movie.runtime}</p>
					</div>
					<div className="pt-2">
						<p className="text-lg font-semibold">Premiered: {movie.premiere}</p>
					</div>
				</div>

				<div
					onClick={() =>
						navigate(`/book-ticket`, {
							state: { movie: movie, theatre: theatre },
						})
					}
					className={`flex flex-row mt-5 gap-2 z-10 items-center cursor-pointer justify-center text-white font-bold bg-dark1 px-6 py-2 mx-6 rounded-lg transition-opacity duration-150 active:opacity-75`}
					style={{ alignSelf: "center", userSelect: "none" }}
				>
					<FontAwesomeIcon icon={faTicket} />
					<span>Book Ticket</span>
				</div>

				<div
					className="relative z-10 text-white overflow-y-auto px-6 pt-4 flex-grow text-center mt-2 mb-2"
					style={{ maxHeight: "calc(100% - 450px)" }}
				>
					<p className="text-lg leading-relaxed">{movie.details}</p>
				</div>
			</div>
		</div>
	);
}
