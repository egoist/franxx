# FRANXX <img align="right" src="https://i.loli.net/2018/02/14/5a8446a61b2e0.jpg" height="40">

[![NPM version](https://img.shields.io/npm/v/franxx.svg?style=for-the-badge)](https://npmjs.com/package/franxx) [![NPM downloads](https://img.shields.io/npm/dm/franxx.svg?style=for-the-badge)](https://npmjs.com/package/franxx) [![CircleCI](https://img.shields.io/circleci/project/github/egoist/franxx/master.svg?style=for-the-badge)](https://circleci.com/gh/egoist/franxx/tree/master)  [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=for-the-badge)](https://github.com/egoist/donate) [![chat](https://img.shields.io/badge/chat-on%20discord-7289DA.svg?style=for-the-badge)](https://chat.egoist.moe)

## Install

```bash
yarn add franxx
```

## Usage

[![Edit FRANXX example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/5kkkkv7mpn)

```js
import { HistoryRouter, HashRouter, MemoryRouter } from 'franxx'

// Router using HTML5 history API
// With fallback to HashRouter
const router = new HistoryRouter()
// Router using location.hash
// It uses HTML5 pushState if possible
const router = new HashRouter()
// Router using memory
// Mainly for server-side or mobile apps
const router = new MemoryRouter()

router.on('/', () => {
  console.log('homepage')
})

router.on('/user/:name', params => {
  console.log(params.name)
})

// Bootstrap router
router.start()
```

<details><summary>Path patterns like `/user/:name`.</summary>
<br>
The supported pattern types are:

- static (`/users`)
- named parameters (`/users/:id`)
- nested parameters (`/users/:id/books/:title`)
- optional parameters (`/users/:id?/books/:title?`)
- any match / wildcards (`/users/*`)
</details>

## API

### new BrowserRouter(options)

The class that `HistoryRouter` `HashRouter` extend from.

#### options

##### options.basename

Type: `string`<br>
Default: `'/'` in `HistoryRouter` `MemoryRouter`, `location.pathname` in `HashRouter`.

The base URL where URLs are relative to. e.g. for a website located at `http://example/blog`, you should set `basename` to `/blog/` when using `HistoryRouter`.

##### options.useHash

Type: `boolean`<br>
Default: `undefined`

Use hash-based URLs, i.e. the `#` part in URL.

When you set this to `true` but `window.history` API is available we will still use `history.pushState` to update URL state.

When this is set to `false` or left empty, we will try to use `window.history` API and do *NOT* use hash-based URLs, and fallback to hash-based URLs when `window.history` is not supported.

##### options.hashDelimeter

Type: `string`<br>
Default: `/`

The character separator between `#` and path name.

```js
const router = new HashRouter()
router.push('/')
// location.hash: #/
router.push('/foo')
// location.hash: #/foo
const router = new HashRouter({
  hashDelimeter: '!'
})
router.push('/bar')
// location.hash: #!bar
```

### new HistoryRouter(options)

The same as `BrowserRouter`.

### new HashRouter(options)

Like `BrowserRouter` but `options.useHash` is always `true`.

### new MemoryRouter(options)

Like `BrowserRouter` but should be used in non-DOM environment. And does not support hash.

### router

#### router.on(path, handler)

Register a route handler.

#### router.off(path)

Remove a route handler.

#### router.push(path, replace?)

#### router.replace(path)

#### router.go(n)

Only available in `HistoryRouter` and `MemoryRouter`. 

#### router.link(path)

Return a link that can be used in the `href` attribute of an `a` element. Note that you may need to call `e.preventDefault()` in event handler when not using `HashRouter`.

#### router.start(initialPath = '/')

Start the router.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D


## Author

**franxx** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/franxx/contributors)).

> [github.com/egoist](https://github.com/egoist) · GitHub [@egoist](https://github.com/egoist) · Twitter [@_egoistlily](https://twitter.com/_egoistlily)
