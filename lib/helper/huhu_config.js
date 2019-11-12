const _ = require('lodash')

module.exports = function() {
  const CONFIG = _.assign({}, this.config, this.theme)

  let huhu_config = {
    share: CONFIG.share,
    valine: CONFIG.valine,
    service_worker: CONFIG.service_worker,
    baidu_tongji: CONFIG.baidu_tongji
  }

  let json = ''

  try {
    json = JSON.stringify(huhu_config)
  } catch (e) {
    json = ''
  }

  let script = `<script type="text/javascript">
                  window.HUHU_CONFIG = JSON.parse(${JSON.stringify(json)})
                </script>`

  return script
}
