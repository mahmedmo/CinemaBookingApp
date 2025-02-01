import axios from "axios";
import { Address } from "../types/Address";
import { Payment } from "../types/Payment";
import { User } from "../types/User";
import { API_URL } from "../constants";
import { ValidateResponse } from "../types/ValidateResponse";

export class UserService {
	// Get either a user or a registered user by ID
	async getUserOrRegisteredUserById(userId: number): Promise<User> {
		try {
			const response = await axios.get(`${API_URL}/users/${userId}`);
			console.log("User response:", response.data);
			const payment = await this.getPaymentById(response.data.paymentId);
			const address = await this.getAddressById(response.data.addressId);
			const email = await this.getEmailByUserId(response.data.id);
			const user: User = {
				id: response.data.id,
				email: email,
				payment: payment,
				address: address,
			};
			return user;
		} catch (error) {
			throw error;
		}
	}

	// Create a user with just an email
	async createUser(email: string): Promise<User> {
		try {
			const response = await axios.post(`${API_URL}/users/create`, null, {
				params: { email },
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	// Register a user with address, payment, and password details
	async registerUser(
		email: string,
		street: string,
		city: string,
		state: string,
		zipCode: string,
		cardNumber: string,
		expiry: string,
		cvv: string,
		password: string
	): Promise<User> {
		try {
			const response = await axios.post(
				`${API_URL}/users/register`,
				{
					email,
					street,
					city,
					state,
					zipCode,
					cardNumber,
					expiry,
					cvv,
					password,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	// Retrieve user ID by email
	static async getUserIdByEmail(email: string): Promise<number> {
		try {
			const response = await axios.get(`${API_URL}/users/id`, {
				params: { email },
			});
			return response.data;
		} catch (error) {
			throw error;
		}
	}
	// Retrieve email by user ID
	async getEmailByUserId(userId: number): Promise<string> {
		try {
			const response = await axios.get(`${API_URL}/users/${userId}/email`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	// Validate password
	async validatePassword(
		email: string,
		password: string
	): Promise<User | null> {
		try {
			const response = await axios.post(`${API_URL}/users/validate`, null, {
				params: { email, password },
			});

			const validateResponse: ValidateResponse = response.data;

			if (validateResponse.valid && validateResponse.userId) {
				return this.getUserOrRegisteredUserById(validateResponse.userId);
			}
			return null;
		} catch (error) {
			throw error;
		}
	}

	// Get address by ID
	async getAddressById(addressId: number): Promise<Address> {
		try {
			const response = await axios.get(`${API_URL}/users/address/${addressId}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	// Get payment by ID
	async getPaymentById(paymentId: number): Promise<Payment> {
		try {
			const response = await axios.get(`${API_URL}/users/payment/${paymentId}`);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
}
