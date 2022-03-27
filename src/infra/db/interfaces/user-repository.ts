import { CreateUser, UserDto } from './../../../domain/usecases/user'
import { IGenericRepository } from './repository-generic-interface'

export interface IUserRepository extends IGenericRepository{
  get: () => Promise<UserDto[]>
  getById: (id: number) => Promise<UserDto>
  post: (user: CreateUser) => Promise<UserDto>
}
