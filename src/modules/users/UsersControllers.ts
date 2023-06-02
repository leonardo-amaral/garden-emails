import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { UserAlreadyExistError } from '@/errors/user-alredy-exist'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { FactoryUsersService } from '../factories/FactoryUsersService'

export class UsersController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      name: z.string().min(3).max(255),
      email: z.string().email(),
      password: z.string().min(8).max(255)
    })
    const { email, name, password } = bodySchema.parse(request.body)
    try {
      const userServices = FactoryUsersService()

      await userServices.create({ name, email, password })
    } catch (error) {
      if (error instanceof UserAlreadyExistError) {
        return reply.status(409).send({
          message: 'User aleready exist'
        })
      }

      return reply.status(500).send()
    }
    return reply.status(201).send()
  }

  async sessions(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(8).max(255)
    })

    const { email, password } = bodySchema.parse(request.body)
    try {
      const userServices = FactoryUsersService()

      await userServices.authenticate({ email, password })
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return reply.status(404).send({
          message: 'User not found'
        })
      }

      return reply.status(500).send()
    }
    return reply.status(200).send()
  }
}
