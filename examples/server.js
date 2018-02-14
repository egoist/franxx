const fs = require('fs')
const webpack = require('webpack')
const express = require('express')
const devMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')

const app = express()

fs.readdirSync('examples').filter(v => !v.endsWith('.js'))
  .forEach(v => {
    const handleRequest = (req, res) => {
      res.send(fs.readFileSync(`examples/${v}/index.html`, 'utf8'))
    }
    app.get(`/${v}/*`, handleRequest)
    app.get(`/${v}`, handleRequest)
  })


app.use(devMiddleware(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath
}))

app.listen(8000)
