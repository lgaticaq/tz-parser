'use strict'

module.exports = raw => {
  const results = raw.toString().match(/\$U\d{15}\d{5}\d{3}\d{3}[0-9a-fA-F]{1,200}#/g).map(x => {
    const match = /\$U(\d{15})(\d{5})(\d{3})(\d{3})([0-9a-fA-F]{1,200})#/.exec(x)
    return {
      imei: match[1],
      number: parseInt(match[2], 10),
      total: parseInt(match[3], 10),
      sequence: parseInt(match[4], 10),
      data: match[5]
    }
  })
  return {
    manufacturer: 'tz',
    device: 'tz',
    type: 'image',
    imei: results[0].imei,
    number: results[0].number,
    total: results[0].total,
    data: results.map(x => ({sequence: x.sequence, data: x.data}))
  }
}
