import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export const AuthController = {
  login: async ({ request, auth, response }: HttpContextContract): Promise<void> => {
    const { email, password } = request.only(['email', 'password'])
    const token = await auth.use('api').attempt(email, password)
    return response.accepted(token)
  },

  register: async ({ request, auth, response }: HttpContextContract): Promise<void> => {
    const { email, password } = request.only(['email', 'password'])

    const exist_user = await User.query()
      .where('email', email)
      .andWhere('password', password)
      .first()

    if (exist_user) return response.conflict('User already exists.')

    const user = await User.create({ email, password })

    const token = await auth.use('api').generate(user as unknown as User)

    return response.accepted(token)
  },

  logout: async ({ auth, response }: HttpContextContract): Promise<void> => {
    await auth.use('api').logout()
    return response.noContent()
  },
}
