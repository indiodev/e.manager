import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import { randomUUID } from 'crypto'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  public async run() {
    const data = {
      email: 'admin@mail.com',
      password: '123456',
    }

    const user = await User.query().where('email', data.email).first()

    if (user) return

    await User.create(data)
  }
}
