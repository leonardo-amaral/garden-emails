import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'
import { UsersService } from '../../modules/users/UsersService'

let usersRepository: InMemoryUsersRepository
let sut: UsersService

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new UsersService(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: await hash('12345678', 6)
    })

    const { user } = await sut.authenticate({
      email: 'jhondoe@example.com',
      password: '12345678'
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with worng email', async () => {
    await expect(() =>
      sut.authenticate({
        email: 'jhondoe@example.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate with worng password', async () => {
    await usersRepository.create({
      name: 'John Doe',
      email: 'jhondoe@example.com',
      password: await hash('12345', 6)
    })

    await expect(() =>
      sut.authenticate({
        email: 'jhondoe@example.com',
        password: '12345678'
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
