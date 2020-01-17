import regexparam from 'regexparam'
import { History } from 'history'
import {
  getParams,
  pathToLocation,
  LooseLocation,
  locationToPath
} from './utils'

export interface Route {
  path: string
  handler: RouteHandler
  pattern: RegExp
  keys: string[]
}

export interface ResolvedRoute {
  /** Full path */
  readonly path: string
  /** Path name only, excluding search and query */
  readonly pathname: string
  /** Route parameters */
  readonly params: {
    [k: string]: any
  }
  /** Parsed `location.search` */
  readonly query: {
    [k: string]: any
  }
  /** Original `location.search`  */
  readonly search: string
  /** An empty string or a string starting with `#` */
  readonly hash: string
  /** Matched route definition */
  readonly route: Route
}

export type RouteHandler = (currentRoute: ResolvedRoute) => void | Promise<void>

export class Router {
  public routes: Route[]

  constructor(public history: History) {
    this.routes = []

    this.history.listen(() => {
      this.run()
    })
  }

  go(n: number) {
    this.history.go(n)
  }

  forward() {
    this.history.goForward()
  }

  back() {
    this.history.goBack()
  }

  push(path: string | LooseLocation) {
    this.history.push(locationToPath(path))
  }

  replace(path: string | LooseLocation) {
    this.history.replace(locationToPath(path))
  }

  /** Add a route handle */
  add(path: string, handler: RouteHandler) {
    const { pattern, keys } = regexparam(path)
    this.routes.push({ path, handler, pattern, keys })
  }

  /** Remove a route handler */
  remove(path: string) {
    this.routes = this.routes.filter(route => route.path !== path)
  }

  /**
   * Run matched route handler
   */
  run() {
    const resolved = this.currentRoute
    if (resolved) {
      return resolved.route.handler(resolved)
    }
  }

  /** Find a route that matches give path */
  resolve(path: string | LooseLocation): ResolvedRoute | null {
    const location = pathToLocation(path)

    for (const route of this.routes) {
      const params = getParams(location.pathname, route.pattern, route.keys)
      if (params) {
        return {
          params,
          path: location.pathname,
          pathname: location.pathname,
          search: location.search,
          query: location.query,
          hash: location.hash,
          route
        }
      }
    }

    return null
  }

  /** Get the route that matches current path */
  get currentRoute(): ResolvedRoute | null {
    const { pathname, search, hash } = this.history.location
    const location = this.resolve({
      pathname,
      query: search,
      hash
    })
    return location
  }
}
