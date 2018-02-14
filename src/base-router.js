import matchit from 'matchit'
import { supportPushState, getBasename } from './utils'

export default class BaseRouter {
  constructor({ basename, useHash, hashDelimiter } = {}) {
    this.routes = []
    this.handlers = {}
    this.basename = basename
    this.useHash = supportPushState ? useHash : true
    this.hashDelimiter = hashDelimiter
    if (typeof this.basename === 'undefined') {
      this.basename = getBasename(this.useHash)
    }
    if (this.useHash && !this.hashDelimiter) {
      this.hashDelimiter = '/'
    }
  }

  on(pattern, handler) {
    this.routes.push(matchit.parse(pattern))
    this.handlers[pattern] = handler
    return this
  }

  off(pattern) {
    this.routes = this.routes.filter(route => route.old !== pattern)
    delete this.handles[pattern]
    return this
  }

  find(path) {
    const arr = matchit.match(path, this.routes)
    if (arr.length === 0) return null
    return {
      params: matchit.exec(path, arr),
      handler: this.handlers[arr[0].old]
    }
  }

  runHandler(path) {
    const route = this.find(path)
    if (route) {
      route.handler(route.params)
    }
    return this
  }

  getActualPath(path) {
    const start = path.slice(0, this.basename.length)
    if (start === this.basename) {
      return path.slice(this.basename.length) || '/'
    }
    return path
  }
}
