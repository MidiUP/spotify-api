import { IUserRepository } from './../interfaces/user-repository'
import { CreateUser, UserDto } from '../../../domain/usecases/user'
import { sequelize } from '../../../data/sequelize'
import User from '../../../domain/models/user'

export class UserRepository implements IUserRepository {
  private readonly repositoryUser = sequelize.getRepository(User)

  async get (): Promise<UserDto[]> {
    const users = await this.repositoryUser.findAll()
    const usersDto = users.map(user => {
      const { id, name, email } = user
      return {
        id, name, email
      }
    })
    return usersDto
  }

  async getById (id: number): Promise<UserDto> {
    const { name, email } = await this.repositoryUser.findOne({
      where: { id }
    })
    return { id, name, email }
  }

  async post (user: CreateUser): Promise<UserDto> {
    const { id, name, email } = await this.repositoryUser.create(user)
    return { id, name, email }
  }

  put (id: number): void {
    throw new Error('Method not implemented.')
  }

  delete (id: number): void {
    throw new Error('Method not implemented.')
  }
}
