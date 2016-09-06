'use strict';

const crc = require('crc');

const verifyCrc = (raw, checksum) => {
  let crcData;
  const idx = raw.lastIndexOf('|');
  const data = raw.slice(0, idx + 1);
  crcData = crc.crc16modbus(data);
  return crcData === checksum;
};

const verifyLen = (raw, len) => {
  return raw.replace('\r\n', '').length === len;
};

const isValid = (raw, len, checksum) =>{
  return verifyCrc(raw, checksum) && verifyLen(raw, len);
};

const getAlarm = alarm => {
  const alarmTypes = {
    '01': {type: 'SOS_Button'},
    '49': {type: 'DI', number: 5, status: false},
    '09': {type: 'Auto_Shutdown'},
    '10': {type: 'Low_Battery'},
    '11': {type: 'Over_Speed', status: true},
    '13': {type: 'Over_Speed', status: false},
    '14': {type: 'Aceleration', status: true},
    '15': {type: 'Aceleration', status: false},
    '30': {type: 'Parking'},
    '42': {type: 'Geo_Fence', status: true},
    '43': {type: 'Geo_Fence', status: false},
    '50': {type: 'DI', number: 1, status: false},
    '51': {type: 'DI', number: 1, status: true},
    '52': {type: 'DI', number: 2, status: false},
    '53': {type: 'DI', number: 2, status: true},
    '54': {type: 'DI', number: 3, status: false},
    '55': {type: 'DI', number: 3, status: true},
    '56': {type: 'DI', number: 4, status: false},
    '57': {type: 'DI', number: 4, status: true},
    '60': {type: 'Charge', status: true},
    '61': {type: 'Charge', status: false},
    '66': {type: 'Rfid'},
    '77': {type: 'Angle'},
    '88': {type: 'Heartbeat'},
    '91': {type: 'Sleep', status: true},
    '92': {type: 'Sleep', status: false},
    'AA': {type: 'Gps'}
  };
  return alarmTypes[alarm];
};

module.exports = {
  isValid: isValid,
  getAlarm: getAlarm
};
