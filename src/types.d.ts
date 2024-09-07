import { MySQLPromisePool } from '@fastify/mysql'

export type todo = any

declare module 'fastify' {
  interface FastifyInstance {
    mysql: MySQLPromisePool
  }
}