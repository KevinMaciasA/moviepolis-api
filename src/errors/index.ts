import { ZodIssue } from "zod";

export class MovieNotFoundError extends Error {
  constructor(message: string = "Movie not found") {
    super(message);
    this.name = "MovieNotFoundError";
  }
}

export class InvalidParametersError extends Error {
  constructor(message: string = "Invalid parameters provided", errors?: ZodIssue[]) {
    super(message);
    this.name = "InvalidParametersError";
  }
}

export class DatabaseError extends Error {
  constructor(message: string = "Database operation failed") {
    super(message);
    this.name = "DatabaseError";
  }
}

