/**
 * ServiceWorker 模块
 */
define('registerSW', ['jquery'], function($) {
  function register() {
    navigator.serviceWorker
      .register('/sw.js?', {
        scope: `/`
      })
      .then(function(registration) {
        console.log('register sw success!:', registration.scope)
        var activeWorker = registration.active
        registration.onupdatefound = () => {
          var installingWorker = registration.installing
          if (installingWorker) {
            installingWorker.onstatechange = function() {
              console.log('sw installing state:', installingWorker.state, installingWorker)
            }
          }
          if (activeWorker) {
            activeWorker.onstatechange = () => {
              console.log('sw active state:', activeWorker.state, activeWorker)
              activeWorker.state == 'redundant' && window.location.reload()
            }
          }
        }

        // 发送消息，sw监听事件message接收，并处理缓存
        registration.active && registration.active.postMessage()
      })
      .catch(function(e) {
        console.log('register sw failed!:', e)
      })

    // 监听安装
    window.addEventListener('beforeinstallprompt', function(e) {
      window.dfdPrompt = e
      // 阻止默认事件
      e.preventDefault()
      return false
    })
  }

  // 监听注册sw事件
  document.addEventListener(
    'registerSwEvent',
    function(e) {
      register()
    },
    false
  )

  if ('serviceWorker' in navigator && window.caches && navigator.serviceWorker.getRegistration) {
    navigator.serviceWorker
      .getRegistration(`/`)
      .then(function(registration) {
        // 注册事件
        var event = new Event('registerSwEvent')

        // 不存在SW or 新的SW已存在
        if (!registration || registration.scope === window.location.origin + '/') {
          document.dispatchEvent(event) // 注册新sw
          return
        }

        // scope不为'/'，就注销旧的服务
        if (registration.scope) {
          registration
            .unregister()
            .then(function(flag) {
              if (flag) {
                console.log(`unregister older sw success!`)
                document.dispatchEvent(event) // 注册新sw
              }
            })
            .catch(function(e) {
              console.error(`unregister older sw failed!`, e)
            })
        }
      })
      .catch(function(e) {
        console.error(`get older sw failed!`, e)
      })
  }
})
