import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaEmailsRepository {
  async create(data: Prisma.EmailsCreateInput) {
    const email = await prisma.emails.create({
      data
    })

    return email
  }
}
