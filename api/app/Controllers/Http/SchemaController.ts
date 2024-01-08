import Drive from '@ioc:Adonis/Core/Drive'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Leiaute from 'App/Models/Schema'
import { collectNodesAndChildrenFromQueue, mapNodeObjectToQueue } from 'App/Utils'
import { XMLParser } from 'fast-xml-parser'
import { readFile } from 'fs/promises'

export const SchemaController = {
  build: async ({ request, response }: HttpContextContract): Promise<void> => {
    const xml_files = request.files('xml')
    const { prefix } = request.only(['prefix'])

    if (!(xml_files.length > 0)) return response.badRequest('File not found')

    const _promise = xml_files.map(async (file) => {
      const data = await readFile(file.tmpPath as string, 'utf-8')

      const parser = new XMLParser({
        ignoreAttributes: false,
      })

      const queue = mapNodeObjectToQueue(parser.parse(data))

      const nodes = collectNodesAndChildrenFromQueue(queue)

      const e_social_id = nodes.find((node) => node.name.includes('evt'))?.children[0]
        .value as string

      const exist_e_social_id = await Leiaute.query().where('e_social_id', e_social_id).first()

      return { nodes, e_social_id, prefix, exist: !!exist_e_social_id }
    })

    const data = await Promise.all(_promise)

    const schemas = await Leiaute.createMany(
      data.filter(({ exist }) => !exist).map(({ exist, ...rest }) => ({ ...rest }))
    )

    return response.ok({
      file_count: xml_files.length,
      exist_count: data.filter(({ exist }) => exist).length,
      no_exist_count: data.filter(({ exist }) => !exist).length,
      created_count: schemas.length,
    })
  },

  mapping: async ({ request, response }: HttpContextContract): Promise<void> => {
    const xml_files = request.files('xml')

    if (!(xml_files.length > 0)) return response.badRequest('File not found')

    const _promise = xml_files.map(async (file) => {
      const data = await readFile(file.tmpPath as string, 'utf-8')

      const parser = new XMLParser({
        ignoreAttributes: false,
      })

      const queue = mapNodeObjectToQueue(parser.parse(data))

      return { nodes: collectNodesAndChildrenFromQueue(queue) }
    })

    const result = await Promise.all(_promise)

    return response.ok(result)
  },

  paginate: async ({ request, response }: HttpContextContract): Promise<void> => {
    const { page, limit } = request.qs()
    const schemas = await Leiaute.query()
      .select(['e_social_id', 'prefix', 'created_at', 'updated_at'])
      .paginate(page, limit)
    return response.ok(schemas)
  },

  show: async ({ request, response }: HttpContextContract): Promise<void> => {
    const { e_social_id } = request.params()

    const schema = await Leiaute.query().where('e_social_id', e_social_id).first()

    if (!schema) return response.notFound('Schema data not found')

    return response.ok(schema)
  },

  report: async ({ request, response }: HttpContextContract): Promise<void> => {
    const { e_social_id } = request.params()

    const schema = await Leiaute.query().where('e_social_id', e_social_id).first()

    if (!schema) return response.notFound('Schema data not found')

    // const data = json2csv(
    //   schema.nodes
    //     .filter(({ name }) => !name.includes('?xml') && !name.includes('eSocial'))
    //     .reduce((acc, { children, name, type, values }) => {
    //       if (type === 'unique') {
    //         for (const child of children) {
    //           acc[`${name}_${child.name}`] = child.value
    //         }
    //       }
    //       return acc
    //     }, {} as any),
    //   {
    //     useDateIso8601Format: true,
    //   }
    // )

    let data: string[] = []

    for (const { name, children, type, values } of schema.nodes.filter(
      ({ name, children }) =>
        // !name.includes('?xml') && !name.includes('eSocial') &&
        children?.length > 0
    )) {
      if (type === 'unique')
        data.push(
          `${name.toUpperCase()}\n${children
            .flatMap(({ name, value }) => `${name}, ${value}\n`)
            .join('')}`
        )

      if (type === 'multiple')
        for (const value of values) {
          data.push(
            `${name.toUpperCase()}\n${Object.entries(value)
              .flatMap(([key, value]) => `${key}, ${value}\n`)
              .join('')}`
          )
        }
    }

    const final_filename = `${schema.e_social_id}.csv`

    await Drive.put(final_filename, data.join('\n'), {
      visibility: 'public',
      contentType: 'text/csv',
    })

    const { size } = await Drive.getStats(final_filename)

    response.type('text/csv')
    response.header('content-length', size)

    return response.stream(await Drive.getStream(final_filename))
  },
}
