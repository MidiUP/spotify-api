import { Sequelize } from 'sequelize-typescript'
import 'dotenv/config'
import path from 'path'

export const sequelize = new Sequelize({
  database: process.env.DATABASE,
  dialect: 'mysql',
  username: 'root',
  password: process.env.PASSWORD,
  storage: ':memory:',
  models: [path.resolve(__dirname, '../', '../', 'domain', 'models')]
})
