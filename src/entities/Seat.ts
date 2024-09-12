import { ulid } from "ulid";

interface SeatParams {
  id?: string;
  movieId: string;
  rowLetter: string;
  colNumber: number;
  isBooked?: boolean;
  bookedTicketId?: string | null;
}

class Seat {
  id: string;  // ULID
  movieId: string;  // Foreign key reference to `movies` table
  rowLetter: string;  // A single character representing the row
  colNumber: number;  // 0 to 255 (1 byte unsigned integer)
  isBooked: boolean;
  bookedTicketId: string | null;  // Foreign key reference to `booked_tickets` table

  constructor(params: SeatParams) {
    this.id = params.id ?? ulid();
    this.movieId = params.movieId;
    this.rowLetter = params.rowLetter;
    this.colNumber = params.colNumber;
    this.isBooked = params.isBooked ?? false;
    this.bookedTicketId = params.bookedTicketId ?? null;
  }

  updateDetails(details: Partial<Omit<SeatParams, 'id' | 'movieId'>>): void {
    if (details.rowLetter) this.rowLetter = details.rowLetter;
    if (details.colNumber !== undefined) this.colNumber = details.colNumber;
    if (details.isBooked !== undefined) this.isBooked = details.isBooked;
    if (details.bookedTicketId !== undefined) this.bookedTicketId = details.bookedTicketId;
  }

  bookSeat(bookedTicketId: string): void {
    this.isBooked = true;
    this.bookedTicketId = bookedTicketId;
  }

  unbookSeat(): void {
    this.isBooked = false;
    this.bookedTicketId = null;
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      movieId: this.movieId,
      rowLetter: this.rowLetter,
      colNumber: this.colNumber,
      isBooked: this.isBooked,
      bookedTicketId: this.bookedTicketId,
    };
  }
}

export default Seat;
