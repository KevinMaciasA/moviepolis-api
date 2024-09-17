import { FastifyPluginAsync } from "fastify";
import MovieRepository from "../repositories/movieRepository";
import Movie, { MovieObject } from "../entities/Movie";
import { MovieValidator, NewMovieValidator } from "../validators/entities/MoviesValidator";
import { MovieNotFoundError, InvalidParametersError, DatabaseError } from "../errors"; // Import custom errors
import { toCamelCase } from "../utils/casing";
import { z } from "zod"

export const moviesController: FastifyPluginAsync = async (instance, opts): Promise<void> => {
  const moviesRepo = new MovieRepository();

  instance.get("/", async (request, reply) => {
    try {
      const movies = await moviesRepo.getAll();
      const output = movies.map(movie => Movie.toDTO(movie))
      reply.type('application/json').send(output);
    } catch (error) {
      throw new DatabaseError("Failed to connect to the database");
    }
  });

  instance.get("/:movieId", async (request, reply) => {
    const { movieId } = request.params as { movieId: string };

    const movie = await moviesRepo.searchById(movieId);

    if (!movie) {
      throw new MovieNotFoundError(`Movie with ID ${movieId} not found`);
    }

    reply.type('application/json').send(Movie.toDTO(movie));
  });

  instance.post("/", async (request, reply) => {
    const maybeMovie = request.body;
    try {
      const validatedData = NewMovieValidator.parse(maybeMovie)
      const newMovie = new Movie(validatedData)
      await moviesRepo.add(newMovie)
      reply.code(201).send({ succes: true, movie: Movie.toDTO(newMovie) })
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new InvalidParametersError(error);
      }
      else {
        throw new DatabaseError("Failed to add movie");
      }
    }
  });

  instance.patch("/:movieId", async (request, reply) => {
    const { movieId } = request.params as { movieId: string };
    const body = request.body;

    let movie: MovieObject | null;
    try {
      movie = await moviesRepo.searchById(movieId);
    } catch (error) {
      throw new DatabaseError("Failed to connect to the database");
    }

    if (!movie) {
      throw new MovieNotFoundError(`Movie with ID '${movieId}' was not found`);
    }

    try {
      const validatedData = MovieValidator
        .omit({ id: true, updatedAt: true, createdAt: true })
        .partial()
        .parse(body)
      Movie.updater(movie, validatedData)
      await moviesRepo.update(movie);
      reply.status(200).send({ success: true, movie: Movie.toDTO(movie) });
    } catch (error) {
      if (error instanceof z.ZodError)
        throw new InvalidParametersError(error);
      else {
        throw new DatabaseError(`Failed to update: ${movie.title}`);
      }
    }
  });

  instance.delete("/:movieId", async (request, reply) => {
    const { movieId } = request.params as { movieId: string };
    const movieExist = await moviesRepo.exist(movieId);

    if (!movieExist) {
      throw new MovieNotFoundError(`Movie with ID ${movieId} not found`);
    }

    try {
      await moviesRepo.delete(movieId);
      reply.status(204).send();
    } catch (error) {
      throw new DatabaseError(`Failed to delete movie with id: ${movieId}`);
    }
  });
};
