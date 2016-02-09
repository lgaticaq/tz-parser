'use strict';

import crc from 'crc';
import moment from 'moment';
import nmea from 'node-nmea';

const patterns = {
  avl05: /^\$\$([0-9A-F]{2})(\d{15})\|([0-9A]{2})(\$GPRMC\,(\d{6}\.\d{3})\,([AV])\,(\d{4}\.\d{4}\,[NS])\,(\d{5}\.\d{4}\,[WE])\,(\d{1,3}\.\d{1,3})?\,(\d{1,3}\.\d{1,3})?\,(\d{6})\,((\d{1,3}\.\d{1,3})?\,([WE])?)\,?([ADENS])?\*([0-9A-F]{2})|[0]{60})\|(\d{2}\.\d{1})\|(\d{2}\.\d{1})\|(\d{2}\.\d{1})\|([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])\|(\d{14})\|([01])(\d{3})(\d{4})\|(\d{4})(\d{4})\|([0-9A-F]{4})([0-9A-F]{4})\|([01\-]\d{3})\|(\d{1,4}\.\d{1,12})\|(\d{4})\|([0-9A-F]{4})\r\n$/,
  avl08: /^\$\$([0-9A-F]{2})(\d{15})\|([0-9A]{2})(\$GPRMC\,(\d{6}\.\d{3})\,([AV])\,(\d{4}\.\d{4}\,[NS])\,(\d{5}\.\d{4}\,[WE])\,(\d{1,3}\.\d{1,3})?\,(\d{1,3}\.\d{1,3})?\,(\d{6})\,((\d{1,3}\.\d{1,3})?\,([WE])?)\,?([ADENS])?\*([0-9A-F]{2})|[0]{60})\|(\d{2}\.\d{1})\|(\d{2}\.\d{1})\|(\d{2}\.\d{1})\|([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])\|(\d{14})\|([01])(\d{3})(\d{4})\|(\d{4})(\d{4})\|([0-9A-F]{4})([0-9A-F]{4})\|([01\-]\d{3})\|(\d{1,4}\.\d{1,12})\|(\d{4})\|(\d{10})\|([0-9A-F]{4})\r\n$/,
  avl201: /^\$\$([0-9A-F]{2})(\d{15})\|([0-9A]{2})(\$GPRMC\,(\d{6}\.\d{3})\,([AV])\,(\d{4}\.\d{4}\,[NS])\,(\d{5}\.\d{4}\,[WE])\,(\d{1,3}\.\d{1,3})?\,(\d{1,3}\.\d{1,3})?\,(\d{6})\,((\d{1,3}\.\d{1,3})?\,([WE])?)\,?([ADENS])?\*([0-9A-F]{2})|[0]{60})\|(\d{2}\.\d{1})\|(\d{2}\.\d{1})\|(\d{2}\.\d{1})\|([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])\|(\d{14})\|([01])(\d{3})(\d{4})\|([0-9A-F]{4})([0-9A-F]{4})\|([01\-]\d{3})\|(\d{1,4}\.\d{1,12})\|(\d{4})\|([0-9A-F]{4})\r\n$/,
  receiveOk: /^Receive:'\d{3}'OK\r\n\*(\d{6})\,(\d{3})(\S*)?#$/,
  receiveErr: /^Receive:Set Err\r\n(\S*)/,
  picture: /^(\$U\d{15}\d{5}\d{3}\d{3}[0-9a-fA-F]{1,200}#)+(Receive:'210'OK\r\n\*\d{6}\,210#)?$/
};

const getAlarm = (alarm) => {
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
    '88': {type: 'Heartbeat'},
    '91': {type: 'Sleep', status: true},
    '92': {type: 'Sleep', status: false},
    'AA': {type: 'Gps'}
  };
  return alarmTypes[alarm];
};

const verifyCrc = (raw, checksum) =>{
  let crcData;
  const idx = raw.lastIndexOf('|');
  if (idx > 0) {
    const data = raw.slice(0, idx + 1);
    crcData = crc.crc16modbus(data);
  }
  return crcData === checksum;
};

