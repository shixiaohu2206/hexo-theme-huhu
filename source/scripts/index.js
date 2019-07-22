// 天气接口
function getWeath() {
  let weathKey = 'WEATH'
  let weathData = localStorage.get(weathKey)

  if (weathData) {
    return Promise.resolve(weathData)
  } else {
    return new Promise((resolve, reject) => {
      fetch('https://www.tianqiapi.com/api/').then(
        data => {
          if (data.ok) {
            data.json().then(resp => {
              if (resp) {
                localStorage.set('WEATH', resp)
                return resolve(resp)
              } else {
                return reject()
              }
            })
          } else {
            return reject()
          }
        },
        e => {
          return reject(e)
        }
      )
    })
  }
}

// 缓存
let localStorage = (function() {
  let storage = window.localStorage
  let expire = 3 * 60 * 60 * 1000 // 默认过期时间3小时

  function get(key) {
    let value
    try {
      value = JSON.parse(storage.getItem(key))

      if (value) {
        let now = getNow()
        if (value.expireTime < now) {
          value = {}
        }
      }
    } catch (e) {
      console.warn(e)
      value = {}
    }

    return value
  }

  function set(key, value) {
    value = value || {}
    key = key && key.toLocaleUpperCase()

    if (value) {
      let now = getNow()
      value.setTime = now
      value.expireTime = now + expire

      try {
        value = JSON.stringify(value)
      } catch (e) {
        value = ''
      }

      storage.setItem(key, value)
    } else {
      return false
    }
  }

  function remove() {}

  return {
    get,
    set,
    remove
  }
})()

function getNow() {
  return new Date().getTime()
}

$(document).ready(function() {
  // 天气接口
  getWeath().then(data => {
    console.log(data)
  })

  let imagesDom = $('img')

  for (let i = 0; i < imagesDom.length; i++) {
    new Viewer(imagesDom[i])
  }
})
