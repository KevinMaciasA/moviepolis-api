import { FastifyPluginAsync, RouteShorthandOptions } from "fastify";

const options: RouteShorthandOptions = {
  schema: {
    headers: 'POST',
    body: {
      type: 'object',
      required: ['title', 'content'],
      properties: {
        title: { type: 'string' },
        content: { type: 'string' }
      }
    }
  }
}

const pagesRoute: FastifyPluginAsync = async (instance, opts): Promise<void> => {
  instance.get("/", (request, reply) => {
    // connect to a db
    // for each join them with a spacer
  })

  instance.post("/", options, (request, reply) => {

  })
}

export default pagesRoute