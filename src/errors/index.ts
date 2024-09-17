import { FastifyError } from "fastify";
import { SchemaErrorDataVar, FastifySchemaValidationError } from "fastify/types/schema";
import { ZodError } from "zod";

export class MovieNotFoundError extends Error {
  constructor(message: string = "Movie not found") {
    super(message);
    this.name = "MovieNotFoundError";
  }
}

export class InvalidParametersError implements FastifyError {
  code: string = "VALIDATION_ERROR";
  name: string = "InvalidParametersError";
  statusCode: number = 400;
  validationContext?: SchemaErrorDataVar;
  validation?: FastifySchemaValidationError[];
  message: string;
  stack?: string;

  constructor(params: { message: string });
  constructor(params: ZodError);
  constructor(params: ZodError | { message: string }) {
    if (params instanceof ZodError) {
      this.message = this.stringifyError(params);
      this.stack = params.stack;
    } else {
      this.message = params.message
    }
  }

  private stringifyError(errors: ZodError): string {
    return errors.issues.map(error => `${error.path.join(", ")}: ${error.message}`).join(". ")
  }
}

export class DatabaseError extends Error {
  constructor(message: string = "Database operation failed") {
    super(message);
    this.name = "DatabaseError";
  }
}

