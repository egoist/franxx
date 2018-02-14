export const inBrowser = typeof window !== 'undefined'

export const supportPushState = Boolean(
  inBrowser && window.history && window.history.pushState
)

// use User Timing api (if present) for more accurate key precision
const Time = inBrowser && window.performance && window.performance.now ?
  window.performance :
  Date

let _key = genKey()

function genKey() {
  return Time.now().toFixed(3)
}

export function getStateKey() {
  return _key
}
export function setStateKey(key) {
  _key = key
}

export const pushState = (path, replace) => {
  const history = window.history
  if (replace) {
    history.replaceState({ key: _key }, '', path)
  } else {
    _key = genKey()
    history.pushState({ key: _key }, '', path)
  }
}

export const pushHash = (path, replace) => {
  if (replace) {
    window.location.replace(path)
  } else {
    window.location.hash = path
  }
}

export const removeLeadingSlash = input => input.replace(/^\//, '')

export const getBasename = useHash => {
  if (useHash) {
    return window.location.pathname
  }
  return '/'
}
