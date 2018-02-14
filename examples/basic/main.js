import { HashRouter } from 'franxx'

const router = new HashRouter()
window.router = router

const app = document.getElementById('app')

router.on('/', () => {
  app.innerHTML = `home <button onclick="router.push('/u/egoist')">go egoist</button>`
})

router.on('/u/:name', ({ name }) => {
  app.innerHTML = name
})

router.start()
