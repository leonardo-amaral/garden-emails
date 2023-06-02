import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { FactoryEmailsService } from '../factories/FactoryEmailsService'

export class EmailsController {
  async create(request: FastifyRequest, reply: FastifyReply) {
    const bodySchema = z.object({
      email_destiny: z.string().email(),
      status: z.string(),
      user_id: z.string(),
      content: z.string(),
      content_file: z.string(),
      title: z.string()
    })
    const { email_destiny, content, content_file, status, title, user_id } =
      bodySchema.parse(request.body)

    try {
      const emailsServices = FactoryEmailsService()

      await emailsServices.create({
        email_destiny,
        status,
        user_id,
        content,
        content_file,
        title
      })
    } catch (error) {
      if (error) {
        return reply.status(409).send({
          message: 'Email not created'
        })
      }

      return reply.status(500).send()
    }
    return reply.status(201).send()
  }
}
