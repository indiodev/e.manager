import { Queue } from './queue'

export function collectNodesAndChildrenFromQueue<T>(queue: Queue<T>) {
  const data: T[] = []

  while (!queue.isEmpty()) {
    const node = queue.dequeue()

    if (node) data.push(node)
  }

  return data
}
