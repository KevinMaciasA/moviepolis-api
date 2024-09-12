import { ulid } from "ulid";

interface BookedTicketParams {
  id?: string;
  userId: string;
  movieId: string;
  bookingTime?: Date;
  numberOfTickets: number;
}

class BookedTicket {
  id: string;  // ULID
  userId: string;  // Foreign key reference to `users` table
  movieId: string;  // Foreign key reference to `movies` table
  bookingTime: Date;
  numberOfTickets: number;

  constructor(params: BookedTicketParams) {
    this.id = params.id ?? ulid();
    this.userId = params.userId;
    this.movieId = params.movieId;
    this.bookingTime = params.bookingTime ?? new Date();
    this.numberOfTickets = params.numberOfTickets;
  }

  updateDetails(details: Partial<Omit<BookedTicketParams, 'id' | 'userId' | 'movieId'>>): void {
    if (details.bookingTime) this.bookingTime = details.bookingTime;
    if (details.numberOfTickets !== undefined) this.numberOfTickets = details.numberOfTickets;
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      userId: this.userId,
      movieId: this.movieId,
      bookingTime: this.bookingTime.toISOString(),
      numberOfTickets: this.numberOfTickets,
    };
  }
}

export default BookedTicket;
