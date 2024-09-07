import { MySQLPromisePool } from "@fastify/mysql";
import { FastifyInstance } from "fastify";

export const initDatabase = (fastify: FastifyInstance) => {
  db = fastify.mysql
}

export let db: MySQLPromisePool;
