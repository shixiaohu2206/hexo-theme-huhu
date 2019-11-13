module.exports = function(hexo) {
  // 在文章渲染完成后执行
  hexo.extend.filter.register('after_post_render', require('./post'))

  // 在 Hexo 初始化完成后执行
  hexo.extend.filter.register('after_init', require('./after_init'))
}
