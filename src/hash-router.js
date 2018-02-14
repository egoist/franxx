import BrowserRouter from './browser-router'

export default class HashRouter extends BrowserRouter {
  constructor({ basename, hashDelimiter } = {}) {
    super({ basename, useHash: true, hashDelimiter })
  }
}
