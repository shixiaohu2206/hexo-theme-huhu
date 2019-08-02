seajs.use('jquery', function($) {
  console.log($)
})

define(function(require, exports, module) {
  var $ = require('jquery')
  console.log($)

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
  let bindEvents = function() {
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
          sites: SHARE_ARRAY
        })
        stopPropagation(e)
      })
    })
  }
  module.exports = {
    bindEvents: bindEvents
  }
})
