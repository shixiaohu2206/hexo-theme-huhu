// // init $
// function $(dom) {
//   return new _$(dom)
// }

// function _$(query) {
//   this.dom = document.querySelector(query)
//   return this
// }

// _$.prototype.addClass = function(...className) {
//   this.dom.classList.add(...className)
//   return this
// }

// _$.prototype.removeClass = function(...className) {
//   this.dom.classList.remove(...className)
//   return this
// }

// _$.prototype.addStyle = function(name, value) {
//   this.dom.style[name] = value
//   return this
// }

// // init domF
// let headerDom = $('header')

// // header func
// function showHeader() {
//   headerDom.addClass('show-header')
//   headerDom.removeClass('hide-header')
// }
// function hideHeader() {
//   headerDom.addClass('hide-header')
//   headerDom.removeClass('show-header')
// }

window.weathCb = function(data) {
  console.log(data)
}

// 天气接口回调
function getWeathCb() {
  fetch('https://www.tianqiapi.com/api/', {}).then(
    data => {
      if (data.ok) {
        console.log(data)
        console.log(data.body)
        console.log(data.json())
      }
    },
    () => {}
  )
}

// bind event
window.onload = function() {
  // getWeathCb()

  let imagesDom = document.getElementsByTagName('img')

  for (let i = 0; i < imagesDom.length; i++) {
    new Viewer(imagesDom[i])
  }

  window.onscroll = function() {
    var scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop

    if (scrollTop === 0) {
      headerDom.addStyle('backgroundColor', 'transparent')
    } else {
      headerDom.addStyle('backgroundColor', 'rgba(30,30,30,.98)')
    }
  }

  let scrollFunc = function(e) {
    e = e || window.event
    if (e.wheelDelta) {
      // IE、Chrome
      if (e.wheelDelta > 0) {
        showHeader()
      }
      if (e.wheelDelta < 0) {
        hideHeader()
      }
    } else if (e.detail) {
      // Firefox
      if (e.detail > 0) {
        showHeader()
      }
      if (e.detail < 0) {
        hideHeader()
      }
    }
  }
  // //firefox
  // if (document.addEventListener) {
  //   document.addEventListener('DOMMouseScroll', scrollFunc, false)
  // }
  // // IE、Chrome
  // window.onmousewheel = document.onmousewheel = scrollFunc
}
