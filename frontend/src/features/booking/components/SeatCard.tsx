import React, { useState, useEffect } from "react";
import { ShowtimeService } from "../../../services/ShowtimeService";
import { calcSeatNo, Seat } from "../../../types/Seat";
import { Seatmap } from "../../../types/Seatmap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faXmark } from "@fortawesome/free-solid-svg-icons";

interface SeatCardProps {
	no_of_seats: number;
	savedSeats: Seat[];
	onSeatsConfirmed: (seats: Seat[]) => void;
	onClose: () => void;
	showtimeId: number;
}

export function SeatCard({
	no_of_seats,
	savedSeats,
	onSeatsConfirmed,
	onClose,
	showtimeId,
}: SeatCardProps) {
	const [seatmap, setSeatmap] = useState<Seatmap | null>(null);
	const [seats, setSeats] = useState<Seat[][]>([]);
	const [selectedSeats, setSelectedSeats] = useState<Seat[]>([...savedSeats]);

	useEffect(() => {
		const fetchSeatData = async () => {
			try {
				const seatmapData = await ShowtimeService.getSeatmapById(showtimeId);
				setSeatmap(seatmapData);

				const seatsData = await ShowtimeService.getSeatsByShowtimeId(
					showtimeId
				);

				const grid = Array.from({ length: seatmapData.numOfRows }, () =>
					Array(seatmapData.numOfCols).fill(null)
				);

				const seatPromises = seatsData.map(async (seat) => {
					const reserved = await ShowtimeService.isSeatReserved(
						showtimeId,
						seat.id
					);
					return {
						...seat,
						reserved,
						seat_no: calcSeatNo(seat.row, seat.column),
					};
				});

				const completedSeats = await Promise.all(seatPromises);

				completedSeats.forEach((seat) => {
					grid[seat.row - 1][seat.column - 1] = seat;
				});

				console.log("Generated seat grid:", grid);
				setSeats(grid);
			} catch (error) {
				console.error("Failed to fetch seat data:", error);
			}
		};

		fetchSeatData();
	}, [showtimeId]);

	const selectSeat = (seat: Seat) => {
		if (seat.reserved) {
			return;
		}
		setSelectedSeats((prev) => {
			const index = prev.findIndex((s) => s.id === seat.id);
			if (index !== -1) {
				return prev.filter((s) => s.id !== seat.id);
			} else {
				return [...prev, seat];
			}
		});
	};

	const handleSelectSubmit = () => {
		if (selectedSeats.length === no_of_seats) {
			onSeatsConfirmed(selectedSeats);
		} else {
			alert(`Please select exactly ${no_of_seats} seats.`);
		}
	};

	if (!seatmap || seats.length === 0) {
		return <div>Loading seats...</div>;
	}

	return (
		<div className="relative bg-dark1 flex flex-col justify-center items-center p-6 rounded-lg shadow-xl animate-zoomInBounce">
			<div className="absolute top-0 right-2">
				<button
					onClick={onClose}
					className="text-xl font-bold text-white hover:text-dark4 transition-colors"
				>
					<FontAwesomeIcon icon={faXmark} />
				</button>
			</div>
			{selectedSeats.length > 0 && (
				<div className="mb-4 text-white text-lg font-semibold">
					Selected Seats:{" "}
					<span className="text-[#1db954]">
						{selectedSeats.map((seat) => seat.seat_no).join(", ")}
					</span>
				</div>
			)}
			<div>
				<div
					className="grid gap-2 p-2 rounded-lg bg-dark2"
					style={{
						gridTemplateColumns: `repeat(${seatmap.numOfCols}, minmax(0, 1fr))`,
					}}
				>
					{seats.map((row, rowIndex) =>
						row.map((seat, colIndex) =>
							seat ? (
								<button
									key={seat.id}
									onClick={() => selectSeat(seat)}
									className="relative w-8 h-8 flex justify-center items-center border rounded"
									style={{
										backgroundColor: selectedSeats.some((s) => s.id === seat.id)
											? "#1db954" // Selected (green)
											: seat.reserved
											? "#636363" // Unavailable (gray)
											: "#e50914", // Available (red)
									}}
								>
									<FontAwesomeIcon
										icon={faCouch}
										className="absolute text-white"
									/>
								</button>
							) : (
								<div
									key={`empty-${rowIndex}-${colIndex}`}
									className="w-8 h-8"
								></div>
							)
						)
					)}
				</div>
				<div className="text-white text-2xl mb-2 bg-dark2 rounded-lg px-40 py-2 mt-2">
					Screen
				</div>
				<div className="mt-4 flex justify-center">
					<button
						onClick={handleSelectSubmit}
						disabled={selectedSeats.length !== no_of_seats}
						className={`px-4 py-2 text-white rounded ${
							selectedSeats.length === no_of_seats
								? "bg-[#e50914] hover:bg-red-700"
								: "bg-dark4 cursor-not-allowed"
						}`}
					>
						Confirm Selection
					</button>
				</div>
			</div>
		</div>
	);
}
