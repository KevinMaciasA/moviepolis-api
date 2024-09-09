import fastify from 'fastify'
import errorHandler from './errors/handler'
import rootRoute from './routes/rootRoute'
import pagesRoute from './routes/pagesRoute'
import mysqlPlugin from '@fastify/mysql'
import { db, initDatabase } from './repositories/database'
import MovieRepository from './repositories/movieRepository'

const server = fastify()

server.register(mysqlPlugin, {
  promise: true,
  connectionString: "mysql://root:password@localhost/moviepolis",
})
server.register(rootRoute, { prefix: "/v1" })
// server.register(pagesRoute, { prefix: "/v1/pages" })

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