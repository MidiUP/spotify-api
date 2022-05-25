import { CreateMusic, MusicDto } from './../../../domain/usecases/music'
import { IMusicRepository } from './../interfaces/music-repository'
import { sequelize } from '../../../data/sequelize'
import Music from '../../../domain/models/music'

export class MusicRepository implements IMusicRepository {
  private readonly repositoryMusic = sequelize.getRepository(Music)

  async post (music: CreateMusic): Promise<MusicDto> {
    return {
      album: '',
      id: 0,
      name: '',
      artist: '',
      thumb: ''
    }
  }
}
