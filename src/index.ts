import fastify from 'fastify'
import errorHandler from './errors/handler'
import rootRoute from './routes/rootRoute'
import pagesRoute from './routes/pagesRoute'
import mysqlPlugin from '@fastify/mysql'

const server = fastify({ logger: true })

// Web API
// API that serves a webpage html
// TODO:
// pages:
// - home
// - pages
//    - read pages from a databases
//    - post / update / delete

server.register(mysqlPlugin, { connectionString: "mysql://root@localhost/mysql" })
server.register(rootRoute, { prefix: "/v1" })
server.register(pagesRoute, { prefix: "/v1/pages" })

server.setErrorHandler(errorHandler)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})