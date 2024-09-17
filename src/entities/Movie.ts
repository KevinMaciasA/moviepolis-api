import { ulid } from "ulid";

interface MovieParams {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  genre: string;
  showtime: string;
  duration: string;
  createdAt?: Date;
  updatedAt?: Date;
}

class Movie {
  id: string;  // ULID
  title: string;
  description: string;
  imageUrl: string;
  genre: string;
  showtime: Date;
  duration: string;  // Format: 'HH:MM:SS'
  createdAt: Date;
  updatedAt: Date;

  constructor(params: MovieParams) {
    this.id = params.id || ulid()
    this.title = params.title;
    this.description = params.description;
    this.imageUrl = params.imageUrl;
    this.genre = params.genre;
    this.showtime = new Date(params.showtime);
    this.duration = params.duration;
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
  }

  static updater(
    target: Movie | MovieObject,
    details: Partial<Omit<MovieParams, 'id' | 'updatedAt' | 'createdAt'>>
  ): Movie | MovieObject {
    if (details.title) target.title = details.title;
    if (details.description) target.description = details.description;
    if (details.imageUrl) target.imageUrl = details.imageUrl;
    if (details.genre) target.genre = details.genre;
    if (details.showtime) target.showtime = new Date(details.showtime);
    if (details.duration) target.duration = details.duration;
    target.updatedAt = new Date(); // Automatically update timestamp
    return target
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      imageUrl: this.imageUrl,
      genre: this.genre,
      showtime: this.showtime.toISOString(),
      duration: this.duration,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }

  static toDTO(target: Movie | MovieObject): MovieDTO {
    return {
      id: target.id,
      title: target.title,
      description: target.description,
      imageUrl: target.imageUrl,
      genre: target.genre,
      showtime: target.showtime.toISOString(),
      duration: target.duration
    }
  }
}

interface MovieObject {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  genre: string;
  showtime: Date;
  duration: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MovieDTO {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  genre: string;
  showtime: string;
  duration: string;
}

export default Movie;

export { MovieParams, MovieDTO, MovieObject };