/**
 * 分享模块
 */
define(['jquery', 'confirm'], function($) {
  'use strict'

  var DEFAULT_SITES = ['weibo', 'qq', 'wechat', 'douban', 'qzone', 'facebook', 'twitter', 'google']

  var TEMP = {
    qqkongjian:
      'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url={{URL}}&title={{TITLE}}&desc={{DESCRIPTION}}&summary={{SUMMARY}}&site={{SOURCE}}&pics={{IMAGE}}',
    QQ:
      'http://connect.qq.com/widget/shareqq/index.html?url={{URL}}&title={{TITLE}}&source={{SOURCE}}&desc={{DESCRIPTION}}&pics={{IMAGE}}',
    weibo:
      'https://service.weibo.com/share/share.php?url={{URL}}&title={{TITLE}}&pic={{IMAGE}}&appkey={{WEIBOKEY}}',
    weixin: 'javascript:;',
    douban:
      'http://shuo.douban.com/!service/share?href={{URL}}&name={{TITLE}}&text={{DESCRIPTION}}&image={{IMAGE}}&starid=0&aid=0&style=11',
    facebook:
      'https://www.facebook.com/sharer/sharer.php?u={{URL}}&title={{TITLE}}&description={{DESCRIPTION}}&caption={{SUBHEAD}}&link={{URL}}&picture={{IMAGE}}',
    twitter: 'https://twitter.com/intent/tweet?text={{TITLE}}&url={{URL}}&via={{SITE_URL}}',
    google: 'https://plus.google.com/share?url={{URL}}'
  }

  function handleHref(type, data) {
    var href = TEMP[type] || ''
    data.summary = data.description
    Object.keys(data).map(function(key) {
      let reg = key.toUpperCase() || ''
      href = href.replace(new RegExp('{{' + reg + '}}', 'g'), data[key])
    })

    return href
  }

  $.fn.share = function(options) {
    var defaultOptions = {
      url: location.href,
      sites: DEFAULT_SITES,
      site_url: location.origin,
      source:
        $(document.head)
          .find('[name=site]')
          .attr('content') || document.title,
      title:
        $(document.head)
          .find('[name=title]')
          .attr('content') || document.title,
      description:
        $(document.head)
          .find('[name=description]')
          .attr('content') || '',
      image: $('img:first').prop('src') || '',
      weiboKey: ''
    }

    options = $.extend({}, defaultOptions, options)

    var site_temp = ''
    options.sites.map(function(v) {
      site_temp += `<a href="${handleHref(v, options)}" target="_blank">
                      <span class="iconfont icon-${v}"></span> 
                    </a>`
    })

    var content = `<div id="share">
                        ${site_temp}
                  </div>`

    $.confirm({
      title: 'Share',
      useBootstrap: false,
      boxWidth: '15rem',
      escapeKey: 'true',
      animation: 'rotateYR',
      content: content,
      buttons: {
        close: {
          text: 'Close'
        }
      }
    })
  }
})
