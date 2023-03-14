function getType(val) {
  if (Array.isArray(val)) return Array
  if (val instanceof Promise) return Promise

  const type = typeof val
  switch (type) {
    case 'bigint':
      return Number
    case 'boolean':
      return Boolean
    case 'function':
      return Function
    case 'number':
      return Number
    case 'object':
      return Object
    case 'string':
      return String
    case 'symbol':
      return Symbol
    default:
      return undefined
  }
}

export const stringProp = (z = '') => ({ type: String, default: z })
export const numberProp = (z = 0) => ({ type: Number, default: z })
export const arrayProp = (z = []) => ({ type: Array, default: () => z })
export const objectProp = (z = {}) => ({ type: Object, default: () => z })
export const booleanProp = (z = false) => ({ type: Boolean, default: z })
export const enumProps = (...allowedValue) => {
  const [defaultValue] = allowedValue

  if (typeof defaultValue !== 'string' && typeof defaultValue !== 'number') {
    throw new Error('Enum props should only be String or Number')
  }

  return {
    type: allowedValue.map(getType).filter(z => typeof z !== 'undefined'),
    default: allowedValue[0],
    validator: v => allowedValue.includes(v),
  }
}
