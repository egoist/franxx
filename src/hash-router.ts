import { createHashHistory } from 'history'
import { Router } from './router'

export const createHashRouter = () => {
  const history = createHashHistory()
  const router = new Router(history)
  return router
}
