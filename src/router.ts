import regexparam from 'regexparam'
import { History } from 'history'
import qs from 'querystringify'
import { getParams, normalizePath, PathObject } from './utils'

export interface Route {
  path: string
  handler: RouteHandler
  pattern: RegExp
  keys: string[]
}

export interface CurrentRoute {
  /** Route path */
  path: string
  handler: RouteHandler
  /** Route parameters */
  params: {
    [k: string]: any
  }
  /** Parsed `location.search` */
  readonly query: {
    [k: string]: any
  }
  /** An empty string or a string starting with `#` */
  hash: string
}

export type RouteHandler = (currentRoute: CurrentRoute) => void | Promise<void>

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

  push(path: string | PathObject) {
    this.history.push(normalizePath(path))
  }

  replace(path: string | PathObject) {
    this.history.replace(normalizePath(path))
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
    const route = this.currentRoute
    if (route) {
      return route.handler(route)
    }
  }

  /** Find a route that matches give path */
  find(path: string) {
    for (const route of this.routes) {
      const params = getParams(path, route.pattern, route.keys)
      if (params) {
        return {
          path,
          params,
          handler: route.handler
        }
      }
    }

    return null
  }

  /** Get the route that matches current path */
  get currentRoute(): CurrentRoute | null {
    const { pathname, search, hash } = this.history.location
    const route = this.find(pathname)
    return (
      route && {
        path: route.path,
        params: route.params,
        handler: route.handler,
        hash,
        get query() {
          return qs.parse(search)
        }
      }
    )
  }
}
