const _ = require('lodash')

/**
 * meta信息
 */
module.exports = function() {
  const config = this.config

  let baidu_site_verification = config.baidu_site_verification
    ? `<meta name="baidu-site-verification" content="${config.baidu_site_verification}" />`
    : ''

  let google_site_verification = config.google_site_verification
    ? `<meta name="google-site-verification" content="${config.google_site_verification}" />`
    : ''

  let baidu_union_verify = config.baidu_union_verify
    ? `<meta name="baidu_union_verify" content="${config.baidu_union_verify}" />`
    : ''

  let meta = baidu_site_verification + google_site_verification + baidu_union_verify

  return !_.isEmpty(meta) ? meta : ''
}
