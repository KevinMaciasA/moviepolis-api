import { db } from "./database";
import Movie from "../entities/Movie";

export async function getMovies() {
  const query = `SELECT * FROM movies`
  const [result] = await db.execute(query)
  return result as Movie[]
}