const verifyLen = (raw, len) => {
  return raw.replace('\r\n', '').length === len;
};

const isValid = (raw, len, checksum) =>{
  return verifyCrc(raw, checksum) && verifyLen(raw, len);
};

const getAvl05 = (data) => {
  const match = patterns.avl05.exec(data.toString());
  return {
    raw: match[0],
    type: 'TZ-AVL05',
    imei: parseInt(match[2], 10),
    alarmType: getAlarm(match[3]),
    gprmcData: nmea.parse(match[4]),
    pdop: parseFloat(match[17]),
    hdop: parseFloat(match[18]),
    vdop: parseFloat(match[19]),
    status: {
      raw: match.slice(20, 32).join(''),
      sos: match[20] === '1',
      input: {
        '5': match[21] === '1',
        '1': match[24] === '1',
        '2': match[25] === '1',
        '3': match[26] === '1',
        '4': match[27] === '1'
      },
      output: {
        '1': match[28] === '1',
        '2': match[29] === '1'
      },
      charge: match[33] === '1'
    },
    datetime: moment(`${match[32]}0000`, 'YYYYMMDDHHmmssZZ').toDate(),
    voltage: {
      battery: parseInt(match[34], 10) / 100,
      inputCharge: parseInt(match[35], 10) / 100,
      ada: parseInt(match[36], 10) / 100,
      adb: parseInt(match[37], 10) / 100
    },
    lac: parseInt(match[38], 16),
    cid: parseInt(match[39], 16),
    temperature: parseFloat(match[40]) / 10,
    odometer: parseFloat(match[41]),
    serialId: parseInt(match[42]),
    valid: isValid(match[0], parseInt(match[1], 16), parseInt(match[43], 16))
  };
};

const getAvl08 = (data) => {
  const match = patterns.avl05.exec(data.toString());
  return {
    raw: match[0],
    type: 'TZ-AVL08',
    imei: parseInt(match[2], 10),
    alarmType: getAlarm(match[3]),
    gprmcData: nmea.parse(match[4]),
    pdop: parseFloat(match[17]),
    hdop: parseFloat(match[18]),
    vdop: parseFloat(match[19]),
    status: {
      raw: match.slice(20, 32).join(''),
      sos: match[20] === '1',
      input: {
        '5': match[21] === '1',
        '1': match[24] === '1',
        '2': match[25] === '1',
        '3': match[26] === '1',
        '4': match[27] === '1'
      },
      output: {
        '1': match[28] === '1',
        '2': match[29] === '1',
        '3': match[30] === '1',
        '4': match[31] === '1'
      },
      charge: match[33] === '1'
    },
    datetime: moment(`${match[32]}0000`, 'YYYYMMDDHHmmssZZ').toDate(),
    voltage: {
      battery: parseInt(match[34], 10) / 100,
      inputCharge: parseInt(match[35], 10) / 100,
      ada: parseInt(match[36], 10) / 100,
      adb: parseInt(match[37], 10) / 100
    },
    lac: parseInt(match[38], 16),
    cid: parseInt(match[39], 16),
    temperature: parseFloat(match[40]) / 10,
    odometer: parseFloat(match[41]),
    serialId: parseInt(match[42]),
    rfidNumber: parseInt(match[43]),
    valid: isValid(match[0], parseInt(match[1], 16), parseInt(match[44], 16))
  };
};

