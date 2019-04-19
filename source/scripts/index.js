// init $
function $(dom) {
  return new _$(dom)
}

function _$(query) {
  this.dom = document.querySelector(query)
  return this
}

_$.prototype.addClass = function(...className) {
  this.dom.classList.add(...className)
  return this
}

_$.prototype.removeClass = function(...className) {
  this.dom.classList.remove(...className)
  return this
}

_$.prototype.addStyle = function(name, value) {
  this.dom.style[name] = value
  return this
}

// init dom
let headerDom = $("header")

// header func
function showHeader() {
  headerDom.addClass("show-header")
  headerDom.removeClass("hide-header")
}
function hideHeader() {
  headerDom.addClass("hide-header")
  headerDom.removeClass("show-header")
}

// bind event
window.onload = function() {
  window.onscroll = function() {
    var scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop

    if (scrollTop === 0) {
      headerDom.addStyle("backgroundColor", "transparent")
    } else {
      headerDom.addStyle("backgroundColor", "#0D2041")
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
  if (document.addEventListener) {
    document.addEventListener("DOMMouseScroll", scrollFunc, false)
  }
  // IE、Chrome
  window.onmousewheel = document.onmousewheel = scrollFunc
}
