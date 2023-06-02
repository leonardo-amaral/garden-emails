import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UsersService } from '../users/UsersService'

export function FactoryUsersService() {
  const usersRepository = new PrismaUsersRepository()
  const userServices = new UsersService(usersRepository)

  return userServices
}
