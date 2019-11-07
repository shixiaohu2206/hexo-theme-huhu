const webpack = require('webpack')

module.exports = function(hexo) {
  // 在文章开始渲染前执行
  hexo.extend.filter.register('before_post_render', require('./before_post_render'))

  // 在文章渲染完成后执行
  hexo.extend.filter.register('after_post_render', require('./post'))

  // 在渲染后执行
  hexo.extend.filter.register('after_render:js', require('./after_render'))

  // 在 Hexo 初始化完成后执行
  hexo.extend.filter.register('after_init', require('./after_init'))

  // 在 Hexo 初始化完成后执行
  // hexo.extend.filter.register('after_init', require('../webpack/index'))
}
