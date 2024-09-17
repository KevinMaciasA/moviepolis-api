import fastify from 'fastify'
import errorHandler from './errors/handler'
import rootController from './controllers/rootController'
import mysqlPlugin from '@fastify/mysql'
import { initDatabase } from './repositories/database'
import { moviesController } from './controllers/moviesController'
import databaseProxy from './plugins/DatabaseProxy'

const server = fastify()

server.register(mysqlPlugin, {
  promise: true,
  connectionString: "mysql://root:password@localhost/moviepolis",
})
server.register(databaseProxy)
server.register(rootController, { prefix: "/v1" })
server.register(moviesController, { prefix: "/v1/movies" })

server.after(() => {
  initDatabase(server)
})

server.setErrorHandler(errorHandler)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})