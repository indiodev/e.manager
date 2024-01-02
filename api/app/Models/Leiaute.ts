import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Version from './Version'
import BaseUuid from './base-uuid'

export default class Leiaute extends BaseUuid {
  @column()
  public name: string

  @column()
  public prefix: string

  @column()
  public active: boolean

  @column()
  public description: string

  @column()
  public version_id: string

  @column()
  public event_type: string

  @belongsTo(() => Version, {
    foreignKey: 'version_id',
  })
  public version: BelongsTo<typeof Version>
}
