import { FastifyPluginAsync } from 'fastify';
import { existsSync } from 'fs';
import { readFile } from 'fs/promises';
import { resolve } from 'path';

const rootRoute: FastifyPluginAsync = async (instance, opts): Promise<void> => {
  instance.get('/home', (request, reply) => {
    const homePath = resolve(__dirname, "../pages/home.html")

    if (!existsSync(homePath)) console.error(`Path doesn't exist: ${homePath}`)

    readFile(homePath)
      .then(value => reply.type('text/html').send(value))
      .catch(error => { throw error })
  });
};

export default rootRoute;