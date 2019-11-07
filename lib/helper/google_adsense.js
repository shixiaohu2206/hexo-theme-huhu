const _ = require('lodash')

module.exports = function() {
  const google_ad_client = this.config.google_ad_client

  let script = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>`

  return (!_.isEmpty(google_ad_client) && script) || ''
}
