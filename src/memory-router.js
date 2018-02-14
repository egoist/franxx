import BaseRouter from './base-router'
import { removeLeadingSlash, getActualPath } from './utils'

export default class MemoryRouter extends BaseRouter {
  constructor(options) {
    super(options)
    this.stack = []
    this.index = -1
  }

  link(path) {
    return this.basename + removeLeadingSlash(path)
  }

  push(path, replace) {
    if (replace) {
      this.stack[this.history.length - 1] = this.link(path)
    } else {
      this.index++
      this.stack.push(this.link(path))
    }
    this.runHandler(path)
    return this
  }

  replace(path) {
    return this.push(path, true)
  }

  go(n) {
    const targetIndex = this.index + n
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    const path = this.stack[targetIndex]
    this.runHandler(this.getActualPath(path))
    return this
  }

  start(initalPath) {
    if (initalPath) {
      this.runHandler(initalPath)
    }
    return this
  }
}
