export const DataNodeTypeTableTransform = {
  string: 'TEXT',
  number: 'NUMERIC',
}

export type DataNodeTypeTable = keyof typeof DataNodeTypeTableTransform
