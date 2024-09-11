import { db } from "./database";
import Movie from "../entities/Movie";

class MovieRepository {
  private table: string = 'movies'

  async getAll(): Promise<Movie[]> {
    const query = `SELECT * FROM ${this.table}`;
    const [rows] = await db.execute(query);
    return rows as Movie[];
  }

  async searchById(id: string): Promise<Movie | null> {
    const query = `SELECT * FROM ${this.table} WHERE id = ?`
    const [rows] = await db.execute(query, [id])
    const movies = rows as Movie[];
    return movies.length > 0 ? movies[0] : null;
  }

  async searchByTitle(title: string): Promise<Movie[] | null> {
    const query = `SELECT * FROM ${this.table} WHERE title LIKE ?`
    const searchTerm = `%${title}%`
    const [rows] = await db.execute(query, [searchTerm]);
    const movies = rows as Movie[];
    return movies.length > 0 ? movies : null;
  }

  async exist(id: string): Promise<boolean> {
    const movie = await this.searchById(id)

    return !!movie
  }

  async add(movie: Movie): Promise<any> {
    const query = `INSERT INTO ${this.table} (id, title, description, image_url, genre,
    showtime, duration, created_at, updated_at)
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
    const query = `UPDATE ${this.table} SET title = ?, description = ?, image_url = ?,
    genre = ?, showtime = ?, duration = ?, created_at = ?, updated_at = ? WHERE id = ?`;

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

  async delete(id: string): Promise<any>;
  async delete(movie: Movie): Promise<any>;
  async delete(param: string | Movie): Promise<any> {
    const id = param instanceof Movie ? param.id : param;
    const query = `DELETE FROM ${this.table} WHERE id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
  }
}

export default MovieRepository;
