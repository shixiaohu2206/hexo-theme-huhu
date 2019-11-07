const _ = require('lodash')

module.exports = function(hexo) {
  // 在静态文件生成前发布
  hexo.on('generateBefore', function() {
    // const theme_config = hexo.theme.config

    // theme_config.NODE_ENV = process.env.NODE_ENV || ''
    // hexo.theme.config = _.assign({})
  })
}
