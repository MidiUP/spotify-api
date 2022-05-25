import { CreateMusicValidator } from './../../../validation/validator-create-music'
import { MusicRepository } from './../../../infra/db/mySql/music-repository'
import { RegisterMusicController } from './../../../presentation/controller/registerMusic'

export const registerMusicFactory = (): RegisterMusicController => {
  const validator = new CreateMusicValidator()
  const repository = new MusicRepository()
  return new RegisterMusicController(validator, repository)
}
