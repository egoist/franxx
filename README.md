# FRANXX <img align="right" src="https://i.loli.net/2018/02/14/5a8446a61b2e0.jpg" height="40">

[![NPM version](https://img.shields.io/npm/v/franxx.svg?style=for-the-badge)](https://npmjs.com/package/franxx) [![NPM downloads](https://img.shields.io/npm/dm/franxx.svg?style=for-the-badge)](https://npmjs.com/package/franxx) [![CircleCI](https://img.shields.io/circleci/project/github/egoist/franxx/master.svg?style=for-the-badge)](https://circleci.com/gh/egoist/franxx/tree/master) [![donate](https://img.shields.io/badge/$-donate-ff69b4.svg?maxAge=2592000&style=for-the-badge)](https://github.com/sponsors/egoist)

## Install

```bash
npm i franxx history
```

## Usage

```js
import { createRouter } from 'franxx'
import { createBrowserHistory } from 'history'

const router = createRouter({
  history: createBrowserHistory(),
})

router.add('/', () => {
  console.log('homepage')
})

router.add('/user/:name', ({ params, query }) => {
  console.log(params.name)
})

// The router by default automatically runs route handler
// When URL changes
// But for initial render
// You need to call this:
router.run()

// Go to another page
router.push('/user/egoist?from=NASA#profile')
// Or let us normalize the path for you
router.push({
  pathname: '/user/egoist',
  query: { from: 'NASA' },
  hash: '#profile',
})
```

Supported path patterns:

- Static (`/foo`, `/foo/bar`)
- Parameter (`/:title`, `/books/:title`, `/books/:genre/:title`)
- Parameter w/ Suffix (`/movies/:title.mp4`, `/movies/:title.(mp4|mov)`)
- Optional Parameters (`/:title?`, `/books/:title?`, `/books/:genre/:title?`)
- Wildcards (`*`, `/books/*`, `/books/:genre/*`)

Note that the order you add routes matters, dynamic routes should always go last, i.e. add `/about` before adding `*`. We will address this issue in a future version.

### CDN

Load it as an ES module from CDN:

```html
<script type="module">
  import { createRouter } from 'https://cdn.jsdelivr.net/npm/franxx/dist/index.mjs'
</script>
```

## API

https://paka.dev/npm/franxx

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**franxx** © [egoist](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by egoist with help from contributors ([list](https://github.com/egoist/franxx/contributors)).

> [github.com/egoist](https://github.com/egoist) · GitHub [@egoist](https://github.com/egoist) · Twitter [@\_egoistlily](https://twitter.com/_egoistlily)
