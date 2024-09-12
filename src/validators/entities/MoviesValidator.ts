import { z } from "zod"

export const MovieValidator = z.object({
  id: z.string().ulid(),
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  imageUrl: z.string().url().max(2083),
  genre: z.string().min(1).max(50),
  showtime: z.date(),
  duration: z.string().time(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
})