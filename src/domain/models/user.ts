import { Model, Table, Column } from 'sequelize-typescript'

@Table({ tableName: 'user', timestamps: false })
class User extends Model {
  @Column
  name: string

  @Column
  password: string

  @Column
  email: string
}

export default User
