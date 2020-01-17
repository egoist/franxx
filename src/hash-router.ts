import { createHashHistory } from 'history'
import { Router } from './router'

export interface HashRouterOptions {
  /**
   * The base URL of the app.
   */
  base?: string
}

export const createHashRouter = (options: HashRouterOptions = {}) => {
  const history = createHashHistory({ basename: options.base })
  const router = new Router(history)
  return router
}
