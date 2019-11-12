require(['jquery', 'util', 'valine', 'chart', 'registerSW', 'fancybox', 'confirm', 'share', 'search'], function(
  $,
  util,
  valine,
  chart
) {
  'use strict'

  // valine评论
  var API_ID = (HUHU_CONFIG.valine && HUHU_CONFIG.valine.API_ID) || ''
  var API_KEY = (HUHU_CONFIG.valine && HUHU_CONFIG.valine.API_KEY) || ''
  if (API_ID && API_KEY) {
    new valine({
      el: '#comment',
      appId: HUHU_CONFIG.valine.API_ID,
      appKey: HUHU_CONFIG.valine.API_KEY,
      notify: false,
      visitor: true,
      recordIP: true,
      avatar: 'mp',
      placeholder: '骑士很煎蛋、骑士很孜然'
    })
  }

  // 阻止冒泡
  function stopPropagation(e) {
    e.stopPropagation ? e.stopPropagation() : (e.cancelBubble = true)
  }

  // bind events
  $(document).ready(function() {
    // 图片预览
    $('[data-fancybox="images"]').fancybox({ loop: true })

    // 侧边菜单
    $(document).on('click', '.toggle-icon', function() {
      $('#side').hasClass('active') ? $('#side').removeClass('active') : $('#side').addClass('active')
    })

    // phone menu
    $(document).on('click', '.menu-icon', function() {
      $('#menu-mask').toggleClass('showMenuMask')
      $('body').toggleClass('overflow')
    })

    $(document).on('click', '#menu-mask .icon-close', function() {
      $('#menu-mask').toggleClass('showMenuMask')
      $('body').toggleClass('overflow')
    })

    // search
    $(document).on('click', '.search-box', function() {
      $('#search-shade').toggleClass('showSearchBounce')
      $('body').toggleClass('overflow')
    })

    $(document).on('click', '#search-shade .icon-close', function() {
      $('#search-shade').toggleClass('showSearchBounce')
      $('body').toggleClass('overflow')
    })

    // 分享
    $(document).on('click', '.share', function(e) {
      var that = $(this)
      $().share({
        url: `${location.origin}${that.data('url')}` || location.href,
        sites: HUHU_CONFIG.share
      })
      stopPropagation(e)
    })

    // 咖啡
    $(document).on('click', '#reward-button', function(e) {
      $('#qr').toggle('1000')
    })

    // 顶部滚动进度条
    $(window).scroll(function(e) {
      var pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight // 页面总高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight // 浏览器视口高度
      var scrollAvail = pageHeight - windowHeight // 可滚动的高度
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 获取滚动条的高度
      var ratio = (scrollTop / scrollAvail) * 100 + '%'
      $('#progress > .line').css('width', ratio)
    })

    var mousewheel = function(e) {
      e = e || window.event

      //判断浏览器IE，谷歌滑轮事件
      if (e.wheelDelta) {
        //当滑轮向上滚动时
        if (e.wheelDelta > 0) {
          $('#side').removeClass('active')
        }

        //当滑轮向下滚动时
        if (e.wheelDelta < 0) {
          $('#side').addClass('active')
        }
      }
      //Firefox滑轮事件
      else if (e.detail) {
        //当滑轮向上滚动时
        if (e.detail > 0) {
          $('#side').removeClass('active')
        }

        //当滑轮向下滚动时
        if (e.detail < 0) {
          $('#side').addClass('active')
        }
      }
    }

    document.addEventListener && document.addEventListener('DOMMouseScroll', mousewheel, false) //firefox
    window.onmousewheel = document.onmousewheel = mousewheel //滚动滑轮触发scrollFunc方法 ie 谷歌

    // fiexed menu
    $(document).on('click', '#fixed-menu', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    })

    function handleDisplay() {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')
      var cate = $(this)
        .attr('class')
        .split(' ')[0]
      $('.post-wrap > .post').each(function(post) {
        if ($(this).hasClass(cate)) {
          $(this).addClass('active')
        } else {
          $(this).removeClass('active')
        }
      })
    }

    // 分类、标签页
    $(document).on('click', '#categories > .list > li', handleDisplay)
    $(document).on('click', '#tags > .list > li', handleDisplay)

    // pjax
    if ($.support.pjax) {
      $(document).on('click', 'a[data-pjax]', function(event) {
        var container = $(this).closest('[data-pjax-container]')
        var containerSelector = '#' + container.id
        $.pjax.click(event, { container: containerSelector })
      })
    }

    // pv表格
    if (
      HUHU_CONFIG.baidu_tongji &&
      HUHU_CONFIG.baidu_tongji.site_id &&
      HUHU_CONFIG.baidu_tongji.access_token &&
      chart
    ) {
      $('.site_from').html(HUHU_CONFIG.baidu_tongji.site_from || '')

      function prefix(date) {
        date = date + ''
        return date.length === 1 ? '0' + date : date
      }

      function setStatic(key, data) {
        var SEARCH_EXPIRE = 1 * 24 * 60 * 60 * 1000 // 默认过期时间1天
        util.STORAGE.getInstance().set(key, data, SEARCH_EXPIRE)
      }

      // 近日七天访问PV、UV
      var BAIDU_CHART = 'BAIDU_CHART'
      var date = new Date()
      var start = new Date(date.getTime() - 60 * 60 * 1000 * 24 * 6)
      var start_date = `${start.getFullYear()}${start.getMonth() + 1}${prefix(start.getDate())}`
      var end_date = `${date.getFullYear()}${prefix(date.getMonth() + 1)}${prefix(date.getDate())}`
      var url = `https://openapi.baidu.com/rest/2.0/tongji/report/getData?access_token=${HUHU_CONFIG.baidu_tongji.access_token}&site_id=${HUHU_CONFIG.baidu_tongji.site_id}&method=overview/getTimeTrendRpt&start_date=${start_date}&end_date=${end_date}&metrics=pv_count,visitor_count`

      function getChartData() {
        var data = util.STORAGE.getInstance().get(BAIDU_CHART)
        if (data) {
          return Promise.resolve(data)
        } else {
          return $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonp: 'callback'
          })
        }
      }

      getChartData().then(data => {
        if (data && data.result && data.result.items) {
          setStatic(BAIDU_CHART, data)
          var pv = []
          var uv = []

          data.result.items[1] &&
            data.result.items[1].map(value => {
              pv.push(value[0])
              uv.push(value[1])
            })

          var ctx = document.getElementById('myChart').getContext('2d')
          new chart(ctx, {
            type: 'line',
            data: {
              labels: data.result.items[0],
              datasets: [
                {
                  label: 'PV',
                  data: pv,
                  backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                  borderColor: ['rgba(54, 162, 235, 1)'],
                  borderWidth: 2
                },
                {
                  label: 'UV',
                  data: uv,
                  backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                  borderColor: ['rgba(255, 99, 132, 1)'],
                  borderWidth: 2
                }
              ]
            },
            options: {}
          })
        }
      })

      // 统计整站PV、UV
      var SITE_PV_UV = 'SITE_PV_UV'
      var all_start_date = new Date(HUHU_CONFIG.baidu_tongji.site_from || new Date())
      var start_date = `${all_start_date.getFullYear()}${prefix(all_start_date.getMonth() + 1)}${prefix(
        all_start_date.getDate()
      )}`
      var all_url = `https://openapi.baidu.com/rest/2.0/tongji/report/getData?access_token=${HUHU_CONFIG.baidu_tongji.access_token}&site_id=${HUHU_CONFIG.baidu_tongji.site_id}&method=source/all/a&start_date=${start_date}&end_date=${end_date}&metrics=pv_count,visitor_count`

      function getAllData() {
        var data = util.STORAGE.getInstance().get(SITE_PV_UV)
        if (data) {
          return Promise.resolve(data)
        } else {
          return $.ajax({
            url: all_url,
            dataType: 'jsonp',
            jsonp: 'callback'
          })
        }
      }

      getAllData().then(data => {
        if (data && data.result && data.result.pageSum) {
          $('.site_pv').html(data.result.pageSum[0][0] || '')
          $('.site_uv').html(data.result.pageSum[0][1] || '')
        }
      })
    }
  })
})
