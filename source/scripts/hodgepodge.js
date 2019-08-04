/**
 * 大杂烩模块
 */
define('hodgepodge', [], function() {
  'use strict'

  var WEATH_KEY = 'WEATH'
  var STORAGE_INSTANCE = undefined

  /**
   * 缓存模块
   */
  var STORAGE = (function() {
    // 默认过期时间3小时
    var expire = 3 * 60 * 60 * 1000

    function getInstance(type) {
      if (type === 'session' && STORAGE_INSTANCE !== window.sessionStorage) {
        STORAGE_INSTANCE = window.sessionStorage
      } else if (STORAGE_INSTANCE !== window.localStorage) {
        STORAGE_INSTANCE = window.localStorage
      }

      return this
    }

    function getNow() {
      return new Date().getTime()
    }

    function get(key) {
      var value
      try {
        value = JSON.parse(STORAGE_INSTANCE.getItem(key))

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

        STORAGE_INSTANCE.setItem(key, value)
      } else {
        return false
      }
    }

    function remove() {}

    return {
      get: get,
      set: set,
      remove: remove,
      getInstance: getInstance
    }
  })()

  /**
   * 天气模块
   */
  var WEATH = (function() {
    function getWeath() {
      var weathData = STORAGE.getInstance().get(WEATH_KEY)

      if (weathData) {
        return Promise.resolve(weathData)
      } else {
        return new Promise((resolve, reject) => {
          fetch('https://www.tianqiapi.com/api/').then(
            data => {
              if (data.ok) {
                data.json().then(resp => {
                  console.log(resp)
                  if (resp) {
                    STORAGE.getInstance().set(WEATH_KEY, resp)
                    return resolve(resp)
                  } else {
                    return reject()
                  }
                })
              } else {
                return reject()
              }
            },
            e => {
              return reject(e)
            }
          )
        })
      }
    }

    return {
      getWeath: getWeath
    }
  })()

  return {
    WEATH: WEATH,
    STORAGE: STORAGE
  }
})
