'use strict'

const crc = require('crc')
const langEs = require('./messages/es.json')
const langs = {'es': langEs}

const verifyCrc = (raw, checksum) => {
  let crcData
  const idx = raw.lastIndexOf('|')
  const data = raw.slice(0, idx + 1)
  crcData = crc.crc16modbus(data)
  return crcData === checksum
}

const verifyLen = (raw, len) => {
  return raw.replace('\r\n', '').length === len
}

const isValid = (raw, len, checksum) => {
  return verifyCrc(raw, checksum) && verifyLen(raw, len)
}

const getAlarm = (alarm, speed, rfid) => {
  const messages = langs['es']
  const alarmTypes = {
    '01': {type: 'SOS_Button', message: messages[alarm]},
    '49': {type: 'DI', number: 5, status: true, message: messages[alarm]},
    '09': {type: 'Auto_Shutdown', message: messages[alarm]},
    '10': {type: 'Low_Battery', message: messages[alarm]},
    '11': {type: 'Over_Speed', status: true, message: messages[alarm].replace('{{speed}}', Math.round(speed))},
    '13': {type: 'Over_Speed', status: false, message: messages[alarm]},
    '14': {type: 'Aceleration', status: true, message: messages[alarm]},
    '15': {type: 'Aceleration', status: false, message: messages[alarm]},
    '30': {type: 'Parking', message: messages[alarm]},
    '42': {type: 'Geo_Fence', status: true, message: messages[alarm]},
    '43': {type: 'Geo_Fence', status: false, message: messages[alarm]},
    '50': {type: 'DI', number: 1, status: true, message: messages[alarm]},
    '51': {type: 'DI', number: 1, status: false, message: messages[alarm]},
    '52': {type: 'DI', number: 2, status: true, message: messages[alarm]},
    '53': {type: 'DI', number: 2, status: false, message: messages[alarm]},
    '54': {type: 'DI', number: 3, status: true, message: messages[alarm]},
    '55': {type: 'DI', number: 3, status: false, message: messages[alarm]},
    '56': {type: 'DI', number: 4, status: true, message: messages[alarm]},
    '57': {type: 'DI', number: 4, status: false, message: messages[alarm]},
    '60': {type: 'Charge', status: true, message: messages[alarm]},
    '61': {type: 'Charge', status: false, message: messages[alarm]},
    '66': {type: 'Rfid', message: messages[alarm].replace('{{rfid}}', rfid)},
    '77': {type: 'Angle', message: messages[alarm]},
    '88': {type: 'Heartbeat', message: messages[alarm]},
    '91': {type: 'Sleep', status: true, message: messages[alarm]},
    '92': {type: 'Sleep', status: false, message: messages[alarm]},
    'AA': {type: 'Gps', message: messages[alarm]}
  }
  return alarmTypes[alarm]
}

module.exports = {
  isValid: isValid,
  getAlarm: getAlarm
}
