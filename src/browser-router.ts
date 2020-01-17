import { createBrowserHistory } from 'history'
import { Router } from './router'

export interface BrowserRouterOptions {
  /**
   * The base URL of the app.
   */
  base?: string
}

export const createBrowserRouter = (options: BrowserRouterOptions = {}) => {
  const history = createBrowserHistory({ basename: options.base })
  const router = new Router(history)
  return router
}
