import { MusicDto } from './../../../domain/usecases/music'
import { CreateMusic } from '../../../domain/usecases/music'

export interface IMusicRepository{
  post: (music: CreateMusic) => Promise<MusicDto>
}
