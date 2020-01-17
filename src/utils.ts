import qs from 'querystringify'

export function getParams(path: string, pattern: RegExp, keys?: string[]) {
  const matches = pattern.exec(path)
  if (matches) {
    let i = 0
    const out: { [k: string]: any } = {}
    const length = matches.length - 1
    while (i < length) {
      const key = keys ? keys[i] : i
      out[key] = matches[++i] || null
    }
    return out
  }
  return null
}

export type PathObject = {
  path?: string
  query?: {
    [k: string]: any
  }
  hash?: string
}

export function normalizePath(path: string | PathObject) {
  if (typeof path === 'object') {
    return `${path.path || ''}${path.query ? qs.stringify(path.query, true) : ''}${path.hash || ''}`
  }

  return path
}
