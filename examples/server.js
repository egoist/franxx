const webpack = require('webpack')
const express = require('express')
const devMiddleware = require('webpack-dev-middleware')
const webpackConfig = require('./webpack.config')

const app = express()

app.use(express.static(__dirname))
app.use(devMiddleware(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath
}))

app.listen(8000)
