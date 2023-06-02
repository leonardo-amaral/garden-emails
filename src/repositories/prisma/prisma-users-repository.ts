import { prisma } from '@/lib/prisma'
import { Prisma, Users } from '@prisma/client'

export class PrismaUsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.users.findUnique({
      where: { email }
    })

    return user
  }

  async create(data: Prisma.UsersCreateInput) {
    const user = await prisma.users.create({
      data
    })

    return user
  }

  async findById(id: Users['id']) {
    const user = await prisma.users.findUnique({
      where: { id }
    })
    return user
  }
}
