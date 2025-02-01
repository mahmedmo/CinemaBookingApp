import { LocalDateTime } from "@js-joda/core";

export type Receipt = {
	datePlaced: LocalDateTime;
	cost: number;
	userId: number;
	ticketId: number;
};
