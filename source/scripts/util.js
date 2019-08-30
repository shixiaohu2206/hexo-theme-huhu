/**
 * 工具模块
 */
define('util', [], function() {
  'use strict'

  var WEATH_KEY = 'WEATH'
  var STORAGE_INSTANCE = undefined
  var DEFAULT_EXPIRE = 3 * 60 * 60 * 1000 // 默认过期时间3小时

  /**
   * 缓存模块
   */
  var STORAGE = (function() {
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
        console.warn('key', e)
        value = null
      }

      return value
    }

    function set(key, value, expire) {
      value = value || {}
      key = key && key.toLocaleUpperCase()

      if (value) {
        var now = getNow()
        value.setTime = now
        value.expireTime = now + (expire || DEFAULT_EXPIRE)

        try {
          value = JSON.stringify(value)
        } catch (e) {
          console.warn('key', e)
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

      var appid = (THEME_CONFIG.weather && THEME_CONFIG.weather.appid) || undefined
      var appsecret = (THEME_CONFIG.weather && THEME_CONFIG.weather.appsecret) || undefined

      if (weathData) {
        return Promise.resolve(weathData)
      } else if (appid && appsecret) {
        return new Promise((resolve, reject) => {
          fetch(
            `https://www.tianqiapi.com/api/?appid=${appid}&appsecret=${appsecret}&version=v1`
          ).then(
            data => {
              if (data.ok) {
                data.json().then(resp => {
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
