import { HashRouter } from 'franxx'

const router = new HashRouter()
window.router = router

const app = document.getElementById('app')

router.on('/', () => {
  console.log('home')
  app.innerHTML = `home <button onclick="router.push('/u/egoist')">go egoist</button>`
})

router.on('/u/:name', ({ name }) => {
  console.log(name)
  app.innerHTML = name
})

router.start()
