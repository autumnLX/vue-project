import config from '@/config/config.js'
import { unescape } from 'querystring';

/**
 * 扁平化数组，数组里面可以无限嵌套数组，但不可嵌套对象
 * @param {String} key
 * @param {Array} array
 */
const flattenArray = (key, array) => {
  let str = ''

  array.forEach((o, i) => {
    let k = `${key}[${i}]`
    if (typeof o === 'string' || typeof o === 'number') {
      str += `&${k}=${o}`
    } else if (o instanceof Array) {
      str += '&' + flattenArray(k, o)
    }
  })

  return str.substring(1)
}

/**
 * 序列化对象，对象可嵌套数组，不可嵌套对象
 * @param {Object} data
 */
const normalize = (data) => {
  let queryString = ''

  if (typeof data === 'object') {
    for (let key in data) {
      if (typeof data[key] === 'string' || typeof data[key] === 'number') {
        queryString += `&${key}=${data[key]}`
      } else if (data[key] instanceof Array) {
        queryString += '&' + flattenArray(key, data[key])
      } else {
        // 对象和方法自动忽略
      }
    }
  }

  return queryString.substring(1)
}

const createRequest = (callback) => {
  let request = new XMLHttpRequest()

  request.onreadystatechange = () => {
    if (request.readyState === XMLHttpRequest.DONE) {
      if (request.status === 200) {
        let response = JSON.parse(request.responseText)
        callback(response)
      }
    }
  }

  return request
}

export default {
  getUrlParam (name, method) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return method === 'decodeURI' ? decodeURI(r[2]) : unescape(r[2])
    } else {
      return null
    }
  },
  get (url, data, callback) {
    let request = createRequest(callback)

    request.open('GET', config.proxy + url + '?' + normalize(data))
    request.setRequestHeader('Accept', 'application/json')
    request.send()
  },
  getFromCp (url, data, callback) {
    if ((window.Config && window.Config.jdcpIP) || /^http/.test(config.proxy2)) {
      const u = (window.Config.jdcpIP || config.proxy2) + url
      window.$.ajax({
        method: 'GET',
        url: u,
        dataType: 'jsonp',
        data: data,
        jsonp: 'callback',
        success: (data) => {
          callback(data)
        }
      })
    } else {
      let request = createRequest(callback)

      request.open('GET', config.proxy2 + url + '?' + normalize(data))
      request.setRequestHeader('Accept', 'application/json')
      request.send()
    }
  },
  post (url, data, callback, type = 'form') {
    let request = createRequest(callback)
    let _url = /^\/mock\//.test(url) ? url : config.proxy + url

    request.open('POST', _url)

    if (type === 'form') {
      request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8')
      request.send(normalize(data))
    } else if (type === 'json') {
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      request.send(JSON.stringify(data))
    } else {
      request.send(data)
    }
  },
  now () {
    return (new Date()).toISOString().replace('T', ' ').replace(/\s(\d\d):/, (str, $1) => {
      return ' ' + (parseInt($1) + 8) + ':'
    }).split('.')[0]
  }
}
