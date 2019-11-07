if ('serviceWorker' in navigator && window.caches && navigator.serviceWorker.getRegistration) {
  navigator.serviceWorker
    .getRegistration(`/${Crocodile.systemName}/`)
    .then(function(registration) {
      var event = new Event('registerSW')

      // 不存在SW
      if (!registration) {
        // 注册新的sw服务
        document.dispatchEvent(event)
        return
      }

      var scope = registration.scope
      // 新的SW已存在
      if (scope === window.location.origin + '/') {
        // 注册新的sw服务
        document.dispatchEvent(event)
        return
      }

      // 沒有匹配到新的SW，即爲旧的SW
      if (scope) {
        // 注销旧的服务
        registration
          .unregister()
          .then(function(boolean) {
            if (boolean) {
              window.__pwaUbtData__ = {
                action: 'unregister_sw',
                state: 'success'
              }

              console.log(`注销旧的${Crocodile.systemName} serviceWorker成功`)
              // 注册新的sw服务
              document.dispatchEvent(event)
            }
          })
          .catch(function(error) {
            window.__pwaUbtData__ = {
              action: 'unregister_sw',
              state: 'fail',
              error: error && error.message
            }

            console.error(`注销旧的${Crocodile.systemName} serviceWorker失败`)
          })
      }
    })
    .catch(function(error) {
      window.__pwaUbtData__ = {
        action: 'get_old_register',
        state: 'fail',
        error: error && error.message
      }

      console.error(`获取旧的${Crocodile.systemName} serviceWorker失败`)
    })
}
