import { sequelize } from '../../data/sequelize'
import User from '../../domain/models/user'

const userRepository = sequelize.getRepository(User)

export const deleteUsersTests = async (): Promise<void> => {
  await userRepository.destroy({
    where: { name: 'any_name' }
  })
}
