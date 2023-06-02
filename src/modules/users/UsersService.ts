import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { UserAlreadyExistError } from '@/errors/user-alredy-exist'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { Users } from '@prisma/client'
import { compare, hash } from 'bcryptjs'

interface RegisterServiceProps {
  name: string
  email: string
  password: string
}

interface LoginServiceProps {
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: Users
}

interface AuthenticateUseCaseResponse {
  user: Users
}

interface GetProfileUseCaseResponse {
  user: Users
}

export class UsersService {
  constructor(private usersRepository: PrismaUsersRepository) {}

  async create({
    name,
    email,
    password
  }: RegisterServiceProps): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: password_hash
    })

    return {
      user
    }
  }

  async authenticate({
    email,
    password
  }: LoginServiceProps): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password)
    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    return {
      user
    }
  }

  async getProfile({
    userId
  }: {
    userId: string
  }): Promise<GetProfileUseCaseResponse> {
    const user = await this.usersRepository.findById( userId )

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user
    }
  }
}
