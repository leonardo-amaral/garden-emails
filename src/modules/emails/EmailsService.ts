import { PrismaEmailsRepository } from '@/repositories/prisma/prisma-emails-repository'
import { Emails } from '@prisma/client'

interface CreateEmailUseCaseProps {
  user_id: string
  email_destiny: string
  title?: string
  content?: string
  content_file?: string
  status: string
}

interface EmailUseCaseResponse {
  email: Emails
}

export class EmailsService {
  constructor(private emailRepository: PrismaEmailsRepository) {}

  async create({
    email_destiny,
    status,
    user_id,
    content,
    content_file,
    title
  }: CreateEmailUseCaseProps): Promise<EmailUseCaseResponse> {
    const email = await this.emailRepository.create({
      users: { connect: { id: user_id } },
      email_destiny,
      status,
      user_id,
      content,
      content_file,
      title
    })

    if (!email) {
      throw new Error('Email not created')
    }

    return {
      email
    }
  }
}
