import { FastifyInstance } from 'fastify'
import { UsersController } from '../modules/users/UsersControllers'

const Users = new UsersController()

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', Users.create)
  app.post('/sessions', Users.sessions)

  /** Authenticated  */
}
