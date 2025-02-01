import axios from "axios";
import { API_URL } from "../constants";
import { Seat } from "../types/Seat";
import { Seatmap } from "../types/Seatmap";

export class ShowtimeService {
	public static async getShowtimeDateById(id: number): Promise<string> {
		try {
			const response = await axios.get<string>(
				`${API_URL}/showtimes/${id}/date`
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	public static async getSeatmapById(id: number): Promise<Seatmap> {
		try {
			const response = await axios.get<Seatmap>(
				`${API_URL}/showtimes/${id}/seatmap`
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	public static async getSeatsByShowtimeId(
		showtimeId: number
	): Promise<Seat[]> {
		try {
			const response = await axios.get<Seat[]>(
				`${API_URL}/showtimes/${showtimeId}/seats`
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	public static async isSeatReserved(
		showtimeId: number,
		seatId: number
	): Promise<boolean> {
		try {
			const response = await axios.get<boolean>(
				`${API_URL}/showtimes/${showtimeId}/seats/${seatId}/reserved`
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	public static async setSeatReserved(
		showtimeId: number,
		seatId: number
	): Promise<void> {
		try {
			await axios.post(
				`${API_URL}/showtimes/${showtimeId}/seats/${seatId}/reserve`
			);
		} catch (error) {
			throw error;
		}
	}
}
