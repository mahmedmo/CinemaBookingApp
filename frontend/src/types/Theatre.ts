import { TheatreMovie } from "./TheatreMovie";

export type Theatre = {
    id: number;
    location: string;
    theatre_movies?: TheatreMovie[];
}