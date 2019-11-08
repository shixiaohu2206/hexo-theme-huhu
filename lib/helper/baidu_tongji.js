/**
 * daidu tongji
 */
module.exports = function() {
  let script = `<script>
  var _hmt = _hmt || []
  ;(function() {
    var hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?5a0acc897fd96474a2c8f4deac84611a'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()
</script>`

  return script
}
