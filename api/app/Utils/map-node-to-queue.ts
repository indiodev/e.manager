import { Node } from 'App/Dto'
import { Queue } from './queue'
import { hasOwnProperty, isArray, isNull, isNumber, isObject, isString } from './validators'

export function mapNodeObjectToQueue(obj: any) {
  const queue = new Queue<Node>()

  recursiveMap(obj, queue)

  return queue
}

function recursiveMap(obj: any, queue: Queue<Node>) {
  for (const key in obj) {
    if (hasOwnProperty(obj, key)) {
      const value = obj[key]

      if (isObject(value) && !isNull(value) && !isArray(value)) {
        const item: Node = {
          name: key,
          type: 'unique',
          children: [],
        }

        for (const k in value) {
          if (hasOwnProperty(value, k)) {
            const data = value[k]

            if (!isObject(data) && (isNumber(data) || isString(data))) {
              item?.children?.push({
                name: k,
                type: typeof data as 'string' | 'number',
                value: data,
              })
            }
          }
        }

        queue.enqueue(item)

        recursiveMap(value, queue)
      } else if (isObject(value) && !isNull(value) && isArray(value)) {
        const item: Node = {
          name: key,
          type: 'multiple',
          children: [],
          values: [],
        }

        for (const k of value) {
          for (const j in k) {
            const exist = item.children?.some((a) => a.name === j)

            if (!exist) {
              item?.children?.push({
                name: j,
                type: typeof k[j] as 'string' | 'number',
              })
            }
          }

          item?.values?.push(k)
        }

        queue.enqueue(item)
      }
    }
  }
}
