require([
  'jquery',
  'util',
  'valine',
  'chart',
  'pagemap',
  'registerSW',
  'fancybox',
  'confirm',
  'share',
  'search'
], function($, util, valine, chart, pagemap) {
  'use strict'

  pagemap(document.querySelector('#pagemap'), {
    viewport: null,
    styles: {
      'header,footer,section,article': 'rgba(0, 0, 0, 0.08)',
      'h1,a': 'rgba(0, 0, 0, 0.1)',
      'h2,h3,h4': 'rgba(0, 0, 0, 0.08)'
    },
    back: 'rgba(0, 0, 0, 0.02)',
    view: 'rgba(0, 0, 0, 0.05)',
    drag: ' rgba(0, 0, 0, 0.1)',
    interval: null
  })

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
      $('#menu-mask')
        .removeClass('hide')
        .toggleClass('showMenuMask')
        .toggleClass('hideMenuMask')
      $('body').toggleClass('overflow')
    })

    $(document).on('click', '#menu-mask .icon-close', function() {
      $('#menu-mask')
        .removeClass('hide')
        .toggleClass('showMenuMask')
        .toggleClass('hideMenuMask')
      $('body').toggleClass('overflow')
    })

    // fixed-menu
    $(document).on('click', '#fixed-menu', function() {
      $('#fixed-menu-wrap > span').toggleClass('menu-reset')
    })

    $('h1,h2,h3,h4,h5,h6').hover(
      function() {
        $(this)
          .find('.post-anchor')
          .text('#')
      },
      function() {
        $(this)
          .find('.post-anchor')
          .text('')
      }
    )

    // post-toc
    $(document).on('click', '.icon-toc', function() {
      $('#post-toc')
        .removeClass('hide')
        .toggleClass('showToc')
        .toggleClass('hiddenToc')
    })

    // search
    $(document).on('click', '.search-box', function() {
      $('#search-shade')
        .removeClass('hide')
        .toggleClass('showSearch')
        .toggleClass('hiddenSearch')
      $('body').toggleClass('overflow')
      $('#fixed-menu-wrap > span').addClass('menu-reset')
    })

    $(document).on('click', '#search-shade .icon-close', function() {
      $('#search-shade')
        .toggleClass('showSearch')
        .toggleClass('hiddenSearch')
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
    $(document).on('click', '#reward-button', function() {
      $('#qr').toggle('1000')
    })

    // 顶部滚动进度条
    $(window).scroll(function() {
      var pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight // 页面总高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight // 浏览器视口高度
      var scrollAvail = pageHeight - windowHeight // 可滚动的高度
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop // 获取滚动条的高度
      var ratio = (scrollTop / scrollAvail) * 100 + '%'
      $('#progress > .line').css('width', ratio)
    })

    var mousewheel = function(e) {
      e = e || window.event

      // 判断浏览器IE，谷歌滑轮事件
      if (e.wheelDelta) {
        // 当滑轮向上滚动时
        if (e.wheelDelta > 0) {
          $('#side').removeClass('active')
        }

        // 当滑轮向下滚动时
        if (e.wheelDelta < 0) {
          $('#side').addClass('active')
        }
      }
      // Firefox滑轮事件
      else if (e.detail) {
        // 当滑轮向上滚动时
        if (e.detail > 0) {
          $('#side').removeClass('active')
        }

        // 当滑轮向下滚动时
        if (e.detail < 0) {
          $('#side').addClass('active')
        }
      }
    }

    document.addEventListener && document.addEventListener('DOMMouseScroll', mousewheel, false) // firefox
    window.onmousewheel = document.onmousewheel = mousewheel // 滚动滑轮触发scrollFunc方法 ie 谷歌

    // fiexed menu
    $(document).on('click', '.icon-arrowup', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      $('#fixed-menu-wrap > span').addClass('menu-reset')
    })

    function handleDisplay() {
      $(this)
        .addClass('active')
        .siblings()
        .removeClass('active')
      var cate = $(this)
        .attr('class')
        .split(' ')[0]
      $('.post-wrap > .post').each(function() {
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
      function prefix(date) {
        date = date + ''
        return date.length === 1 ? '0' + date : date
      }

      function setStatic(key, data) {
        // 过期时间为当天的24点
        var zero = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 // new Date().toLocaleDateString() "2019/11/18"
        var now = new Date().getTime()
        var SEARCH_EXPIRE = zero - now
        util.STORAGE.getInstance().set(key, data, SEARCH_EXPIRE)
      }

      // 近日七天访问PV、UV
      var BAIDU_CHART = 'BAIDU_CHART'
      var date = new Date()
      var start = new Date(date.getTime() - 60 * 60 * 1000 * 24 * 6)
      var start_date = `${start.getFullYear()}${prefix(start.getMonth() + 1)}${prefix(start.getDate())}`
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

          var dom = document.getElementById('line-chart')
          var ctx = dom ? dom.getContext('2d') : null
          ctx &&
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
              options: {
                title: {
                  display: true,
                  text: '近七天访问'
                }
              }
            })
        }
      })

      // 统计整站PV、UV
      var SITE_PV_UV = 'SITE_PV_UV'
      var all_start_date = new Date(HUHU_CONFIG.baidu_tongji.site_from || new Date())
      var format_start_date = `${all_start_date.getFullYear()}${prefix(all_start_date.getMonth() + 1)}${prefix(
        all_start_date.getDate()
      )}`

      var site_date = parseInt(Math.abs(date.getTime() - all_start_date.getTime()) / 1000 / 60 / 60 / 24)
      $('.site_from').html(HUHU_CONFIG.baidu_tongji.site_from || '')
      $('.site_date').html(site_date || '')
      var all_url = `https://openapi.baidu.com/rest/2.0/tongji/report/getData?access_token=${HUHU_CONFIG.baidu_tongji.access_token}&site_id=${HUHU_CONFIG.baidu_tongji.site_id}&method=source/all/a&start_date=${format_start_date}&end_date=${end_date}&metrics=pv_count,visitor_count`
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
        setStatic(SITE_PV_UV, data)
        if (data && data.result && data.result.pageSum && data.result.items) {
          $('.site_pv').html(data.result.pageSum[0][0] || '')
          $('.site_uv').html(data.result.pageSum[0][1] || '')
          var labels = []
          var datasets = []
          data.result.items[0].map(item => labels.push(item[0].name))
          data.result.items[1].map(item => datasets.push(item[0]))
          var dom = document.getElementById('doughnut-chart')
          var ctx = dom ? dom.getContext('2d') : null
          ctx &&
            new chart(ctx, {
              type: 'doughnut',
              data: {
                labels: labels,
                datasets: [
                  {
                    data: datasets,
                    backgroundColor: ['#d7ecfb', '#ffd8e1', '#e6d9ff']
                  }
                ]
              }
            })
        }
      })
    }
  })
})
