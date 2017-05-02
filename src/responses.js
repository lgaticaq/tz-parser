'use strict'

const nmea = require('node-nmea')
const patterns = require('./patterns')
const langEs = require('./messages/es.json')
const langs = {'es': langEs}

const parseSetUserPassword = extra => {
  return {
    command: 'SetUserPassword',
    newPassword: extra[0]
  }
}

const parseSetIntervalOfSms = extra => {
  const x = extra[0]
  return {
    command: 'SETINTERVALOFSMS',
    enable: x !== '0',
    interval: x,
    limit: extra[1]
  }
}

const parseSetPhoneSmsForSos = extra => {
  return {
    command: 'SETPHONESMSFORSOS',
    enable: ((extra[0] === '0') && (extra[1] === '1')),
    callNumber: extra[2],
    smsNumber: extra[3]
  }
}

const parseSetLowPowerAlarm = extra => {
  return {
    command: 'SETLOWPOWERALARM',
    lowPower: parseFloat(extra[0]) / 100,
    autoShutdown: parseFloat(extra[1]) / 100
  }
}

const parseSetOverSpeedAlarm = extra => {
  return {
    command: 'SETOVERSPEEDALARM',
    enable: extra[0] === '1',
    speed: parseInt(extra[1], 10),
    times: parseInt(extra[2], 10),
    interval: parseInt(extra[3], 10)
  }
}

const parseDir = dir => {
  let raw
  if (/^-/.test(dir)) {
    if (dir.split('.')[0].length === 5) {
      raw = `${dir.substr(1)},S`
    } else {
      raw = `${dir.substr(1)},W`
    }
  } else {
    if (dir.split('.')[0].length === 5) {
      raw = `${dir.substr(1)},N`
    } else {
      raw = `${dir.substr(1)},E`
    }
  }
  return raw
}

const parseSetGeofenceAlarm = extra => {
  const lat1 = extra[0]
  const lon1 = extra[1]
  const lat2 = extra[2]
  const lon2 = extra[3]
  const y = extra[5]
  const data = {command: 'SETGEOFENCEALARM'}
  if (y === '0') {
    data.enable = false
  } else {
    data.enable = true
    data.mode = y === '1' ? 'inside' : 'outside'
    data.geojson = {
      type: 'Polygon',
      coordinates: [[
        [nmea.degToDec(parseDir(lon2)), nmea.degToDec(parseDir(lat2))],
        [nmea.degToDec(parseDir(lon2)), nmea.degToDec(parseDir(lat1))],
        [nmea.degToDec(parseDir(lon1)), nmea.degToDec(parseDir(lat1))],
        [nmea.degToDec(parseDir(lon1)), nmea.degToDec(parseDir(lat2))],
        [nmea.degToDec(parseDir(lon2)), nmea.degToDec(parseDir(lat2))]
      ]]
    }
  }
  return data
}

const parseSetExtend = extra => {
  const data = extra[0].split('')
  return {
    command: 'SETEXTEND',
    extend: {
      a: data[0] === '1',
      b: data[1] === '1',
      c: data[2] === '1',
      d: data[3] === '1',
      e: data[4] === '1',
      f: data[5] === '1',
      g: data[6] === '1'
    }
  }
}

const parseSetGsmBaud = extra => {
  const data = {command: 'SETGSMBAUD'}
  if (extra[0] === '0') {
    data.band = '900/1800'
  } else if (extra[0] === '1') {
    data.band = '850/1900'
  } else {
    data.band = 'auto'
  }
  return data
}

const parseSetApn = extra => {
  return {
    command: 'SETAPN',
    apn: extra[0],
    username: extra[1],
    pass: extra[2]
  }
}

const parseSetDns = extra => {
  return {
    command: 'SETDNS',
    enable: extra[0] === '1',
    dns1: extra[1],
    dns2: extra[2]
  }
}

const parseSetIpAndPort = extra => {
  return {
    command: 'SETIPANDPORT',
    host: extra[1],
    port: parseInt(extra[2], 10)
  }
}

const parseSetGprsInterval = extra => {
  const x = extra[0]
  return {
    command: 'SETGPRSINTERVAL',
    enable: x !== '0',
    interval: parseInt(x, 10),
    limit: parseInt(extra[1], 10)
  }
}

const parseSetSysSwitch = extra => {
  return {
    command: 'SETSYSSWITCH',
    enable: extra[0] === '1'
  }
}

const parseSetTcpSwitch = extra => {
  return {
    command: 'SETTCPSWITCH',
    mode: extra[0] === '1' ? 'tcp' : 'udp'
  }
}

