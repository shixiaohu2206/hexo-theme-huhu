const webpack = require('webpack')

module.exports = function() {
  let webpack_config = require('./config')(this)
  webpack(webpack_config, function() {
    console.log('webpack success')
  })
}
