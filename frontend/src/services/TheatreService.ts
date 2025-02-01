import axios from "axios";
import { API_URL } from "../constants";
import { Theatre } from "../types/Theatre";

export class TheatreService {
	public static async getTheatres(): Promise<Theatre[]> {
		const response = await axios.get<Theatre[]>(`${API_URL}/theatres`);
		return response.data;
	}

	public static async getTheatreLocationById(id: number): Promise<string> {
		const response = await axios.get<string>(
			`${API_URL}/theatres/${id}/location`
		);
		return response.data;
	}

	public static async getTheatreMoviesById(id: number): Promise<number[]> {
		const response = await axios.get<number[]>(
			`${API_URL}/theatres/${id}/movies`
		);
		return response.data;
	}
}
