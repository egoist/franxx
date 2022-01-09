const stringifyQuery = (query: Record<string, string>) => {
  const str = new URLSearchParams(query).toString()
  return str ? `?${str}` : ''
}

const parseQuery = (query: string) => {
  return Object.fromEntries(new URLSearchParams(query))
}

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

export type LooseLocation = {
  readonly pathname?: string
  readonly query?:
    | string
    | {
        [k: string]: any
      }
  readonly hash?: string
}

export type Location = {
  readonly pathname: string
  readonly query: {
    [k: string]: any
  }
  readonly search: string
  readonly hash: string
}

export function locationToPath(location: string | LooseLocation): string {
  if (typeof location === 'object') {
    return `${location.pathname || ''}${
      typeof location.query === 'string'
        ? location.query
        : location.query
        ? stringifyQuery(location.query)
        : ''
    }${location.hash || ''}`
  }

  return location
}

const PATH_REGEXP = /^([^\?#]*)(\?[^#]*)?(#.*)?$/

export function pathToLocation(path: string | LooseLocation): Location {
  if (typeof path === 'object') {
    const { query = {} } = path
    return {
      pathname: path.pathname || '/',
      get query() {
        return typeof query === 'string' ? parseQuery(query) : query
      },
      get search() {
        return typeof query === 'string' ? query : stringifyQuery(query)
      },
      hash: path.hash || '',
    }
  }

  const matches = PATH_REGEXP.exec(path)
  if (!matches) throw new Error(`Not a valid path`)

  const search = matches[2] || ''
  return {
    pathname: matches[1] || '',
    get query() {
      return parseQuery(search)
    },
    search,
    hash: matches[3] || '',
  }
}
