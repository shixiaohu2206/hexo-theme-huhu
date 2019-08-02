'use strict'

require.config({
  paths: {
    // site
    iconfont: 'iconfont',
    hodgepodge: 'hodgepodge',

    // cdn
    jquery: [
      'https://cdn.bootcss.com/jquery/3.4.1/jquery.min',
      'cdn/jquery.min'
    ],
    valine: ['https://valine.js.org/script/Valine.min', 'cdn/Valine.min'],
    busuanzi: [
      'http://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini',
      'cdn/busuanzi.pure.mini'
    ],
    confirm: [
      'https://cdn.bootcss.com/jquery-confirm/3.3.4/jquery-confirm.min',
      'cdn/jquery-confirm.min'
    ],
    fancybox: [
      'https://cdn.bootcss.com/fancybox/3.5.7/jquery.fancybox.min',
      'cdn/jquery.fancybox.min'
    ],
    // valine: [
    //   'cdn/Valine.min',
    //   'https://unpkg.com/valine@1.3.9/dist/Valine.min.js'
    // ]
  },

  map: {
    '*': {
      css: 'https://cdn.bootcss.com/require-css/0.1.10/css.min.js'
    }
  },

  shim: {
    fancybox: {
      deps: ['css!../style/fancybox']
    },
    confirm: {
      deps: ['css!../style/confirm']
    }
  },

  // 加载超时
  waitSeconds: 3
})

define([
  'jquery',
  'hodgepodge',
  'valine',
  'fancybox',
  'confirm',
  'iconfont'
], function($, $H) {
  // console.log(
  //   new valine({
  //     el: '#comment',
  //     appId: 'FjXColpwTL0BsrjJIN8Pmnn0-gzGzoHsz',
  //     appKey: 'Ar7tucPRn3KV7UOidQxESoys',
  //     notify: false,
  //     visitor: true, // 阅读量统计
  //     avatar: 'mp',
  //     placeholder: '骑士很煎蛋、骑士很孜然'
  //   })
  // )

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
        sites: SHARE_ARRAY
      })
      stopPropagation(e)
    })
  })
})
