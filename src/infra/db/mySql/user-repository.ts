import { CreateUser } from './../../../domain/usecases/user';
import { sequelize } from '../../../data/sequelize'
import User from '../../../domain/models/user'

export class UserRepository {
  private readonly repositoryUser = sequelize.getRepository(User)

  //  postUser(user: CreateUser): void {
  //    console.log('eu');
     
  // }
}