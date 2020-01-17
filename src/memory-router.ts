import { createMemoryHistory } from 'history'
import { Router } from './router'

export const createMemoryRouter = () => {
  const history = createMemoryHistory()
  const router = new Router(history)
  return router
}
