const fs = require('fs')
const path = require('path')

module.exports = {
  entry: fs.readdirSync('examples').filter(v => !v.endsWith('.js'))
    .reduce((res, name) => {
      res[name] = path.join(__dirname, `${name}/main.js`)
      return res
    }, {}),
  output: {
    publicPath: '/dist/',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    mainFields: ['main'],
    alias: {
      franxx: path.join(__dirname, '../src')
    }
  }
}
