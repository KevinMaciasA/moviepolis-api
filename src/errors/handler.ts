import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

const errorResponse = (error: FastifyError) => ({
  error: error.name, message: error.message
})

function errorHandler(error: FastifyError, request: FastifyRequest, reply: FastifyReply) {
  console.error(error)

  const defaultError = {
    error: error.name || "InternalServerError",
    message: error.message || "Internal Server Error",
  }

  const errorsMap: Record<string, (error: FastifyError) => void> = {
    MovieNotFoundError: (err) => reply.status(404).send(errorResponse(err)),
    InvalidParametersError: (err) => reply.status(400).send(errorResponse(err)),
    DatabaseError: (err) => reply.status(500).send(errorResponse(err))
  }

  const handler = errorsMap[error.name]
  if (handler) return handler(error)

  if (error.validation) return reply.status(400).send({
    error: "Validation Error",
    message: error.message,
    details: error.validation,
  });

  return reply.status(error.statusCode || 500).send(defaultError);
}

export default errorHandler