import { Model, Table, Column } from 'sequelize-typescript'

@Table({ tableName: 'music', timestamps: false })
class Music extends Model {
  @Column
  name: string

  @Column
  album: string

  @Column
  artist: string

  @Column
  thumb: string
}

export default Music
