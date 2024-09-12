import { FastifyPluginAsync } from "fastify";
import MovieRepository from "../repositories/movieRepository";
import Movie, { MovieParams } from "../entities/Movie";
import { MovieValidator } from "../validators/entities/MoviesValidator";
import { MovieNotFoundError, InvalidParametersError, DatabaseError } from "../errors"; // Import custom errors
import { z } from "zod"

export const moviesController: FastifyPluginAsync = async (instance, opts): Promise<void> => {
  const moviesRepo = new MovieRepository();

  instance.get("/", async (request, reply) => {
    const movies = await moviesRepo.getAll();
    reply.type('application/json').send(movies);
  });

  instance.get("/:movieId", async (request, reply) => {
    const { movieId } = request.params as { movieId: string };

    const movie = await moviesRepo.searchById(movieId);

    if (!movie) {
      throw new MovieNotFoundError(`Movie with ID ${movieId} not found`);
    }

    reply.type('application/json').send(movie);
  });

  instance.post("/", async (request, reply) => {
    const maybeMovie = request.body as Partial<MovieParams>;

    try {
      const validatedMovie = MovieValidator.parse(maybeMovie)
      const newMovie = new Movie(validatedMovie)
      await moviesRepo.add(newMovie)
    } catch (error) {
      if (error instanceof z.ZodError)
        throw new InvalidParametersError("Validation failed", error.errors);
      else
        throw new DatabaseError("Failed to add movie");
    }
  });

  instance.patch("/:movieId", async (request, reply) => {
    const { movieId } = request.params as { movieId: string };
    const body = request.body as Partial<MovieParams>;

    let movie: Movie | null;
    try {
      movie = await moviesRepo.searchById(movieId);
    } catch (error) {
      throw new DatabaseError("Failed to update movie");
    }

    if (!movie) {
      throw new MovieNotFoundError(`Movie with ID ${movieId} not found`);
    }

    try {
      const validatedData = MovieValidator.partial().parse(body)
      movie.updateDetails(validatedData);

      await moviesRepo.update(movie);
      reply.status(200).send({ success: true, movie: movie.toDTO() });
    } catch (error) {
      if (error instanceof z.ZodError)
        throw new InvalidParametersError("Validation failed", error.errors);
      else
        throw new DatabaseError(`Failed to update:  ${movie.title}`);
    }
  });

  instance.delete("/:movieId", async (request, reply) => {
    const { movieId } = request.params as { movieId: string };
    const movieExist = await moviesRepo.exist(movieId);

    if (!movieExist) {
      throw new MovieNotFoundError(`Movie with ID ${movieId} not found`);
    }

    await moviesRepo.delete(movieId);
    reply.status(204).send();
  });
};
