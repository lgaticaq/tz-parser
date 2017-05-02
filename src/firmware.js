'use strict'

const patterns = require('./patterns')

module.exports = data => {
  const match = patterns.firmware.exec(data.toString())
  return {
    manufacturer: 'tz',
    device: 'tz',
    type: 'firmware',
    imei: match[1],
    firmware: match[2],
    gsm: match[3]
  }
}
