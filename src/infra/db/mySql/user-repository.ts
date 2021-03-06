import { IUserRepository } from './../interfaces/user-repository'
import { CreateUser, UserDto, UserLogin } from '../../../domain/usecases/user'
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

  async getByEmail (email: string): Promise<UserDto> {
    const user = await this.repositoryUser.findOne({
      where: { email }
    })
    if (user) {
      return { id: user.id, name: user.name, email: user.email }
    } else {
      return null
    }
  }

  async login (email: string): Promise<UserLogin> {
    const user = await this.repositoryUser.findOne({
      where: { email }
    })
    if (user) {
      return { email: user.email, password: user.password, id: user.id }
    } else {
      return null
    }
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
