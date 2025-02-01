import React, { useEffect, useState } from "react";
import { TicketSelection } from "../../payment/types/PaymentTypes";
import TicketSelector from "./TicketSelector";
import { Movie } from "../../../types/Movie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faHandPeace } from "@fortawesome/free-solid-svg-icons";
import { SeatCard } from "./SeatCard";
import { PaymentData } from "../../../types/PaymentData";
import { useLocation } from "react-router-dom";
import { TheatreMovieService } from "../../../services/TheatreMovieService";
import { Theatre } from "../../../types/Theatre";
import { Showtime } from "../../../types/Showtime";
import { Seat } from "../../../types/Seat";
import { ShowtimeService } from "../../../services/ShowtimeService";

export default function BookTicket() {
	const [ticketSelection, setTicketsSelection] = useState<TicketSelection>({
		adultTickets: 0,
		childTickets: 0,
	});
	const [isSeatPopupOpen, setIsSeatPopupOpen] = useState(false);
	const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
	const [selectedShowtime, setSelectedShowtime] = useState<Showtime | null>(
		null
	);
	const [showtimes, setShowtimes] = useState<Showtime[] | null>(null);
	const navigate = useNavigate();
	const location = useLocation();
	const [seatThreshold, setSeatThreshold] = useState<number>(0);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [totalSeats, setTotalSeats] = useState<number>(0);
	const [reservedSeats, setReservedSeats] = useState<number>(0);
	const { movie, theatre } =
		(location.state as { movie: Movie; theatre: Theatre }) || {};

	useEffect(() => {
		if (!movie || !theatre) {
			navigate("/browse", { replace: true });
			return;
		}
		const fetchShowtimes = async () => {
			if (!movie || !theatre) return;
			try {
				const theatreMovie =
					await TheatreMovieService.getTheatreMovieByMovieAndTheatre(
						movie.id,
						theatre.id
					);
				if (!theatreMovie) {
					throw new Error("Theatre movie not found");
				}
				const showtimes = await TheatreMovieService.getShowtimesById(
					theatreMovie.id
				);
				setShowtimes(showtimes);
			} catch (error) {
				console.error("Failed to fetch showtimes:", error);
				navigate("/browse", { replace: true });
			}
		};
		fetchShowtimes();
	}, [movie, theatre, navigate]);

	useEffect(() => {
		if (selectedShowtime) {
			const fetchSeatData = async () => {
				try {
					const seatmap = await ShowtimeService.getSeatmapById(
						selectedShowtime.id
					);
					const totalSeats = seatmap.numOfRows * seatmap.numOfCols;
					setTotalSeats(totalSeats);

					const seats = await ShowtimeService.getSeatsByShowtimeId(
						selectedShowtime.id
					);

					let reserved = 0;
					for (const seat of seats) {
						const isReserved = await ShowtimeService.isSeatReserved(
							selectedShowtime.id,
							seat.id
						);
						if (isReserved) {
							reserved++;
						}
					}
					setReservedSeats(reserved);

					const threshold = Math.floor(totalSeats * 0.1);
					setSeatThreshold(threshold);
				} catch (error) {
					console.error("Failed to fetch seat data:", error);
				}
			};
			fetchSeatData();
		} else {
			setTotalSeats(0);
			setReservedSeats(0);
			setSeatThreshold(0);
		}
	}, [selectedShowtime]);
	useEffect(() => {
		setSelectedSeats([]);
		setTicketsSelection({ adultTickets: 0, childTickets: 0 });
	}, [selectedShowtime]);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	if (!movie || !theatre || !showtimes) {
		return null;
	}
	const remainingTickets =
		seatThreshold -
		reservedSeats -
		(ticketSelection.adultTickets + ticketSelection.childTickets);

	const handleTicketChange = (selection: TicketSelection) => {
		const totalSelected = selection.adultTickets + selection.childTickets;
		const maxAllowedTickets = seatThreshold - reservedSeats;

		if (totalSelected > maxAllowedTickets) {
			// Prevent selection beyond the threshold by capping the tickets
			const excessTickets = totalSelected - maxAllowedTickets;
			let adjustedAdultTickets = selection.adultTickets;
			let adjustedChildTickets = selection.childTickets;

			if (selection.adultTickets > ticketSelection.adultTickets) {
				// Decrement adult tickets
				adjustedAdultTickets =
					ticketSelection.adultTickets +
					Math.max(
						selection.adultTickets -
							ticketSelection.adultTickets -
							excessTickets,
						0
					);
			}

			if (selection.childTickets > ticketSelection.childTickets) {
				// Decrement child tickets
				adjustedChildTickets =
					ticketSelection.childTickets +
					Math.max(
						selection.childTickets -
							ticketSelection.childTickets -
							excessTickets,
						0
					);
			}

			setTicketsSelection({
				adultTickets: Math.max(adjustedAdultTickets, 0),
				childTickets: Math.max(adjustedChildTickets, 0),
			});

			return;
		}

		setTicketsSelection(selection);
	};
	const openSeatPopup = () => {
		if (selectedShowtime) {
			setIsSeatPopupOpen(true);
		}
	};

	const closeSeatPopup = () => {
		setIsSeatPopupOpen(false);
	};
	const handleSeatsConfirmed = (seats: Seat[]) => {
		setSelectedSeats(seats);
		setIsSeatPopupOpen(false);
	};

	return (
		<div className="w-screen h-screen flex flex-1 flex-row">
			<div className="relative w-[48%] h-full flex flex-col items-center gap-5">
				<img
					src={movie.image}
					alt={movie.title}
					className="h-[40%] object-cover rounded"
				/>
				<h1 className="text-4xl font-bold text-white text-center">
					{movie.title}
				</h1>
				<span className="text-2xl font-semibold text-white text-center">
					{movie.runtime}
				</span>
				<span className="text-2xl font-semibold text-white text-center">
					{movie.premiere}
				</span>
				<span className="text-lg font-normal text-white text-center px-16">
					{movie.details}
				</span>
			</div>
			<div className="h-[100%] w-[1%] bg-[#e50914] rounded-full"></div>
			<div className="relative w-[48%] h-full flex flex-col gap-5 px-16">
				<h1 className="text-4xl font-bold text-white">Book Ticket</h1>
				<span className="text-2xl font-semibold text-dark4 cursor-not-allowed">
					Theatre Selection: {theatre.location}
				</span>
				<select
					className="p-2 text-lg font-semibold bg-dark2 text-white rounded-md cursor-pointer"
					value={selectedShowtime?.id || ""}
					onChange={(e) => {
						const selectedId = parseInt(e.target.value, 10);
						const selected =
							showtimes?.find((showtime) => showtime.id === selectedId) || null;
						setSelectedShowtime(selected);
					}}
				>
					<option value="" disabled>
						Select Showtime
					</option>
					{showtimes.map((showtime) => (
						<option key={showtime.id} value={showtime.id}>
							{new Date(showtime.dateTime).toLocaleString()}
						</option>
					))}
				</select>
				{selectedShowtime && (
					<>
						<TicketSelector
							onSelectionChange={handleTicketChange}
							remainingTickets={remainingTickets}
							adultTickets={ticketSelection.adultTickets}
							childTickets={ticketSelection.childTickets}
						/>
						<p className="text-sm text-dark4">
							{`Reserved: ${reservedSeats}, Available for Early Access: ${
								seatThreshold - reservedSeats
							}`}
						</p>
					</>
				)}
				<div className="flex justify-center items-center">
					<div
						onClick={() => {
							if (
								selectedShowtime !== null &&
								ticketSelection.adultTickets + ticketSelection.childTickets > 0
							)
								openSeatPopup();
						}}
						className={`flex flex-row gap-2 p-3 justify-center items-center font-bold rounded-lg transition-opacity duration-150 ${
							selectedShowtime === null ||
							ticketSelection.adultTickets + ticketSelection.childTickets === 0
								? "cursor-not-allowed bg-dark4 text-gray-300"
								: "cursor-pointer bg-white text-black active:opacity-75"
						}`}
					>
						<FontAwesomeIcon icon={faCouch} />
						<span>Select Seats</span>
					</div>
				</div>

				<div
					onClick={() => {
						if (
							selectedShowtime !== null &&
							ticketSelection.adultTickets + ticketSelection.childTickets > 0 &&
							selectedSeats.length > 0
						) {
							const payment: PaymentData = {
								movie: movie,
								theatre: theatre,
								showtime: selectedShowtime,
								ticketSelection: ticketSelection,
								seats: selectedSeats,
							};
							navigate(`/payment`, {
								state: { paymentData: payment },
							});
						}
					}}
					className={`flex flex-row gap-2 p-3 justify-center items-center font-bold rounded-lg transition-opacity duration-150 ml-auto ${
						selectedShowtime === null ||
						ticketSelection.adultTickets + ticketSelection.childTickets === 0 ||
						selectedSeats.length === 0
							? "cursor-not-allowed bg-dark4 text-gray-300"
							: "cursor-pointer bg-[#e50914] text-white active:opacity-75"
					}`}
				>
					<FontAwesomeIcon icon={faHandPeace} />
					<span>Place Order</span>
				</div>
			</div>
			{isSeatPopupOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
					<div className="relativep-4 rounded-lg">
						<SeatCard
							showtimeId={selectedShowtime?.id ?? 0}
							no_of_seats={
								ticketSelection.adultTickets + ticketSelection.childTickets
							}
							savedSeats={selectedSeats}
							onSeatsConfirmed={handleSeatsConfirmed}
							onClose={() => {
								setIsSeatPopupOpen(false);
							}}
						/>
						<button
							onClick={closeSeatPopup}
							className="absolute top-2 right-2 text-lg font-bold text-black"
						>
							×
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
