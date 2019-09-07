// version
var VERSION = '1.0.0'
// cache key
var CACHE_PRE_NAME = 'UTONE_CACHE_'
// cache key
var CACHE_WHITE_PRE_NAME = 'UTONE_WHITE_CACHE_'
// cache name
var CACHE_NAME = CACHE_PRE_NAME + VERSION
// white cache name
var WHITE_CACHE_NAME = CACHE_WHITE_PRE_NAME + VERSION
// 需要预缓存文件
var PRE_CACHE_FILES = [
  '/2019083151629',
  '/2018082231017',
  '/scripts/app.js',
  '/scripts/util.js',
  '/scripts/cdn/Valine.min.js'
]

// 监听message
self.addEventListener('message', function(event) {
  console.log('sw receive message', event.data)
  fetchPreCache()
})

// sw.js被安装时会触发 install 事件
self.addEventListener('install', event => {
  /**
   * event.waitUtil 用于在安装成功之前执行一些预装逻辑
   * 但是建议只做一些轻量级和非常重要资源的缓存，减少安装失败的概率
   * 安装成功后 ServiceWorker 状态会从 installing 变为 installed
   */
  event.waitUntil(self.skipWaiting()) // 执行skipWaiting跳过waiting状态，进入activate状态
})

// 监听activate
self.addEventListener('activate', event =>
  event.waitUntil(
    Promise.all([
      // 当一个 service worker 被初始注册时
      // 页面在下次加载之前不会使用它。
      // claim() 方法会立即控制这些页面
      self.clients.claim(),
      // 清理旧版本
      deleteCache()
    ])
  )
)

function fetchCacheFile(uri, cache) {
  var path = self.location.origin + uri
  return cache.add(path).catch(function(e) {
    console.warn('pre cache' + path + 'file failed', e || {})
    return Promise.resolve()
  })
}

function fetchPreCache() {
  if (!PRE_CACHE_FILES || PRE_CACHE_FILES.length === 0) {
    return Promise.resolve()
  } else {
    console.log(2222)
    return caches.open(CACHE_NAME).then(function(cache) {
      return cache.keys().then(function(list) {
        if (list && list.length > 0) {
          return Promise.resolve()
        }

        let addPromiseArray = []

        PRE_CACHE_FILES.forEach(function(file) {
          addPromiseArray.push(fetchCacheFile(file, cache))
        })

        return Promise.all(addPromiseArray)
          .then(function() {
            console.log('pre cache files success')
          })
          .catch(function(e) {
            console.warn('pre cache files failed', e || {})
            return Promise.resolve()
          })
      })
    })
  }
}

function deleteCache() {
  return caches.keys().then(function(list) {
    return Promise.all(
      list.map(function(key) {
        if (!~key.indexOf(VERSION)) {
          return caches.delete(key).catch(function(e) {
            console.log('delete sw cache error:', e || {})
            return Promise.resolve()
          })
        }
        return Promise.resolve()
      })
    )
  })
}

// 监听所有scope下的网络请求
self.addEventListener('fetch', function(event) {
  if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') {
    return
  }

  event.respondWith(
    caches.match(event.request).then(hit => {
      // 返回缓存中命中的文件
      if (hit) {
        return hit
      }

      const fetchRequest = event.request.clone()

      if (navigator.online) {
        // 如果为联网状态
        return onlineRequest(fetchRequest)
      } else {
        // 如果为离线状态
        return offlineRequest(fetchRequest)
      }
    })
  )
})

// 监听error
self.onerror = function(errorMessage, scriptURI, lineNumber, columnNumber, error) {
  if (error) {
    reportError(error)
  } else {
    reportError({
      message: errorMessage,
      script: scriptURI,
      line: lineNumber,
      column: columnNumber
    })
  }
}

// 监听unhandledrejection
self.addEventListener('unhandledrejection', function(event) {
  reportError({
    message: event.reason
  })
})

function reportError(e) {
  console.warn(e)
}

// 联网状态下执行
function onlineRequest(fetchRequest) {
  // credentials携带cookie
  return fetch(fetchRequest, { credentials: 'include' })
    .then(response => {
      // 在资源请求成功后，将 image、js、css 资源加入缓存列表
      if (
        !response ||
        response.status !== 200 ||
        !response.headers.get('Content-type').match(/image|javascript|text\/html|test\/css/i)
      ) {
        return response
      }

      const responseToCache = response.clone()
      caches.open(WHITE_CACHE_NAME).then(function(cache) {
        cache.put(event.request, responseToCache)
      })

      return response
    })
    .catch(function() {
      // 获取失败，离线资源降级替换
      offlineRequest(fetchRequest)
    })
}

// 离线状态下执行，降级替换
function offlineRequest(request) {
  // 使用离线图片
  if (request.url.match(/\.(png|gif|jpg)/i)) {
    return caches.match('/images/offline.png')
  }

  // 使用离线页面
  if (request.url.match(/\.html$/)) {
    return caches.match('/test/offline.html')
  }
}
