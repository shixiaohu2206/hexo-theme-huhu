const _ = require('lodash')

/**
 * gtm
 */
module.exports = function() {
  const gtm_id = this.config.gtm_id

  let script = `<noscript><iframe
                  src="https://www.googletagmanager.com/ns.html?id=<%= theme.gtm_id %>"
                  height="0"
                  width="0"
                  style="display:none;visibility:hidden">
                </iframe></noscript>`

  return (!_.isEmpty(gtm_id) && script) || ''
}
