import regexparam from 'regexparam'
import { History, Location as HistoryLocation } from 'history'
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

/**
 * - `string|LooseLocation` Navigate to another route
 * - `true|undefined` Continue to next hook
 * - `Error` Abort the navigate and pass the error to callbacks registered via `router.onError()`
 * - `false` Abort the navigation
 */
export type Next = (
  path?: string | boolean | LooseLocation | Error) => void

export type BeforeEachHook = (
  /** The target route being navigated to */
  to: ResolvedRoute,
  /** The current route being navigated away from. */
  from: ResolvedRoute | undefined | null,
  /** This function must be called to resolve the hook */
  next: Next
) => any

export type ErrorHandler = (error: Error) => any

export class Router {
  public routes: Route[]
  public beforeEachHooks: BeforeEachHook[]
  private currentLocation: HistoryLocation
  private errorHandlers: ErrorHandler[]

  constructor(public history: History) {
    this.currentLocation = history.location
    this.routes = []
    this.beforeEachHooks = []
    this.errorHandlers = []

    this.history.listen(() => {
      const from = this.resolveFromCurrentLocation()
      this.currentLocation = this.history.location
      const to = this.resolveFromCurrentLocation()
      this.run(to, from)
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
  run(to?: ResolvedRoute | null, from?: ResolvedRoute | null) {
    to = to || this.currentRoute || undefined
    if (to) {
      const beforeEachHooks: BeforeEachHook[] = [
        ...this.beforeEachHooks,
        to => to.route.handler(to)
      ]
      const runHook = (hook?: BeforeEachHook) => {
        hook && hook(to!, from, next)
      }
      const next: Next = path => {
        if (path === undefined || path === true) {
          runHook(beforeEachHooks.shift())
        } else if (path instanceof Error) {
          this.errorHandlers.forEach(handle => handle(path))
        } else if (typeof path === 'string' || typeof path === 'object') {
          this.replace(path)
        } else {
          this.back()
        }
      }
      runHook(beforeEachHooks.shift())
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

  private resolveFromCurrentLocation() {
    return this.resolve({
      pathname: this.currentLocation.pathname,
      query: this.currentLocation.search,
      hash: this.currentLocation.hash
    })
  }

  /** Get the route that matches current path */
  get currentRoute(): ResolvedRoute | null {
    return this.resolveFromCurrentLocation()
  }

  beforeEach(hook: BeforeEachHook) {
    this.beforeEachHooks.push(hook)
  }

  onError(errorHandler: ErrorHandler) {
    this.errorHandlers.push(errorHandler)
  }
}
