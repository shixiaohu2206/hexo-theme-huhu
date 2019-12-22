let env = process.env.NODE_ENV || ''

module.exports = function() {
  const theme = this.theme
  const cdn_css = theme.cdn_css || {}
  const cdn_script = theme.cdn_script || {}

  let google_ad_client = this.config.google_ad_client
  let google_ad_script = google_ad_client
    ? `;(adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: '${google_ad_client}',
    enable_page_level_ads: true
  })`
    : ''

  let require_config = {
    paths: {
      // local
      util: 'util',
      share: 'share',
      search: 'search',
      pagemap: 'pagemap.min',
      registerSW: 'registerSW',
      valine: 'cdn/Valine.min',

      // cdn
      av: [`${trimSuffix(cdn_script.av_min)}`],
      pjax: [`${trimSuffix(cdn_script.pjax)}`],
      jquery: [`${trimSuffix(cdn_script.jquery)}`],
      confirm: [`${trimSuffix(cdn_script.confirm)}`],
      fancybox: [`${trimSuffix(cdn_script.fancybox)}`],
      chart: [`${trimSuffix(cdn_script.chart)}`]
    },

    map: {
      '*': {
        css: `${cdn_script.css}`
      }
    },

    shim: {
      fancybox: {
        deps: [`css!${cdn_css.fancybox}`]
      },
      confirm: {
        deps: [`css!${cdn_css.confirm}`]
      },
      chart: {
        deps: [`css!${cdn_css.chart}`]
      }
    },

    // timeout
    waitSeconds: 3
  }

  let require_script = `window.loadJs && window.loadJs('${
    cdn_script.require
  }', true, function() {require.config(${JSON.stringify(require_config)})})`

  let script = `<script type="text/javascript">window.addEventListener('load', function() {
    ${google_ad_script}
    window.loadJs = function(d, m, a) {
      var c = document.getElementsByTagName('head')[0] || document.head || document.documentElement
      var b = document.createElement('script')
      b.defer = true
      b.setAttribute('type', 'text/javascript')
      b.setAttribute('charset', 'UTF-8')
      b.setAttribute('async', 'true')
      b.setAttribute('src', d)
      m && b.setAttribute('data-main', '/scripts/${env === 'development' ? 'app' : 'app-built'}')
      if (typeof a === 'function') {
        if (window.attachEvent) {
          b.onreadystatechange = function() {
            var e = b.readyState
            if (e === 'loaded' || e === 'complete') {
              b.onreadystatechange = null
              a()
            }
          }
        } else {
          b.onload = a
        }
      }
      c.appendChild(b)
    }
    ${require_script}
  })</script>`

  return script
}

function trimSuffix(href) {
  return (href && href.substring(0, href.lastIndexOf('.'))) || ''
}
