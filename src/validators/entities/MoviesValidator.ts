// src/validators/MovieValidator.ts
import Movie from "../../entities/Movie";

class MovieValidator {
  static validate(movieData: Partial<Movie>): { valid: boolean; errors?: string[] } {
    const errors: string[] = [];

    if (!movieData.title) errors.push("Title is required.");
    if (!movieData.description) errors.push("Description is required.");
    if (!movieData.imageUrl) errors.push("Image URL is required.");
    if (!movieData.genre) errors.push("Genre is required.");
    if (!movieData.showtime) errors.push("Showtime is required.");
    if (!movieData.duration) errors.push("Duration is required.");

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export default MovieValidator;
