export default {
  proxy: '/api',
  proxy2: '/cp',
  model: 3, // 1仅作业，2仅测评，3作业+测评
  res: 'https://17ks.chivoxapp.com/', // 资源地址
  qid: 'PAPER-130601-QT-000101',
  cpUrl: 'https://cp.kami.com/',
  chivox: {
    appKey: '144602295000000c',
    secretKey: 'd55a7ed3b4cfef097f2db1610c8b1b02',
    language: 'zh-CN',
    coreTimeout: 20 * 1000,
    onFlashLoad: function (code, message) {
      console.log('onFlashLoad: ' + code)
    },
    onConnectorStatusChange: function (code, msg) {
      console.log('onConnectorStatusChange: ' + code)
    },
    onMicStatusChange: function (code, msg) {
      console.log('onMicStatusChange: ' + code)
    },
    onError: function (code, msg) {
      console.log('onError: ' + code)
    }
  }
}
