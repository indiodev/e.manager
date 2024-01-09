import Hash from '@ioc:Adonis/Core/Hash'
import { beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import BaseUuid from './base-uuid'

export default class User extends BaseUuid {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