const parseSetTrembleSwitch = extra => {
  return {
    command: 'SETTREMBLESWITCH',
    sleep: extra[0] === '1',
    tremble: extra[1] === '1'
  }
}

const parseSetSleepSwitch = extra => {
  return {
    command: 'SETSLEEPSWITCH',
    closeGps: extra[0] === '0',
    closeGsm: extra[1] === '0'
  }
}

const parseSetIoSwitch = extra => {
  const ports = {'A': 1, 'B': 2, 'C': 3, 'D': 4}
  return {
    command: 'SETIOSWITCH',
    enable: extra[1] === '1',
    port: ports[extra[0]]
  }
}

const parseSetHeartbeatSwitch = extra => {
  return {
    command: 'SETHEARTBEATSWITCH',
    enable: extra[0] === '1'
  }
}

const parseSetHeartbeatInterval = extra => {
  const x = extra[0]
  return {
    command: 'SETHEARTBEATINTERVAL',
    enable: x !== '0',
    interval: x
  }
}

const parseSetHeartbeatIntit = () => {
  return {command: 'SETHEARTBEATINIT'}
}

const parseSetTrembleToSleep = extra => {
  return {
    command: 'SETTREMBLETOSLEEP',
    after: parseInt(extra[0], 10)
  }
}

const parseSetTrembleToWakeup = extra => {
  return {
    command: 'SETTREMBLETOWAKEUP',
    after: parseInt(extra[0], 10)
  }
}

const parseSetParkingAlarm = extra => {
  return {
    command: 'SETPARKINGALARM',
    enable: extra[0] === '1'
  }
}

const parseFactoryReset = () => {
  return {command: 'FACTORYRESET'}
}

const parseRboot = () => {
  return {command: 'RBOOT'}
}

const parseSetOilSenser = extra => {
  return {
    command: 'SETOILSENSER',
    empty: parseInt(extra[0], 10) / 100,
    full: parseInt(extra[1], 10) / 100
  }
}

const parseSetShutOil = extra => {
  return {
    command: 'SETSHUTOIL',
    speed: parseInt(extra[0], 10),
    off: parseInt(extra[1], 10),
    restart: parseInt(extra[2], 10),
    repeat: parseInt(extra[3], 10)
  }
}

const parseSetShutOilSwitch = extra => {
  return {
    command: 'SETSHUTOILSWITCH',
    enable: extra[0] === '1'
  }
}

const parseSetCallA = extra => {
  return {
    command: 'SETCALLA',
    mode: extra[0] === '0' ? 'gprs' : 'call',
    number: extra[1]
  }
}

const parseSetExtend2 = extra => {
  const data = extra[0].split('')
  return {
    command: 'SETEXTEND2',
    extend: {
      a: data[0] === '1',
      b: data[1] === '1',
      c: data[2] === '1',
      d: data[3] === '1',
      e: data[4] === '1',
      f: data[5] === '1',
      g: data[6] === '1',
      h: data[7] === '1'
    }
  }
}

const parseSetPin = extra => {
  return {
    command: 'SETPIN',
    enable: extra[0] === '1',
    pin: extra[1]
  }
}

const parseSetAngle = extra => {
  const x = extra[0]
  const data = {command: 'SETANGLE'}
  if (x === '0') {
    data.enable = false
  } else if (x === '1') {
    data.enable = true
  } else if (x === '2') {
    data.enable = true
    data.port = 4
  } else {
    data.enable = true
    data.port = 3
  }
  data.angle = parseInt(extra[1], 10)
  return data
}

const parseReboot = extra => {
  return {
    command: 'SETREBOOT',
    enable: extra[0] === '1',
    interval: parseInt(extra[1], 10)
  }
}

const parseSetAccAlarm = extra => {
  return {
    command: 'SETACCALARM',
    enable: extra[0] === '1',
    acceleration: parseInt(extra[1], 10),
    deceleration: parseInt(extra[2], 10)
  }
}

const parseSetRoaming = extra => {
  return {
    command: 'SETROAMING',
    enable: extra[0] === '1',
    interval: parseInt(extra[1], 10),
    network: extra[2]
  }
}

const parseSetackstate = extra => {
  return {
    command: 'SETACKSTATE',
    enable: extra[0] === '1'
  }
}

const parseSetcallfilter = extra => {
  return {
    command: 'SETCALLFILTER',
    enable: extra[0] === '1',
    caller: extra[1]
  }
}

const parseSetsendtype = extra => {
  return {
    command: 'SETSENDTYPE',
    mode: extra[0] === '0' ? 'gprs' : 'sms'
  }
}

const parseSetpictureinterval = extra => {
  return {
    command: 'SETPICTUREINTERVAL',
    interval: parseInt(extra[0], 10),
    times: parseInt(extra[1], 10)
  }
}

