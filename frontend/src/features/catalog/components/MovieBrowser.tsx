import { useEffect, useState } from "react";
import MovieComponent from "./MovieComponent";
import SearchBar from "./SearchBar";
import MoviePopup from "./MoviePopup";
import { Movie } from "../../../types/Movie";
import {
	faFaceSadTear,
	faFilm,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TheatreService } from "../../../services/TheatreService";
import { TheatreMovieService } from "../../../services/TheatreMovieService";
import { Theatre } from "../../../types/Theatre";
import { useUser } from "../../../app/UserContext";
import { useNavigate } from "react-router-dom";
import { ShowtimeService } from "../../../services/ShowtimeService";
export const MovieBrowser = () => {
	const { user } = useUser();
	const navigate = useNavigate();
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [selectedTheater, setSelectedTheater] = useState<Theatre | null>(null);
	const [theaterList, setTheaterList] = useState<Theatre[]>([]);
	const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

	const [searchQuery, setSearchQuery] = useState("");
	const [movieList, setMovieList] = useState<Movie[]>([]);
	const [movieAccessMap, setMovieAccessMap] = useState<
		Record<
			number,
			{ restricted: boolean; earlyAccess: boolean; isFull: boolean }
		>
	>({});
	const filteredMovies = movieList.filter((movie) =>
		movie.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleTheaterSelect = (theater: Theatre) => {
		setSelectedTheater(theater);
		setIsPopupOpen(false);
	};
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	useEffect(() => {
		const fetchTheatres = async () => {
			try {
				const theatres = await TheatreService.getTheatres();
				setTheaterList(theatres);
			} catch (error) {}
		};
		fetchTheatres();
	}, []);

	// Calculate movie access based on if a user is registered or not / early access / full
	useEffect(() => {
		const fetchMovies = async () => {
			if (!selectedTheater) return;
			try {
				const theatreId = selectedTheater.id;
				const movies = await TheatreMovieService.getMoviesByTheatre(theatreId);

				const accessMap: Record<
					number,
					{ restricted: boolean; earlyAccess: boolean; isFull: boolean }
				> = {};

				await Promise.all(
					movies.map(async (movie) => {
						const theatreMovie =
							await TheatreMovieService.getTheatreMovieByMovieAndTheatre(
								movie.id,
								theatreId
							);
						if (!theatreMovie) return;

						const showtimes = await TheatreMovieService.getShowtimesById(
							theatreMovie.id
						);

						const latestShowtime = new Date(
							Math.max(
								...showtimes.map((st) => new Date(st.dateTime).getTime())
							)
						);
						const currentDate = new Date();
						const diffDays =
							(latestShowtime.getTime() - currentDate.getTime()) /
							(1000 * 60 * 60 * 24);

						const earlyAccess =
							diffDays > 10 && Boolean(user?.payment) && Boolean(user?.address);
						const restricted =
							diffDays > 10 && (!user || !user.payment || !user.address);

						let isFull = true;

						if (earlyAccess) {
							for (const showtime of showtimes) {
								const seatmap = await ShowtimeService.getSeatmapById(
									showtime.id
								);
								const totalSeats = seatmap.numOfRows * seatmap.numOfCols;

								const seats = await ShowtimeService.getSeatsByShowtimeId(
									showtime.id
								);

								let reservedSeatsCount = 0;
								for (const seat of seats) {
									const reserved = await ShowtimeService.isSeatReserved(
										showtime.id,
										seat.id
									);
									if (reserved) {
										reservedSeatsCount++;
									}
								}

								const occupancyPercentage =
									(reservedSeatsCount / totalSeats) * 100;

								if (occupancyPercentage < 10) {
									isFull = false;
									break;
								}
							}
						} else {
							isFull = false;
						}

						accessMap[movie.id] = {
							restricted,
							earlyAccess,
							isFull,
						};
					})
				);

				setMovieAccessMap(accessMap);
				setMovieList(movies);
			} catch (error) {
				console.error("Failed to fetch movies", error);
			}
		};
		fetchMovies();
	}, [selectedTheater, user]);

	return (
		<div className="w-screen h-screen flex flex-col">
			<div className="flex flex-row items-center w-full px-10 mb-5 relative">
				<div
					className="text-4xl font-bold text-white absolute left-1/2 transform -translate-x-1/2"
					style={{
						top: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					Browse Movies
				</div>

				<div
					onClick={() => {
						setIsPopupOpen(true);
					}}
					className="flex flex-row gap-2 items-center cursor-pointer transition-opacity duration-150 active:opacity-75 text-dark4 font-bold bg-dark1 ml-auto rounded-md px-4 py-2"
					style={{
						userSelect: "none",
					}}
				>
					<FontAwesomeIcon icon={faFilm} />
					<span className="flex-1">Change Theatre</span>
					<span className="ml-2 text-white block truncate max-w-[12rem]">
						{selectedTheater?.location || "Select Theatre"}
					</span>
				</div>
			</div>
			<div
				className="w-2/3 h-16 mt-5 mb-16"
				style={{ alignSelf: "center", justifyContent: "center" }}
			>
				<SearchBar onChange={(e) => setSearchQuery(e.target.value)} />
			</div>
			<div className="w-full h-full overflow-y-scroll flex flex-row flex-wrap gap-5 align-middle justify-center pb-16">
				{filteredMovies.length > 0 ? (
					filteredMovies.map((movie, index) => (
						<MovieComponent
							key={index}
							movie={movie}
							isRestricted={movieAccessMap[movie.id]?.restricted || false}
							isEarlyAccess={movieAccessMap[movie.id]?.earlyAccess || false}
							isFull={movieAccessMap[movie.id]?.isFull || false}
							onClick={() => {
								if (
									!movieAccessMap[movie.id]?.restricted &&
									!movieAccessMap[movie.id]?.isFull
								) {
									setSelectedMovie(movie);
								} else if (movieAccessMap[movie.id]?.restricted) {
									navigate("/register");
								}
							}}
						/>
					))
				) : (
					<div className="text-center text-dark4 mt-20 text-xl">
						<FontAwesomeIcon icon={faFaceSadTear} />
						<span className="pl-2">Such empty...</span>
					</div>
				)}
			</div>
			{selectedMovie && selectedTheater && (
				<MoviePopup
					movie={selectedMovie}
					theatre={selectedTheater}
					onClose={() => setSelectedMovie(null)}
				/>
			)}
			{(isPopupOpen || !selectedTheater) && (
				<div
					className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-80 flex items-center justify-center"
					style={{ zIndex: 1000 }}
				>
					<div
						className="relative w-1/5 bg-dark1 p-5 rounded-xl text-white animate-zoomInBounce"
						style={{
							maxHeight: "40vh",
							overflow: "hidden",
						}}
					>
						{selectedTheater && (
							<div
								className="absolute top-1 right-4 text-white text-2xl cursor-pointer z-20"
								onClick={() => setIsPopupOpen(false)}
							>
								<FontAwesomeIcon icon={faXmark} />
							</div>
						)}
						<h2 className="text-2xl font-bold mb-4">Select a Theatre</h2>

						<div
							className="overflow-y-auto"
							style={{
								maxHeight: "calc(40vh - 100px)",
								paddingBottom: "1rem",
							}}
						>
							<ul className="flex flex-col gap-4">
								{theaterList.map((theater) => (
									<li
										key={theater.id}
										onClick={() => handleTheaterSelect(theater)}
										className="p-3 bg-dark2 rounded-md hover:bg-dark3 cursor-pointer transition"
									>
										{theater.location}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
