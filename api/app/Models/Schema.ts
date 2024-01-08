import { column } from '@ioc:Adonis/Lucid/Orm'
import { Node } from 'App/Dto'
import BaseUuid from './base-uuid'

export default class Leiaute extends BaseUuid {
  @column({ isPrimary: true })
  public e_social_id: string

  @column()
  public prefix: string

  @column({
    // serialize: (value) => JSON.parse(value),
    prepare: (value) => JSON.stringify(value),
  })
  public nodes: Node[]
}
