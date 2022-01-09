# Changelog

## Unreleased

No unreleased changes.

## 2.0.1

Breaking changes:

- Make `history` a peer dependency:

  ```ts
  import { createRouter } from 'franxx'
  import { createBrowserHistory } from 'history'

  const router = createRouter({
    history: createBrowserHistory(),
  })
  ```

- Removed IIFE and UMD bundles, use ESM instead.
