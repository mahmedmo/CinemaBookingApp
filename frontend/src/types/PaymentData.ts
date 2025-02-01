import { TicketSelection } from "../features/payment/types/PaymentTypes";
import { Movie } from "./Movie";
import { Seat } from "./Seat";
import { Showtime } from "./Showtime";
import { Theatre } from "./Theatre";
export type PaymentData = {
	movie: Movie;
	theatre: Theatre;
	ticketSelection: TicketSelection;
	showtime: Showtime;
	seats: Seat[];
};
