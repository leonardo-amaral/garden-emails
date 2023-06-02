import { Prisma, Users } from '@prisma/client'
import { UsersRepository } from '../users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  public items: Users[] = []

  async findById(id: string) {
    const user = this.items.find(user => user.id === id)
    if (!user) return null

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find(user => user.email === email)
    if (!user) return null

    return user
  }

  async create(data: Prisma.UsersCreateInput) {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password: data.password,
      created_at: new Date(),
      status: true
    }

    this.items.push(user)

    return user
  }
}
