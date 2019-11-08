const _ = require('lodash')

/**
 * google adsense
 */
module.exports = function() {
  let script = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>`
  return (!_.isEmpty(this.config.google_ad_client) && script) || ''
}
