import fastify from 'fastify'
import errorHandler from './errors/handler'
import rootController from './controllers/rootController'
import mysqlPlugin from '@fastify/mysql'
import { initDatabase } from './repositories/database'
import MovieRepository from './repositories/movieRepository'
import { moviesController } from './controllers/moviesController'

const server = fastify()

server.register(mysqlPlugin, {
  promise: true,
  connectionString: "mysql://root:password@localhost/moviepolis",
})
server.register(rootController, { prefix: "/v1" })
server.register(moviesController, { prefix: "/v1/movies" })

server.after(() => {
  initDatabase(server)
  const movies = new MovieRepository()
  movies.getAll().then(value => console.log(value))
})

server.setErrorHandler(errorHandler)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})