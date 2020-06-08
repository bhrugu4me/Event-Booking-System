export type GuestDetail = {
	guestId: number,
	eventId: number,
	guestName: string,
	guestEmail: string,
	guestPhoneNumber: string,
	bookedSeats: number,
	attendees: Array<string>,
};
