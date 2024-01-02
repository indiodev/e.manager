export function isArray(value: any) {
  return Array.isArray(value)
}

export function isNull(value: any) {
  return value === null
}

export function isNumber(value: any) {
  return typeof value === 'number'
}

export function isObject(value: any) {
  return typeof value === 'object'
}

export function isString(value: any) {
  return typeof value === 'string'
}
export function hasOwnProperty(obj: any, key: any) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
