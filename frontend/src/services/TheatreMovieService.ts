import axios from "axios";
import { API_URL } from "../constants";
import { Movie } from "../types/Movie";
import { TheatreMovie } from "../types/TheatreMovie";
import { TheatreService } from "./TheatreService";
import { Showtime } from "../types/Showtime";

export class TheatreMovieService {
	public static async findTheatreMovieById(id: number): Promise<TheatreMovie> {
		const response = await axios.get<TheatreMovie>(
			`${API_URL}/theatremovies/${id}`
		);
		return response.data;
	}

	public static async getMoviesByTheatre(theatreId: number): Promise<Movie[]> {
		try {
			const movieIds = await TheatreService.getTheatreMoviesById(theatreId);

			const moviePromises = movieIds.map((movieId) =>
				this.getMovieById(movieId)
			);

			const movies = await Promise.all(moviePromises);
			return movies;
		} catch (error) {
			throw error;
		}
	}

	public static async getTheatreMovieByMovieAndTheatre(
		movieId: number,
		theatreId: number
	): Promise<TheatreMovie | null> {
		try {
			const theatreMovieIds = await TheatreService.getTheatreMoviesById(
				theatreId
			);

			// Iterate through each TheatreMovie to find the one with the matching movie ID
			for (const theatreMovieId of theatreMovieIds) {
				const movie = await this.getMovieById(theatreMovieId);

				if (movie.id === movieId) {
					return await this.findTheatreMovieById(theatreMovieId);
				}
			}

			return null;
		} catch (error) {
			throw error;
		}
	}

	public static async getMovieById(id: number): Promise<Movie> {
		const response = await axios.get<Movie>(
			`${API_URL}/theatremovies/${id}/movie`
		);
		return response.data;
	}

	public static async getShowtimesById(id: number): Promise<Showtime[]> {
		const response = await axios.get<Showtime[]>(
			`${API_URL}/theatremovies/${id}/showtimes`
		);
		return response.data;
	}
}
