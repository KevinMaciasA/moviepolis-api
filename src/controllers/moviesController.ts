import { FastifyPluginAsync } from "fastify";
import MovieRepository from "../repositories/movieRepository";
import Movie, { MovieParams } from "../entities/Movie";
import MovieValidator from "../validators/entities/MoviesValidator";
import { MovieNotFoundError, InvalidParametersError, DatabaseError } from "../errors"; // Import custom errors

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

    const validation = MovieValidator.validate(maybeMovie);

    if (!validation.valid) {
      throw new InvalidParametersError("Validation failed", validation.errors);
    }

    const newMovie = new Movie(maybeMovie as MovieParams);

    try {
      await moviesRepo.add(newMovie);
      reply.status(201).type('application/json').send({ success: true, movie: newMovie });
    } catch (error) {
      throw new DatabaseError("Failed to add movie"); // You can create a custom error for this if needed
    }
  });

  instance.patch("/:movieId", async (request, reply) => {
    const { movieId } = request.params as { movieId: string };
    const body = request.body as Partial<MovieParams>;

    if (Object.keys(body).length === 0) {
      throw new InvalidParametersError("No fields to update provided");
    }

    const movie = await moviesRepo.searchById(movieId);

    if (!movie) {
      throw new MovieNotFoundError(`Movie with ID ${movieId} not found`);
    }

    movie.updateDetails(body);

    try {
      await moviesRepo.update(movie);
      reply.status(200).send({ success: true, movie: movie.toDTO() });
    } catch (error) {
      throw new DatabaseError("Failed to update movie"); // You can create a custom error for this if needed
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
