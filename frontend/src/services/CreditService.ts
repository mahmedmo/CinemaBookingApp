import axios from "axios";
import { API_URL } from "../constants";
import { Credit } from "../types/Credit";

export class CreditService {
	public static async getAllCredits(): Promise<Credit[]> {
		try {
			const response = await axios.get<Credit[]>(`${API_URL}/credits`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	public static async getCreditsByUserId(userId: number): Promise<Credit[]> {
		try {
			const response = await axios.get<Credit[]>(
				`${API_URL}/credits/user/${userId}`
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	public static async createCredit(credit: Credit): Promise<Credit> {
		try {
			const response = await axios.post<Credit>(`${API_URL}/credits`, credit);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	public static async deleteCreditById(id: number): Promise<void> {
		try {
			await axios.delete(`${API_URL}/credits/${id}`);
		} catch (error) {
			throw error;
		}
	}

	public static async addCredit(
		userId: number,
		amount: number
	): Promise<Credit> {
		try {
			const response = await axios.post<Credit>(
				`${API_URL}/credits/add/${userId}`,
				amount
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	public static async deductCredit(
		userId: number,
		amount: number
	): Promise<Credit> {
		try {
			const response = await axios.post<Credit>(
				`${API_URL}/credits/deduct/${userId}`,
				amount
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}
