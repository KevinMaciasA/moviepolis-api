interface MovieParams {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  genre: string;
  showtime: Date;
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
    this.id = params.id || ""; // ?? generateULID() TODO: 
    this.title = params.title;
    this.description = params.description;
    this.imageUrl = params.imageUrl;
    this.genre = params.genre;
    this.showtime = params.showtime;
    this.duration = params.duration;
    this.createdAt = params.createdAt || new Date();
    this.updatedAt = params.updatedAt || new Date();
  }

  updateDetails(details: Partial<Omit<MovieParams, 'id' | 'createdAt'>>): void {
    if (details.title) this.title = details.title;
    if (details.description) this.description = details.description;
    if (details.imageUrl) this.imageUrl = details.imageUrl;
    if (details.genre) this.genre = details.genre;
    if (details.showtime) this.showtime = details.showtime;
    if (details.duration) this.duration = details.duration;
    this.updatedAt = new Date(); // Automatically update timestamp
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

  toDTO(): MovieDTO {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      imageUrl: this.imageUrl,
      genre: this.genre,
      showtime: this.showtime.toISOString(),
      duration: this.duration,
    }
  }
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

export { MovieParams, MovieDTO };