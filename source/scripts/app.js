define(['jquery', 'hodgepodge', 'valine', 'fancybox', 'confirm', 'iconfont', 'share'], function(
  $,
  $H,
  valine
) {
  'use strict'

  // valine评论
  var API_ID = (THEME_CONFIG.valine && THEME_CONFIG.valine.API_ID) || ''
  var API_KEY = (THEME_CONFIG.valine && THEME_CONFIG.valine.API_KEY) || ''
  if (API_ID && API_KEY) {
    new valine({
      el: '#comment',
      appId: 'FjXColpwTL0BsrjJIN8Pmnn0-gzGzoHsz',
      appKey: 'Ar7tucPRn3KV7UOidQxESoys',
      notify: false,
      visitor: true, // 阅读量统计
      avatar: 'mp',
      placeholder: '骑士很煎蛋、骑士很孜然'
    })
  }

  // 畅言
  var appid = (THEME_CONFIG.changyan && THEME_CONFIG.changyan.appid) || ''
  var conf = (THEME_CONFIG.changyan && THEME_CONFIG.changyan.conf) || ''
  if (appid && conf) {
    var width = window.innerWidth || document.documentElement.clientWidth
    if (width < 960) {
      window.document.write(
        '<script id="changyan_mobile_js" charset="utf-8" type="text/javascript" src="https://changyan.sohu.com/upload/mobile/wap-js/changyan_mobile.js?client_id=' +
          appid +
          '&conf=' +
          conf +
          '"></script>'
      )
    } else {
      loadJs('https://changyan.sohu.com/upload/changyan.js', false, function() {
        window.changyan.api.config({ appid: appid, conf: conf })
      })
    }
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

  // bind events
  $(document).ready(function() {
    $H.WEATH.getWeath().then(resp => {
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
        sites: THEME_CONFIG.share
      })
      stopPropagation(e)
    })
  })
})
