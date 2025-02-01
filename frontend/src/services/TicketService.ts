import axios from "axios";
import { API_URL } from "../constants";
import { Ticket } from "../types/Ticket";

export class TicketService {
	public static async createTicket(ticket: Ticket): Promise<Ticket> {
		try {
			const response = await axios.post<Ticket>(`${API_URL}/tickets`, ticket);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	public static async getTicketById(id: number): Promise<Ticket> {
		try {
			const response = await axios.get<Ticket>(`${API_URL}/tickets/${id}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	public static async cancelTicket(id: number): Promise<Ticket> {
		try {
			const response = await axios.post<Ticket>(
				`${API_URL}/tickets/${id}/cancel`
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}
