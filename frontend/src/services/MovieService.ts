import axios from "axios";
import { API_URL } from "../constants";
import { Movie } from "../types/Movie";

export class MovieService {
	public static async findMovieById(id: number): Promise<Movie> {
		try {
			const response = await axios.get<Movie>(`${API_URL}/movies/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}
