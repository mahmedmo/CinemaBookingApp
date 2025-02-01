import { Seat } from "./Seat";

export type Showtime = {
	id: number;
	dateTime: string;
	seats?: Seat[];
};
