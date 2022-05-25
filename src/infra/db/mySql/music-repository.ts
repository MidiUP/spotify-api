import { CreateMusic, MusicDto } from './../../../domain/usecases/music'
import { IMusicRepository } from './../interfaces/music-repository'
import { sequelize } from '../../../data/sequelize'
import Music from '../../../domain/models/music'

export class MusicRepository implements IMusicRepository {
  private readonly repositoryMusic = sequelize.getRepository(Music)

  async post (music: CreateMusic): Promise<MusicDto> {
    const { id, name, album, thumb, artist } = await this.repositoryMusic.create(music)
    return { album, id, name, artist, thumb }
  }
}
