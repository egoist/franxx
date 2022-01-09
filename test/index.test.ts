import { createMemoryHistory } from 'history'
import { test, expect } from 'vitest'
import { createRouter } from '../src'

test('simple', () => {
  let text: string | undefined
  const router = createRouter({
    history: createMemoryHistory(),
  })
  router.add('/', () => {
    text = 'home'
  })
  router.add('/u/:user', ({ params: { user } }) => {
    text = user
  })
  router.run()
  expect(text).toBe('home')

  router.push('/')
  expect(text).toBe('home')

  router.push('/u/egoist')
  expect(text).toBe('egoist')
})

test('normalize path', () => {
  let text: string | undefined
  const router = createRouter({
    history: createMemoryHistory(),
  })
  router.add('/', ({ query, hash }) => {
    text = `${query.text} ${hash.slice(1)}`
  })
  router.push({ pathname: '/', query: { text: 'hello' }, hash: '#foo' })
  expect(text).toBe('hello foo')
})
