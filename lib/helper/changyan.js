const _ = require('lodash')

/**
 * 畅言评论
 */
module.exports = function() {
  const changyan = this.config.changyan

  let script = `<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" 
  src="https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=cytOueKrt&conf=prod_0650a81510b1c16dd4c6b8d447948595">
  </script>`

  return (changyan && !_.isEmpty(changyan.appid) && !_.isEmpty(changyan.conf) && script) || ''
}
