// import Drive from '@ioc:Adonis/Core/Drive'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Leiaute from 'App/Models/Leiaute'
import Version from 'App/Models/Version'

export const LeiautesController = {
  create: async ({ request, response }: HttpContextContract): Promise<void> => {
    const { description, name, prefix, version_id } = request.only([
      'name',
      'prefix',
      'version_id',
      'description',
    ])

    const version = await Version.query().where('id', version_id).first()

    if (!version) return response.notFound('Version not found.')

    const exist_leiaute = await Leiaute.query()
      .where('prefix', prefix)
      .andWhere('version_id', version.id)
      .first()

    if (exist_leiaute)
      return response.conflict('Already exists leiaute prefix related from version.')

    const leiaute = await Leiaute.create({
      name,
      prefix,
      version_id: version.id,
      description,
    })

    return response.created(leiaute)
  },

  paginate: async ({ request, response }: HttpContextContract): Promise<void> => {
    const { page = 1, limit = 10, search = '' } = request.qs()

    const paginate = await Leiaute.query()
      .if(search, (leiaute) =>
        leiaute
          .where('name', 'ilike', `%${search}%`)
          .orWhere('prefix', 'ilike', `%${search}%`)
          .orWhereHas('version', (version) => version.where('prefix', search))
      )
      .preload('version')
      .orderBy('prefix', 'asc')
      .paginate(page, limit)

    return response.ok(paginate)
  },

  show: async ({ request, response }: HttpContextContract): Promise<void> => {
    const { id } = request.params()

    const leiaute = await Leiaute.query().where('id', id).preload('version').first()

    if (!leiaute) return response.notFound('Leiaute not found.')

    return response.ok(leiaute)
  },

  active_list: async ({ response }: HttpContextContract): Promise<void> => {
    const leiautes = await Leiaute.query().where('active', true)

    return response.ok(leiautes)
  },

  toggle_active: async ({ request, response }: HttpContextContract): Promise<void> => {
    const { id } = request.params()

    const leiaute = await Leiaute.query().where('id', id).first()

    if (!leiaute) return response.notFound('Leiaute not found')

    leiaute.merge({ active: !leiaute.active })

    await leiaute.save()

    return response.noContent()
  },
}
