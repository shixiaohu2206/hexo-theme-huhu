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

// init domF
let headerDom = $(".header-bg")

window.onscroll = function() {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop

  // transform: translateY(-100%)
  if (scrollTop === 0) {
    headerDom.addStyle("transform", "translateY(-100%)")
  } else {
    headerDom.addStyle("transform", "translateY(0)")
  }
}
