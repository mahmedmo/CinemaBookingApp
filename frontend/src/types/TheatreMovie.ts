import { Movie } from "./Movie";
export type TheatreMovie = {
	id: number;
	theatre_id: number;
	movies: Movie;
	showtime: string[];
};
