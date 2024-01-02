import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Version from 'App/Models/Version'

export const VersionsController = {
  create: async ({ request, response }: HttpContextContract): Promise<void> => {
    const { description, name, prefix, year } = request.only([
      'prefix',
      'name',
      'description',
      'year',
    ])

    const exist_version = await Version.query()
      .where('prefix', prefix)
      .andWhere('year', year)
      .first()

    if (exist_version) return response.conflict('Version already exists.')

    const version = await Version.create({
      description,
      name,
      prefix,
      year,
    })

    return response.created(version)
  },

  list: async ({ response }: HttpContextContract): Promise<void> => {
    const list = await Version.query().orderBy('prefix', 'asc')

    return response.ok(list)
  },
}
