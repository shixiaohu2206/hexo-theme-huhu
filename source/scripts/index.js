'use strict'

// 缓存
var LOCALSTORAGE = (function() {
  var storage = window.localStorage
  var expire = 3 * 60 * 60 * 1000 // 默认过期时间3小时

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
})()

// 天气接口
function getWeath() {
  var weathKey = 'WEATH'
  var weathData = LOCALSTORAGE.get(weathKey)

  if (weathData) {
    return Promise.resolve(weathData)
  } else {
    return new Promise((resolve, reject) => {
      fetch('https://www.tianqiapi.com/api/').then(
        data => {
          if (data.ok) {
            data.json().then(resp => {
              if (resp) {
                LOCALSTORAGE.set('WEATH', resp)
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

function getNow() {
  return new Date().getTime()
}

// 阻止冒泡
function stopPropagation(e) {
  e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true)
}

var IMG_ARRAY = {
  xue: 'daxue',
  lei: 'leidian',
  shachen: 'shachenbao',
  wu: 'wu',
  bingbao: 'bingbao',
  yun: 'duoyun',
  yu: 'dayu',
  yin: 'yintian',
  qing: 'qingtian'
}

$(document).ready(function() {
  // 天气接口
  getWeath().then(resp => {
    if (resp) {
      var city_name = resp.city || '上海' // 默认上海
      var today = (resp.data && resp.data[0]) || {}
      var wea_img = today.wea_img || 'qingtian' // 默认晴天图标
      var wea = today.wea // 当前天气
      var tem = today.tem // 当前温度

      $('#city-name').text(city_name)
      $('#weather-detail').text(`${wea}/${tem}`)
      $('#weather-img').html(
        `<svg class="icon weather" aria-hidden="true">
            <use xlink:href="#icon-${IMG_ARRAY[wea_img] || 'qingtian'}"></use>
        </svg>`
      )
    }
  })

  // 图片预览
  $('.post-entry > img').each(function(k, v) {
    var src = $(v)[0].src
    var title = $(v)[0].title
    $(v).after(
      `<a href="${src}" data-caption="${title}" data-fancybox="images"><img src="${src}" alt="${title}"></a>`
    )
    $(v).remove()
  })
  $('[data-fancybox="images"]').fancybox({
    loop: true, // 相册循环浏览
    thumbs: {
      autoStart: true
    }
  })

  // 左侧滑块
  $(document).on('click', '.toggle-icon', function() {
    $('#card-wrap').toggle('1000')
  })

  // 分享
  $(document).on('click', '.share', function(e) {
    var that = $(this)
    $().share({
      url: `${location.origin}${that.data('url')}` || location.href,
      sites: SHARE_ARRAY
    })
    stopPropagation(e)
  })
})
