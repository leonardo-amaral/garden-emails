import { FastifyReply, FastifyRequest } from 'fastify'

export class Profile {
  async auth(request: FastifyRequest, reply: FastifyReply) {
    return reply.status(201).send()
  }
}
