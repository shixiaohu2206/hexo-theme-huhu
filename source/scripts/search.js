/**
 * 站内搜索
 */
define(['jquery', 'util'], function($, util) {
  'use strict'

  var SEARCH_KEY = 'SEARCH'
  var SEARCH_EXPIRE = 30 * 24 * 60 * 60 * 1000 // 默认过期时间30天
  var resultBoxDom = $('#result-box')
  var resultConutBoxDom = $('#result-count')
  var _img_temp = `<div class="left" style="background-image: url('{IMG}')"></div>`
  var _temp = `<li>
                <a href="{PERMALINK}" target="_blank">
                  {IMG_TEMP}
                  <div class="right">
                    <div class="title">{TITLE}</div>
                    <div class="time">{TIME}</div>
                    <div class="intro">{INTRO}</div>
                  </div>
                </a>
              </li>`

  function getStatic() {
    return util.STORAGE.getInstance().get(SEARCH_KEY)
  }

  function setStatic(value) {
    return util.STORAGE.getInstance().set(SEARCH_KEY, value, SEARCH_EXPIRE)
  }

  function getSeatchData() {
    let content = getStatic()
    if (!content) {
      return fetch('/content.json', { method: 'GET' })
        .then(resp => resp.json())
        .then(json => {
          json && setStatic(json)
          return json
        })
        .catch(error => console.log('fetch failed', error))
    } else {
      return Promise.resolve(content)
    }
  }

  /**
   * 匹配
   */
  function matcher(post, key) {
    // 关键字 => 正则，空格隔开的看作多个关键字
    // a b c => /a|b|c/gmi
    // g 全局匹配，m 多行匹配，i 不区分大小写
    var regExp = new RegExp(key.replace(/[ ]/g, '|'), 'gmi')

    // 匹配优先级：title > tags > text
    return (
      regExp.test(post.title) ||
      post.tags.some(function(tag) {
        return regExp.test(tag.name)
      }) ||
      regExp.test(post.text)
    )
  }

  function inputSearch(key) {
    if (key) {
      // 尝试获取数据
      getSeatchData().then(data => {
        let posts = data.posts

        if (posts.length) {
          let result
          result = posts.filter(post => matcher(post, key))
          resultConutBoxDom.html(result.length)

          if (result.length) {
            let _li = ''
            for (let i = 0; i < result.length; i++) {
              let _img = ''
              if (result[i].photos.length > 0) {
                _img = _img_temp.replace('{IMG}', result[i].photos[0])
              }

              _li += _temp
                .replace('{PERMALINK}', result[i].permalink)
                .replace('{TITLE}', result[i].title)
                .replace('{IMG_TEMP}', _img)
                .replace('{TIME}', result[i].date)
                .replace('{INTRO}', result[i].text.substring(0, 100) + '...')
            }
            resultBoxDom.html(_li)
          } else {
            resultBoxDom.html(`<li><a href="#">无结果</a></li>`)
          }
        }
      })
    } else {
      resultBoxDom.html('')
      resultConutBoxDom.html(0)
    }
  }

  $(document).on('input', '.input-wrap > input', util.debounce(inputSearch, 300))
})
