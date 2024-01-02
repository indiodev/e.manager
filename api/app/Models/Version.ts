import { column } from '@ioc:Adonis/Lucid/Orm'
import BaseUuid from './base-uuid'

export default class Version extends BaseUuid {
  @column()
  public name: string

  @column()
  public prefix: string

  @column()
  public description: string

  @column()
  public year: number
}
