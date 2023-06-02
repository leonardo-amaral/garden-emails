import { PrismaEmailsRepository } from '@/repositories/prisma/prisma-emails-repository'
import { EmailsService } from '../emails/EmailsService'

export function FactoryEmailsService() {
  const emailsRepository = new PrismaEmailsRepository()
  const emailsServices = new EmailsService(emailsRepository)

  return emailsServices
}
