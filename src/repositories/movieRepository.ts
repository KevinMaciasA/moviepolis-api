import { db } from "./database";
import Movie from "../entities/Movie";

class MovieRepository {
  async getAll(): Promise<Movie[]> {
    const query = `SELECT * FROM movies`;
    const [result] = await db.execute(query);
    return result as Movie[];
  }

  async add(movie: Movie): Promise<any> {
    const query = `INSERT INTO movies (id, title, description, image_url, genre, showtime,
    duration, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const [result] = await db.execute(query, [
      movie.id,
      movie.title,
      movie.description,
      movie.imageUrl,
      movie.genre,
      movie.showtime,
      movie.duration,
      movie.createdAt,
      movie.updatedAt,
    ]);
    return result;
  }

  async update(movie: Movie): Promise<any> {
    const query = `UPDATE movies SET title = ?, description = ?, image_url = ?, genre = ?, 
    showtime = ?, duration = ?, created_at = ?, updated_at = ? WHERE id = ?`;

    const [result] = await db.execute(query, [
      movie.title,
      movie.description,
      movie.imageUrl,
      movie.genre,
      movie.showtime,
      movie.duration,
      movie.createdAt,
      movie.updatedAt,
      movie.id,
    ]);
    return result;
  }

  async delete(param: string): Promise<any>;
  async delete(param: Movie): Promise<any>;
  async delete(param: string | Movie): Promise<any> {
    const id = param instanceof Movie ? param.id : param;
    const query = `DELETE FROM movies WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
  }
}

export default MovieRepository;