const getAvl201 = (data) => {
  const match = patterns.avl05.exec(data.toString());
  return {
    raw: match[0],
    type: 'TZ-AVL201',
    imei: parseInt(match[2], 10),
    alarmType: getAlarm(match[3]),
    gprmcData: nmea.parse(match[4]),
    pdop: parseFloat(match[17]),
    hdop: parseFloat(match[18]),
    vdop: parseFloat(match[19]),
    status: {
      raw: match.slice(20, 32).join(''),
      input: {
        '3': match[20] === '1',
        '1': match[22] === '1',
        '2': match[23] === '1'
      },
      output: {
        '1': match[30] === '1'
      },
      charge: match[33] === '1'
    },
    datetime: moment(`${match[32]}0000`, 'YYYYMMDDHHmmssZZ').toDate(),
    voltage: {
      battery: parseInt(match[34], 10) / 100,
      inputCharge: parseInt(match[35], 10) / 100
    },
    lac: parseInt(match[36], 16),
    cid: parseInt(match[37], 16),
    temperature: parseFloat(match[38]) / 10,
    odometer: parseFloat(match[39]),
    serialId: parseInt(match[40]),
    valid: isValid(match[0], parseInt(match[1], 16), parseInt(match[41], 16))
  };
};

const getCommand = (data) => {
  const match = patterns.receiveOk.exec(data.toString());
  const code = match[2];
  const extra = match[3] ? match[3].substr(1).split(',') : null;
  let message = {type: 'TZ-COMMAND'};
  if (code === '025') {
    const ports = {'1': 'A', '2': 'B', '3': 'C', '4': 'D'};
    let [x, y] = extra;
    message.command = 'set_digital_output';
    message.status = y === '1';
    message.port = ports[x];
  } else if (code === '500') {
    message.command = 'clear_mem';
  } else if (code === '005') {
    let [s, x, y, z] = extra;
    message.command = 'set_speed';
    message.status = s === '1';
    message.speed = parseInt(x, 10);
    message.times = parseInt(y, 10);
    message.interval = parseInt(z, 10);
  } else if (code === '018') {
    message.command = 'set_interval_gprs';
  } else if (code === '016') {
    let [x] = extra;
    message.command = 'set_gprs';
    message.status = x === '1';
  } else if (code === '003') {
    let [x, f, call, sms] = extra;
    if ((x === '0') && (f === '1')) {
      message.command = 'set_sos_number';
      message.call = call;
      message.sms = sms;
    } else {
      message.command = 'setoff_sos_number';
    }
  } else if (code === '210') {
    message.command = 'take_picture';
  } else if (code === '601') {
    let [x] = extra;
    message.command = 'set_memory';
    message.status = x === '1';
  }
  return message;
};

const getPicture = (data) => {
  const results = data.toString().match(/\$U\d{15}\d{5}\d{3}\d{3}[0-9a-fA-F]{1,200}#/g).map(x => {
    const match = /\$U\d{15}\d{5}\d{3}\d{3}[0-9a-fA-F]{1,200}#/.exec(x);
    return {
      imei: match[1],
      number: match[2],
      total: match[3],
      sequence: match[4],
      data: match[5]
    };
  });
  const finish = /Receive:'210'OK\r\n\*\d{6}\,210#?/.test(data.toString());
  return {type: 'TZ-IMAGE', finish: finish, data: results};
};

const getCommandError = (data) => {
  const match = patterns.receiveErr.exec(data.toString());
  return {type: 'TZ-ERROR', command: match[0]};
};

const parse = (data) => {
  let message;
  if (patterns.avl05.test(data.toString())) {
    message = getAvl05(data);
  } else if (patterns.avl08.test(data.toString())) {
    message = getAvl08(data);
  } else if (patterns.avl201.test(data.toString())) {
    message = getAvl201(data);
  } else if (patterns.receiveOk.test(data.toString())) {
    message = getCommand(data);
  } else if (patterns.picture.test(data.toString())) {
    message = getPicture(data);
  } else if (patterns.receiveErr.test(data.toString())) {
    message = getCommandError(data);
  }
  return message;
};

module.exports = {
  parse: parse,
  patterns: patterns,
  getAvl05: getAvl05,
  getAvl08: getAvl08,
  getAvl201: getAvl201,
  getCommand: getCommand,
  getPicture: getPicture,
  getCommandError: getCommandError
};
