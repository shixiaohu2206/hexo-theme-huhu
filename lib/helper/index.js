let noop = function() {}
let env = process.env.NODE_ENV || ''

function handleRequire(path) {
  if (env === 'development') {
    return noop
  } else {
    return require(path)
  }
}

module.exports = function(hexo) {
  hexo.extend.helper.register('huhu_config', require('./huhu_config'))
  hexo.extend.helper.register('init_app', require('./init_app'))
  hexo.extend.helper.register('gtm', handleRequire('./gtm'))
  hexo.extend.helper.register('changyan', handleRequire('./changyan'))
  hexo.extend.helper.register('baidu_push', handleRequire('./baidu_push'))
  hexo.extend.helper.register('verification', handleRequire('./verification'))
  hexo.extend.helper.register('gtm_noscript', handleRequire('./gtm_noscript'))
  hexo.extend.helper.register('baidu_tongji', handleRequire('./baidu_tongji'))
  hexo.extend.helper.register('google_adsense', handleRequire('./google_adsense'))
}
