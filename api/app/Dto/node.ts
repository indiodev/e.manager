import { Child } from './child'

export interface Node {
  node: string
  children: Child[]
  type: 'object' | 'array'
  values?: { [key: string]: number | string }[]
}
