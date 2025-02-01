import { Address } from "./Address";
import { Payment } from "./Payment";

export type User = {
	id: number;
	email: string;
	payment?: Payment;
	address?: Address;
};
