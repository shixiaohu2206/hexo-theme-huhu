const _ = require('lodash')

/**
 * gtm
 */
module.exports = function() {
  const gtm_id = this.config.gtm_id

  let script = `<script>
  ;(function(w, d, s, l, i) {
    w[l] = w[l] || []
    w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != 'dataLayer' ? '&l=' + l : ''
    j.async = true
    j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl
    f.parentNode.insertBefore(j, f)
  })(window, document, 'script', 'dataLayer', '${gtm_id}')
</script>`

  return (!_.isEmpty(gtm_id) && script) || ''
}
