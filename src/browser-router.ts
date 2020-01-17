import { createBrowserHistory } from 'history'
import { Router } from './router'

export const createBrowserRouter = () => {
  const history = createBrowserHistory()
  const router = new Router(history)
  return router
}
