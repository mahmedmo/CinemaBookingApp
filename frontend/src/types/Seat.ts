export type Seat = {
	id: number;
	row: number;
	column: number;
	reserved?: boolean;
	seat_no?: string;
};

export function calcSeatNo(row: number, column: number): string {
	if (row < 1 || column < 1) {
		throw new Error("Row and column must be greater than 0.");
	}

	const rowLetter = String.fromCharCode(64 + row);
	return `${rowLetter}${column}`;
}
