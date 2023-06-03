import { UserAlreadyExistError } from '@/errors/user-alredy-exist'
import { UsersService } from '@/modules/users/UsersService'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: UsersService

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UsersService(usersRepository)
  })

  it('should be able to register', async () => {
    const { user } = await sut.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '12345678'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: '12345678'
    })

    const isPasswordCorrectlyHashed = await compare('12345678', user.password)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'jhondoe@example.com'

    await sut.create({
      name: 'John Doe',
      email,
      password: '12345678'
    })

    await expect(() =>
      sut.create({
        name: 'John Doe',
        email: email,
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(UserAlreadyExistError)
  })
})
