/**
 * 站内搜索
 */
define(['jquery', 'util', 'confirm'], function($, $H) {
  'use strict'

  var SEARCH_KEY = 'SEARCH'
  var SEARCH_EXPIRE = 24 * 60 * 60 * 1000 // 默认过期时间24小时

  function getStatic() {
    return $H.STORAGE.get(SEARCH_KEY)
  }

  function setStatic(value) {
    return $H.STORAGE.get(SEARCH_KEY, value, SEARCH_EXPIRE)
  }

  function getSeatchData() {
    let content = getStatic()

    if (!content) {
      return fetch('/content.json', {
        method: 'GET'
      })
        .then(function(resp) {
          return resp.json()
        })
        .then(function(json) {
          json && setStatic(json)
          return json
        })
        .catch(function(error) {
          console.log('fetch failed', error)
        })
    } else {
      return new Promise(function(resolve, reject) {
        resolve(content)
      })
    }
  }

  $.fn.search = function(options) {
    $.confirm({
      title: '',
      useBootstrap: false,
      escapeKey: 'true',
      animation: 'rotateYR',
      content: '',
      buttons: {
        close: {
          text: 'Close'
        }
      }
    })
  }
})
