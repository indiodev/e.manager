// import Drive from '@ioc:Adonis/Core/Drive'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database, { Dictionary } from '@ioc:Adonis/Lucid/Database'
import { DataNodeTypeTableTransform, Node } from 'App/Dto'
import Leiaute from 'App/Models/Leiaute'
import { collectNodesAndChildrenFromQueue, mapNodeObjectToQueue } from 'App/Utils'
import { XMLParser } from 'fast-xml-parser'
import { readFile } from 'fs/promises'

export const SchemasController = {
  mapping: async ({ request, response }: HttpContextContract): Promise<void> => {
    const file = request.file('file')

    if (!file) {
      return response.badRequest('File not found')
    }

    const data = await readFile(file.tmpPath as string, 'utf-8')

    const parser = new XMLParser({
      ignoreAttributes: false,
    })

    const queue = mapNodeObjectToQueue(parser.parse(data))

    const nodesAndChildren = collectNodesAndChildrenFromQueue(queue)

    return response.ok(nodesAndChildren)
  },

  generate: async ({ request, response }: HttpContextContract): Promise<void> => {
    const { nodes, leiaute_id } = request.only(['nodes', 'leiaute_id'])

    const event = (nodes as Node[]).find(({ node }) => node.includes('evt'))

    if (!event) return response.notFound('Event XML E-social not found.')

    const leiaute = await Leiaute.query().where('id', leiaute_id).preload('version').first()

    if (!leiaute) return response.notFound('Leiaute not found.')

    const { prefix, version } = leiaute

    const schema_name = `"${prefix}_${version.prefix}_${version.year}"`

    const create_tables = (nodes as Node[])
      .flatMap(({ node, children }) => {
        if (node.includes('eSocial') || node.includes('?xml') || node.includes('evt')) return []

        const columns = children
          .flatMap(({ name, type }) => `"${name}" ${DataNodeTypeTableTransform[type]} NULL`)
          .join(',\n')

        if (!(children.length > 0)) return []

        return `CREATE TABLE IF NOT EXISTS ${schema_name}."${node}" (
          ${event.node}_id TEXT NOT NULL references ${schema_name}."${event.node}"(xml_esocial_id),
          ${columns}
        );`
      })
      .join('\n\n')

    const create_table_event = `CREATE TABLE IF NOT EXISTS ${schema_name}."${event.node}" (
        xml_esocial_id TEXT PRIMARY KEY NOT NULL,
        leiaute_id uuid NOT NULL references "public"."leiautes" (id)
      );`

    await Database.rawQuery(`CREATE SCHEMA IF NOT EXISTS ${schema_name}`)
    await Database.rawQuery(create_table_event)
    await Database.rawQuery(create_tables)

    leiaute.merge({
      event_type: event.node,
    })

    await leiaute.save()

    return response.noContent()
  },

  bulk: async ({ request, response }: HttpContextContract): Promise<void> => {
    const { nodes, leiaute_id } = request.only(['nodes', 'leiaute_id'])

    const leiaute = await Leiaute.query().where('id', leiaute_id).preload('version').first()

    if (!leiaute) return response.notFound('Leiaute not found')

    const { prefix, version } = leiaute

    const schema_name = `${prefix}_${version.prefix}_${version.year}`

    const event = (nodes as Node[]).find(({ node }) => node.includes('evt'))

    if (!event) return response.notFound('Event XML E-social not found.')

    const exists_data = await Database.from(`${schema_name}.${event.node}`)
      .where('xml_esocial_id', event?.children[0]?.value as string)
      .first()

    if (exists_data) return response.conflict('Register already exists.')

    await Database.table(`${schema_name}.${event.node}`).insert({
      xml_esocial_id: event.children[0].value,
      leiaute_id: leiaute?.id,
    })

    const _promise_object = (nodes as Node[])
      .filter(
        ({ type, node, children }) =>
          type !== 'array' &&
          !node.includes('evt') &&
          !node.includes('?xml') &&
          !node.includes('eSocial') &&
          children.length !== 0
      )
      .map(async ({ node, children }) => {
        const data = children.reduce((result, child) => {
          result[child.name] = child.value
          return result
        }, {})

        await Database.table(`${schema_name}.${node}`).insert({
          [`${event.node.toLowerCase()}_id`]: event.children[0].value,
          ...data,
        })
      })

    const _promise_array = (nodes as Node[])
      .filter(({ type }) => type === 'array')
      .map(async ({ node, values }) => {
        const data = values?.map((child) => ({
          [`${event.node.toLowerCase()}_id`]: event.children[0].value,
          ...child,
        }))

        await Database.table(`${schema_name}.${node}`).multiInsert(
          data as Dictionary<any, string | number>[]
        )
      })

    await Promise.all(_promise_object)
    await Promise.all(_promise_array)

    return response.noContent()
  },
}
