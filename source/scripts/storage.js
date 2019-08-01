if (typeof define === 'function' && define.amd) {
  define('storage', [], function() {
    var storage = window.localStorage
    var expire = 3 * 60 * 60 * 1000 // 默认过期时间3小时

    function getNow() {
      return new Date().getTime()
    }
    function get(key) {
      var value
      try {
        value = JSON.parse(storage.getItem(key))

        if (value) {
          var now = getNow()
          if (value.expireTime < now) {
            value = null
          }
        }
      } catch (e) {
        console.warn(e)
        value = null
      }

      return value
    }

    function set(key, value) {
      value = value || {}
      key = key && key.toLocaleUpperCase()

      if (value) {
        var now = getNow()
        value.setTime = now
        value.expireTime = now + expire

        try {
          value = JSON.stringify(value)
        } catch (e) {
          value = ''
        }

        storage.setItem(key, value)
      } else {
        return false
      }
    }

    function remove() {}

    return {
      get: get,
      set: set,
      remove: remove
    }
  })
}
