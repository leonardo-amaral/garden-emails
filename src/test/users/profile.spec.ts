import { ResourceNotFoundError } from '@/errors/resource-not-found'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UsersService } from '../../modules/users/UsersService'

let usersRepository: InMemoryUsersRepository
let sut: UsersService

describe('Get User Profile Service Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UsersService(usersRepository)
  })

  it('should be able to getProfile', async () => {
    const createdUser = await usersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: await hash('12345678', 6)
    })

    const { user } = await sut.getProfile({ userId: createdUser.id })

    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to getProfile with worng id', async () => {
    await expect(() =>
      sut.getProfile({
        userId: 'wrong-id'
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