const parseClearbuf = () => {
  return {command: 'CLEARBUF'}
}

const parseGetpicture = () => {
  return {command: 'GETPICTURE'}
}

const parseSetdataflash = extra => {
  return {
    command: 'SETDATAFLASH',
    enable: extra[0] === '1'
  }
}

const parseSettrackinginterval = extra => {
  return {
    command: 'SETTRACKINGINTERVAL',
    enable: extra[0] === '1',
    intervalOn: parseInt(extra[1], 10),
    intervalOff: parseInt(extra[2], 10)
  }
}

const parseSetsendodometer = extra => {
  return {
    command: 'SETSENDODOMETER',
    enable: extra[0] === '1',
    range: parseInt(extra[1], 10)
  }
}

const parseSetimei = extra => {
  return {
    command: 'SETIMEI',
    enable: extra[0] === '1',
    newImei: extra[1]
  }
}

const parseSetidle = extra => {
  return {
    command: 'SETIDLE',
    enable: extra[0] === '1',
    interval: parseInt(extra[1], 10)
  }
}

const parseSetintervalgprsstandby = extra => {
  return {
    command: 'SETINTERVALGPRSSTANDBY',
    enable: extra[0] === '1',
    interval: parseInt(extra[1], 10)
  }
}

const parseSetiopicture = extra => {
  const x = extra[0]
  const y = extra[1]
  let data = {command: 'SETIOPICTURE'}
  const dataX = {
    '0': {enable: false, port: null},
    '1': {enable: true, port: 4},
    '2': {enable: true, port: 3},
    '3': {enable: true, port: 2},
    '4': {enable: true, port: 1}
  }
  const dataY = {
    '1': {mode: 'open'},
    '2': {mode: 'close'},
    '3': {mode: 'both'}
  }
  data = Object.assign(dataX[x], data)
  data = Object.assign(dataY[y], data)
  data.times = parseInt(extra[2], 10)
  return data
}

const parseSetpicturepacket = extra => {
  return {
    command: 'SETPICTUREPACKET',
    number: parseInt(extra[0], 10)
  }
}

const getCommand = (raw, lang) => {
  const messages = langs[lang] || langs['es']
  const match = patterns.receiveOk.exec(raw.toString())
  const password = match[1]
  const code = match[2]
  const extra = match[3] ? match[3].substr(1).split(',') : null
  let defaultData = {
    manufacturer: 'tz',
    device: 'tz',
    type: 'ok',
    password: password
  }
  const parsers = {
    '001': parseSetUserPassword,
    '002': parseSetIntervalOfSms,
    '003': parseSetPhoneSmsForSos,
    '004': parseSetLowPowerAlarm,
    '005': parseSetOverSpeedAlarm,
    '006': parseSetGeofenceAlarm,
    '008': parseSetExtend,
    '009': parseSetGsmBaud,
    '011': parseSetApn,
    '014': parseSetDns,
    '015': parseSetIpAndPort,
    '016': parseSetSysSwitch,
    '018': parseSetGprsInterval,
    '019': parseSetTcpSwitch,
    '021': parseSetTrembleSwitch,
    '022': parseSetSleepSwitch,
    '023': parseSetintervalgprsstandby,
    '025': parseSetIoSwitch,
    '040': parseSetHeartbeatSwitch,
    '041': parseSetHeartbeatInterval,
    '042': parseSetHeartbeatIntit,
    '043': parseSetTrembleToWakeup,
    '044': parseSetTrembleToSleep,
    '103': parseSetCallA,
    '110': parseSetParkingAlarm,
    '113': parseSetOilSenser,
    '116': parseSetShutOilSwitch,
    '117': parseSetShutOil,
    '118': parseSetExtend2,
    '119': parseSetsendtype,
    '120': parseSetAccAlarm,
    '121': parseSetRoaming,
    '122': parseSetPin,
    '123': parseSetackstate,
    '130': parseSetcallfilter,
    '151': parseSetsendodometer,
    '155': parseSetimei,
    '156': parseSettrackinginterval,
    '200': parseSetpictureinterval,
    '201': parseSetiopicture,
    '202': parseSetpicturepacket,
    '210': parseGetpicture,
    '300': parseSetAngle,
    '400': parseSetAngle,
    '404': parseSetidle,
    '500': parseClearbuf,
    '600': parseReboot,
    '601': parseSetdataflash,
    '990': parseFactoryReset,
    '991': parseRboot
  }
  const parser = parsers[code]
  const data = Object.assign(parser ? parser(extra) : {}, defaultData)
  data.message = messages[data.command] || messages.default
  return data
}

module.exports = {
  getCommand: getCommand
}
