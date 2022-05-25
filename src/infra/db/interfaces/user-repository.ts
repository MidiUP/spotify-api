import { CreateUser, UserDto, UserLogin } from './../../../domain/usecases/user'
import { IGenericRepository } from './repository-generic-interface'

export interface IUserRepository extends IGenericRepository{
  get: () => Promise<UserDto[]>
  getById: (id: number) => Promise<UserDto>
  getByEmail: (email: string) => Promise<UserDto>
  login: (email: string) => Promise<UserLogin>
  post: (user: CreateUser) => Promise<UserDto>
}
