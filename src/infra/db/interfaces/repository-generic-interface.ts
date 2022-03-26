import { CreateUser } from '../../../domain/usecases/user';

export interface IGenericRepository {
  get(): Promise<any[]>
  getById(id: number): Promise<any>
  post(user: CreateUser): Promise<any>
  put(id: number): void
  delete(id: number): void
}