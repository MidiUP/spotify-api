import { Model, Table, Column, PrimaryKey } from 'sequelize-typescript'

@Table({ tableName: 'user', timestamps: false})
class User extends Model {
  @Column
  @PrimaryKey
  id: number

  @Column
  name: string

  @Column
  password: string

  @Column
  email: string
}

export default User
