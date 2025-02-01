import axios from "axios";
import { API_URL } from "../constants";
import { Receipt } from "../types/Receipt";

export class ReceiptService {
	public static async createReceipt(receipt: Receipt): Promise<Receipt> {
		try {
			const response = await axios.post<Receipt>(
				`${API_URL}/receipts`,
				receipt
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}
