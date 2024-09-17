import { FastifyPluginAsync } from 'fastify';
import { toCamelCase } from '../utils/casing';
import { FieldPacket } from 'mysql2/promise';

const databaseProxy: FastifyPluginAsync = async (fastify) => {
  const originalQuery = fastify.mysql.query.bind(fastify.mysql);
  const originalExecute = fastify.mysql.execute.bind(fastify.mysql);

  fastify.mysql.query = async <T>(sqlOrOptions: any, params?: any): Promise<[T, FieldPacket[]]> => {
    const [rows, fields] = await originalQuery(sqlOrOptions, params);
    const transformedRows = Array.isArray(rows) ? rows.map(toCamelCase) : toCamelCase(rows);
    return [transformedRows as T, fields];
  };

  fastify.mysql.execute = async <T>(sqlOrOptions: any, params?: any): Promise<[T, FieldPacket[]]> => {
    const [rows, fields] = await originalExecute(sqlOrOptions, params);
    const transformedRows = Array.isArray(rows) ? rows.map(toCamelCase) : toCamelCase(rows);
    return [transformedRows as T, fields];
  };
};

export default databaseProxy;
