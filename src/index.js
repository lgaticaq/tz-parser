'use strict';

import crc from 'crc';
import moment from 'moment';
import nmea from 'node-nmea';

const patterns = {
  avl05: /^\$\$([0-9A-F]{2})(\d{15})\|([0-9A]{2})(\$GPRMC\,(\d{6}\.\d{3})\,([AV])\,(\d{4}\.\d{4}\,[NS])\,(\d{5}\.\d{4}\,[WE])\,(\d{1,3}\.\d{1,3})?\,(\d{1,3}\.\d{1,3})?\,(\d{6})\,((\d{1,3}\.\d{1,3})?\,([WE])?)\,?([ADENS])?\*([0-9A-F]{2})|[0]{60})\|(\d{2}\.\d{1})\|(\d{2}\.\d{1})\|(\d{2}\.\d{1})\|([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])\|(\d{14})\|([01])(\d{3})(\d{4})\|(\d{4})(\d{4})\|([0-9A-F]{4})([0-9A-F]{4})\|([01\-]\d{3})\|(\d{1,4}\.\d{1,12})\|(\d{4})\|([0-9A-F]{4})\r\n$/,
  avl08: /^\$\$([0-9A-F]{2})(\d{15})\|([0-9A]{2})(\$GPRMC\,(\d{6}\.\d{3})\,([AV])\,(\d{4}\.\d{4}\,[NS])\,(\d{5}\.\d{4}\,[WE])\,(\d{1,3}\.\d{1,3})?\,(\d{1,3}\.\d{1,3})?\,(\d{6})\,((\d{1,3}\.\d{1,3})?\,([WE])?)\,?([ADENS])?\*([0-9A-F]{2})|[0]{60})\|(\d{2}\.\d{1})\|(\d{2}\.\d{1})\|(\d{2}\.\d{1})\|([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])\|(\d{14})\|([01])(\d{3})(\d{4})\|(\d{4})(\d{4})\|([0-9A-F]{4})([0-9A-F]{4})\|([01\-]\d{3})\|(\d{1,4}\.\d{1,12})\|(\d{4})\|(\d{10})?\|([0-9A-F]{4})\r\n$/,
  avl201: /^\$\$([0-9A-F]{2})(\d{15})\|([0-9A]{2})(\$GPRMC\,(\d{6}\.\d{3})\,([AV])\,(\d{4}\.\d{4}\,[NS])\,(\d{5}\.\d{4}\,[WE])\,(\d{1,3}\.\d{1,3})?\,(\d{1,3}\.\d{1,3})?\,(\d{6})\,((\d{1,3}\.\d{1,3})?\,([WE])?)\,?([ADENS])?\*([0-9A-F]{2})|[0]{60})\|(\d{2}\.\d{1})\|(\d{2}\.\d{1})\|(\d{2}\.\d{1})\|([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])([01])\|(\d{14})\|([01])(\d{3})(\d{4})\|([0-9A-F]{4})([0-9A-F]{4})\|([01\-]\d{3})\|(\d{1,4}\.\d{1,12})\|(\d{4})\|([0-9A-F]{4})\r\n$/,
  receiveOk: /^Receive:'\d{3}'OK\r\n\*(\d{6})\,(\d{3})(\S*)?#$/,
  receiveErr: /^Receive:Set Err\r\n(\S*)/,
  picture: /^(\$U\d{15}\d{5}\d{3}\d{3}[0-9a-fA-F]{1,200}#)+(Receive:'210'OK\r\n\*\d{6}\,210#)?$/,
  firmware: /^IMEI:(\d{15})\r\nVER:(\S*)\r\nGSMVER:(\S*)\r\n$/,
  info: /^Lat:([+-]?\d{4}\.\d{4}[NS])\r\nLong:([+-]?\d{5}\.\d{4}[WE])\r\nSpd:(\d{3})km\/h\r\nFix:([AV])\r\nSat:(\d{2})\r\nHDOP:(\d{2}\.\d{1})\r\nGSM:(\d{2})\r\nBatt:(\d{2}\.\d{2})V\r\nMile:(\d{1,4}\.\d{1,12})\r\nTime:(\d{2}\/\d{2}\/\d{2}\ \d{2}:\d{2}:\d{2})\r\n$/,
  map: /^http:\/\/maps.google.com\/maps\?f=q&hl=en&q=(-?\d+\.\d+),(-?\d+\.\d+)&ie=UTF8&z=16&iwloc=addr&om=1$/
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
    '66': {type: 'Rfid'},
    '77': {type: 'Angle'},
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

const getAvl05 = (raw) => {
  const match = patterns.avl05.exec(raw.toString());
  const gprmcData = nmea.parse(match[4]);
  const data = {
    raw: match[0],
    device: 'TZ-AVL05',
    type: 'data',
    imei: match[2],
    alarm: getAlarm(match[3]),
    loc: gprmcData.loc ? gprmcData.loc.geojson : null,
    speed: gprmcData.speed ? gprmcData.speed.kmh : null,
    gpsStatus: gprmcData.gps,
    track: gprmcData.track,
    magneticVariation: gprmcData.magneticVariation,
    gpsMode: gprmcData.mode,
    pdop: parseFloat(match[17]),
    hdop: parseFloat(match[18]),
    vdop: parseFloat(match[19]),
    status: {
      raw: match.slice(20, 32).join(''),
      sos: match[20] === '1',
      input: {
        '1': match[24] === '1',
        '2': match[25] === '1',
        '3': match[26] === '1',
        '4': match[27] === '1',
        '5': match[21] === '1'
      },
      output: {
        '1': match[28] === '1',
        '2': match[29] === '1'
      },
      charge: match[33] === '1'
    },
    datetime: moment(`${match[32]}+00:00`, 'YYYYMMDDHHmmssZZ').toDate(),
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
  return data;
};

const getAvl08 = (raw) => {
  const match = patterns.avl08.exec(raw.toString());
  const gprmcData = nmea.parse(match[4]);
  const data = {
    raw: match[0],
    device: 'TZ-AVL08',
    type: 'data',
    imei: match[2],
    alarm: getAlarm(match[3]),
    loc: gprmcData.loc ? gprmcData.loc.geojson : null,
    speed: gprmcData.speed ? gprmcData.speed.kmh : null,
    gpsStatus: gprmcData.gps,
    track: gprmcData.track,
    magneticVariation: gprmcData.magneticVariation,
    gpsMode: gprmcData.mode,
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
    datetime: moment(`${match[32]}+00:00`, 'YYYYMMDDHHmmssZZ').toDate(),
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
    rfidNumber: match[43] ? parseInt(match[43]) : null,
    valid: isValid(match[0], parseInt(match[1], 16), parseInt(match[44], 16))
  };
  return data;
};

const getAvl201 = (raw) => {
  const match = patterns.avl201.exec(raw.toString());
  const gprmcData = nmea.parse(match[4]);
  const data = {
    raw: match[0],
    device: 'TZ-AVL201',
    type: 'data',
    imei: match[2],
    alarm: getAlarm(match[3]),
    loc: gprmcData.loc ? gprmcData.loc.geojson : null,
    speed: gprmcData.speed ? gprmcData.speed.kmh : null,
    gpsStatus: gprmcData.gps,
    track: gprmcData.track,
    magneticVariation: gprmcData.magneticVariation,
    gpsMode: gprmcData.mode,
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
    datetime: moment(`${match[32]}+00:00`, 'YYYYMMDDHHmmssZZ').toDate(),
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
  return data;
};

const getCommand = (raw) => {
  const match = patterns.receiveOk.exec(raw.toString());
  const password = match[1];
  const code = match[2];
  const extra = match[3] ? match[3].substr(1).split(',') : null;
  let data = {device: 'TZ-COMMAND', type: 'command', password: password};
  if (code === '001') {
    data.command = 'SetUserPassword';
    data.newPassword = extra[0];
  } else if (code === '002') {
    let [x, y] = extra;
    data.command = 'SETINTERVALOFSMS';
    data.enable = x !== '0';
    data.interval = x;
    data.limit = y;
  } else if (code === '003') {
    let [x, f, callNumber, smsNumber] = extra;
    data.command = 'SETPHONESMSFORSOS';
    data.enable = ((x === '0') && (f === '1'));
    data.callNumber = callNumber;
    data.smsNumber = smsNumber;
  } else if (code === '004') {
    let [x, y] = extra;
    data.command = 'SETLOWPOWERALARM';
    data.lowPower = parseFloat(x) / 100;
    data.autoShutdown = parseFloat(y) / 100;
  } else if (code === '005') {
    let [s, x, y, z] = extra;
    data.command = 'SETOVERSPEEDALARM';
    data.enable = s === '1';
    data.speed = parseInt(x, 10);
    data.times = parseInt(y, 10);
    data.interval = parseInt(z, 10);
  } else if (code === '006') {
    let [lat1, lon1, lat2, lon2, x, y] = extra; // eslint-disable-line no-unused-vars
    const parseDir = (dir) => {
      if (/^-/.test(dir)) {
        if (dir.length === 4) {
          return `${dir.substr(1)},S`;
        } else {
          return `${dir.substr(1)},W`;
        }
      } else {
        if (dir.length === 4) {
          return `${dir.substr(1)},N`;
        } else {
          return `${dir.substr(1)},E`;
        }
      }
    };
    data.command = 'SETGEOFENCEALARM';
    if (y === '0') {
      data.enable = false;
    } else {
      data.enable = true;
      data.mode = y === '1' ? 'inside' : 'outside';
      data.geojson = {
        type: 'Polygon',
        coordinates: [[
          [nmea.degToDec(parseDir(lon2)), nmea.degToDec(parseDir(lat2))],
          [nmea.degToDec(parseDir(lon2)), nmea.degToDec(parseDir(lat1))],
          [nmea.degToDec(parseDir(lon1)), nmea.degToDec(parseDir(lat1))],
          [nmea.degToDec(parseDir(lon1)), nmea.degToDec(parseDir(lat2))],
          [nmea.degToDec(parseDir(lon2)), nmea.degToDec(parseDir(lat2))]
        ]]
      };
    }
  } else if (code === '008') {
    let [a, b, c, d, e, f, g] = extra[0].split('');
    data.command = 'SETEXTEND';
    data.extend = {
      a: a === '1',
      b: b === '1',
      c: c === '1',
      d: d === '1',
      e: e === '1',
      f: f === '1',
      g: g === '1'
    };
  } else if (code === '009') {
    data.command = 'SETGSMBAUD';
    if (extra[0] === '0') {
      data.band = '900/1800';
    } else if (extra[0] === '1') {
      data.band = '850/1900';
    } else {
      data.band = 'auto';
    }
  } else if (code === '011') {
    let [apn, username, pass] = extra;
    data.command = 'SETAPN';
    data.apn = apn;
    data.username = username;
    data.pass = pass;
  } else if (code === '014') {
    let [x, dns1, dns2] = extra;
    data.command = 'SETDNS';
    data.enable = x === '1';
    data.dns1 = dns1;
    data.dns2 = dns2;
  } else if (code === '015') {
    let [, host, port] = extra;
    data.command = 'SETIPANDPORT';
    data.host = host;
    data.port = parseInt(port, 10);
  } else if (code === '018') {
    let [x, y] = extra;
    data.command = 'SETGPRSINTERVAL';
    data.enable = x !== '0';
    data.interval = parseInt(x, 10);
    data.limit = parseInt(y, 10);
  } else if (code === '016') {
    let [x] = extra;
    data.command = 'SETSYSSWITCH';
    data.enable = x === '1';
  } else if (code === '019') {
    let [x] = extra;
    data.command = 'SETTCPSWITCH';
    data.mode = x === '1' ? 'tcp' : 'udp';
  } else if (code === '021') {
    let [x, y] = extra;
    data.command = 'SETTREMBLESWITCH';
    data.sleep = x === '1';
    data.tremble = y === '1';
  } else if (code === '022') {
    let [x, y] = extra;
    data.command = 'SETSLEEPSWITCH';
    data.closeGps = x === '0';
    data.closeGsm = y === '0';
  } else if (code === '025') {
    const ports = {'A': 1, 'B': 2, 'C': 3, 'D': 4};
    let [x, y] = extra;
    data.command = 'SETIOSWITCH';
    data.enable = y === '1';
    data.port = ports[x];
  } else if (code === '040') {
    let [x] = extra;
    data.command = 'SETHEARTBEATSWITCH';
    data.enable = x === '1';
  } else if (code === '041') {
    let [x] = extra;
    data.command = 'SETHEARTBEATINTERVAL';
    data.enable = x !== '0';
    data.interval = x;
  } else if (code === '042') {
    data.command = 'SETHEARTBEATINIT';
  } else if (code === '044') {
    let [x] = extra;
    data.command = 'SETTREMBLETOSLEEP';
    data.after = parseInt(x, 10);
  } else if (code === '043') {
    let [x] = extra;
    data.command = 'SETTREMBLETOWAKEUP';
    data.after = parseInt(x, 10);
  } else if (code === '110') {
    let [x] = extra;
    data.command = 'SETPARKINGALARM';
    data.enable = x === '1';
  } else if (code === '990') {
    data.command = 'FACTORYRESET';
  } else if (code === '991') {
    data.command = 'RBOOT';
  } else if (code === '113') {
    let [a, b] = extra;
    data.command = 'SETOILSENSER';
    data.empty = parseInt(a, 10) / 100;
    data.full = parseInt(b, 10) / 100;
  } else if (code === '117') {
    let [a, b, c, d] = extra;
    data.command = 'SETSHUTOIL';
    data.speed = parseInt(a, 10);
    data.off = parseInt(b, 10);
    data.restart = parseInt(c, 10);
    data.repeat = parseInt(d, 10);
  } else if (code === '116') {
    let [a] = extra;
    data.command = 'SETSHUTOILSWITCH';
    data.enable = a === '1';
  } else if (code === '103') {
    let [s, number] = extra;
    data.command = 'SETCALLA';
    data.mode = s === '0' ? 'gprs' : 'call';
    data.number = number;
  } else if (code === '118') {
    let [a, b, c, d, e, f, g, h] = extra[0].split('');
    data.command = 'SETEXTEND2';
    data.extend = {
      a: a === '1',
      b: b === '1',
      c: c === '1',
      d: d === '1',
      e: e === '1',
      f: f === '1',
      g: g === '1',
      h: h === '1'
    };
  } else if (code === '122') {
    let [s, pin] = extra;
    data.command = 'SETPIN';
    data.enable = s === '1';
    data.pin = pin;
  } else if (code === '300' || code === '400') {
    let [x, y] = extra;
    data.command = 'SETANGLE';
    if (x === '0') {
      data.enable = false;
    } else if (x === '1') {
      data.enable = true;
    } else if (x === '2') {
      data.enable = true;
      data.port = 4;
    } else if (x === '3') {
      data.enable = true;
      data.port = 3;
    }
    data.angle = parseInt(y, 10);
  } else if (code === '600') {
    let [x, y] = extra;
    data.command = 'SETREBOOT';
    data.enable = x === '1';
    data.interval = parseInt(y, 10);
  } else if (code === '120') {
    let [a, b, c] = extra;
    data.command = 'SETACCALARM';
    data.enable = a === '1';
    data.acceleration = parseInt(b, 10);
    data.deceleration = parseInt(c, 10);
  } else if (code === '121') {
    let [x, y, z] = extra;
    data.command = 'SETROAMING';
    data.enable = x === '1';
    data.interval = parseInt(y, 10);
    data.network = z;
  } else if (code === '123') {
    let [x] = extra;
    data.command = 'SETACKSTATE';
    data.enable = x === '1';
  } else if (code === '130') {
    let [x, y] = extra;
    data.command = 'SETCALLFILTER';
    data.enable = x === '1';
    data.caller = y;
  } else if (code === '119') {
    let [x] = extra;
    data.command = 'SETSENDTYPE';
    data.mode = x === '0' ? 'gprs' : 'sms';
  } else if (code === '200') {
    let [x, y] = extra;
    data.command = 'SETPICTUREINTERVAL';
    data.interval = parseInt(x, 10);
    data.times = parseInt(y, 10);
  } else if (code === '500') {
    data.command = 'CLEARBUF';
  } else if (code === '210') {
    data.command = 'GETPICTURE';
  } else if (code === '601') {
    let [x] = extra;
    data.command = 'SETDATAFLASH';
    data.enable = x === '1';
  } else if (code === '156') {
    let [x, y, z] = extra;
    data.command = 'SETTRACKINGINTERVAL';
    data.enable = x === '1';
    data.intervalOn = parseInt(y, 10);
    data.intervalOff = parseInt(z, 10);
  } else if (code === '151') {
    let [x, y] = extra;
    data.command = 'SETSENDODOMETER';
    data.enable = x === '1';
    data.range = parseInt(y, 10);
  } else if (code === '155') {
    let [x, y] = extra;
    data.command = 'SETIMEI';
    data.enable = x === '1';
    data.newImei = y;
  } else if (code === '404') {
    let [x, y] = extra;
    data.command = 'SETIDLE';
    data.enable = x === '1';
    data.interval = parseInt(y, 10);
  } else if (code === '023') {
    let [x, y] = extra;
    data.command = 'SETINTERVALGPRSSTANDBY';
    data.enable = x === '1';
    data.interval = parseInt(y, 10);
  } else if (code === '201') {
    let [x, y, z] = extra;
    data.command = 'SETIOPICTURE';
    if (x === '0') {
      data.enable = false;
    } else if (x === '1') {
      data.enable = true;
      data.port = 4;
    } else if (x === '2') {
      data.enable = true;
      data.port = 3;
    } else if (x === '3') {
      data.enable = true;
      data.port = 2;
    } else if (x === '4') {
      data.enable = true;
      data.port = 1;
    }
    if (y === '1') {
      data.mode = 'open';
    } else if (y === '2') {
      data.mode = 'close';
    } else {
      data.mode = 'both';
    }
    data.times = parseInt(z, 10);
  } else if (code === '202') {
    let [x] = extra;
    data.command = 'SETPICTUREPACKET';
    data.number = parseInt(x, 10);
  }
  return data;
};

const getPicture = (raw) => {
  const results = raw.toString().match(/\$U\d{15}\d{5}\d{3}\d{3}[0-9a-fA-F]{1,200}#/g).map(x => {
    const match = /\$U(\d{15})(\d{5})(\d{3})(\d{3})([0-9a-fA-F]{1,200})#/.exec(x);
    return {
      imei: match[1],
      number: parseInt(match[2], 10),
      total: parseInt(match[3], 10),
      sequence: parseInt(match[4], 10),
      data: match[5]
    };
  });
  const imei = results[0].imei;
  const number = results[0].number;
  const total = results[0].total;
  const data = results.map(x => {
    return {sequence: x.sequence, data: x.data};
  });
  return {
    device: 'TZ-IMAGE',
    type: 'image',
    imei: imei,
    number: number,
    total: total,
    data: data
  };
};

const getCommandError = (data) => {
  const match = patterns.receiveErr.exec(data.toString());
  return {device: 'TZ-ERROR', type: 'error', command: match[0]};
};

const getCommandFirmware = (data) => {
  const match = patterns.firmware.exec(data.toString());
  return {
    device: 'TZ-FIRMWARE',
    type: 'firmware',
    imei: match[1],
    firmware: match[2],
    gsm: match[3]
  };
};

const getCommandInfo = (data) => {
  const match = patterns.info.exec(data.toString());
  return {
    device: 'TZ-INFO',
    type: 'info',
    latitude: match[1],
    longitude: match[2],
    speed: parseInt(match[3], 10),
    fix: match[4],
    sat: parseInt(match[5], 10),
    hdop: parseFloat(match[6]),
    gsm: parseInt(match[7], 10),
    battery: parseFloat(match[8]),
    odometer: parseFloat(match[9]),
    datetime: moment(`${match[10]} +00:00`, 'DD/MM/YY HH:mm:ss ZZ').toDate()
  };
};

const getCommandMap = (data) => {
  const match = patterns.map.exec(data.toString());
  return {
    device: 'TZ-MAP',
    type: 'map_link',
    url: match[0],
    latitude: parseFloat(match[1]),
    longitude: parseFloat(match[2])
  };
};

const parse = (raw) => {
  let result = {type: 'UNKNOWN', raw: raw.toString()};
  if (patterns.avl05.test(raw.toString())) {
    result = getAvl05(raw);
  } else if (patterns.avl08.test(raw.toString())) {
    result = getAvl08(raw);
  } else if (patterns.avl201.test(raw.toString())) {
    result = getAvl201(raw);
  } else if (patterns.receiveOk.test(raw.toString())) {
    result = getCommand(raw);
  } else if (patterns.picture.test(raw.toString())) {
    result = getPicture(raw);
  } else if (patterns.receiveErr.test(raw.toString())) {
    result = getCommandError(raw);
  } else if (patterns.info.test(raw.toString())) {
    result = getCommandInfo(raw);
  } else if (patterns.firmware.test(raw.toString())) {
    result = getCommandFirmware(raw);
  } else if (patterns.map.test(raw.toString())) {
    result = getCommandMap(raw);
  }
  return result;
};

const isTz = (raw) => {
  let result = false;
  if (patterns.avl05.test(raw.toString())) {
    result = true;
  } else if (patterns.avl08.test(raw.toString())) {
    result = true;
  } else if (patterns.avl201.test(raw.toString())) {
    result = true;
  } else if (patterns.receiveOk.test(raw.toString())) {
    result = true;
  } else if (patterns.picture.test(raw.toString())) {
    result = true;
  } else if (patterns.receiveErr.test(raw.toString())) {
    result = true;
  } else if (patterns.info.test(raw.toString())) {
    result = true;
  } else if (patterns.firmware.test(raw.toString())) {
    result = true;
  } else if (patterns.map.test(raw.toString())) {
    result = true;
  }
  return result;
};

const parseCommand = (data) => {
  let command = '';
  const password = data.password || '000000';
  let state, digit, port, number, speed, interval, times, trigger, a, b, c, d, e, f, g, h;
  if (/^set_password$/.test(data.instruction)) {
    command = `*${password},001,${data.newPassword}#`;
  } else if (/^[1-4]{1}_(on|off)$/.test(data.instruction)) {
    [port, state] = data.instruction.split('_');
    const ports = {'1': 'A', '2': 'B', '3': 'C', '4': 'D'};
    digit = state === 'on' ? 1 : 0;
    command = `*${password},025,${ports[port]},${digit}#`;
  } else if (/^gprs_(on|off)$/.test(data.instruction)) {
    state = data.instruction.split('_')[1];
    digit = state === 'on' ? 1 : 0;
    command = `*${password},016,${digit}#`;
  } else if (data.instruction === 'clear_mem') {
    command = `*${password},500#`;
  } else if (data.instruction === 'set_interval_gprs') {
    times = data.times || 999;
    command = `*${password},018,${data.interval},${times}#`;
  } else if (/^(set|setoff)_sos_number(E)?$/.test(data.instruction)) {
    number = data.number;
    state = data.instruction.split('_')[0];
    digit = state === 'set' ? 1 : 0;
    command = `*${password},003,0,${digit},00569${number},00569${number}#`;
  } else if (/^set_speed_(on|off)(E)?$/.test(data.instruction)) {
    speed = data.speed || 100;
    state = data.instruction.split('_')[2];
    times = data.times || 10;
    interval = data.interval || 60;
    digit = state === 'on' ? 1 : 0;
    command = `*${password},005,${digit},${speed},${times},${interval}#`;
  } else if (data.instruction === 'picture') {
    interval = data.interval || 5;
    times = data.times || 1;
    command = `*${password},200,${interval},${times}#`;
  } else if (data.instruction === 'take_picture') {
    command = `*${password},210#`;
  } else if (data.instruction === 'configure_io_picture') {
    const triggers = {on: 1, off: 2, both: 3};
    trigger = triggers[data.trigger || 'both'];
    number = data.number || 1;
    command = `*${password},201,${data.port},${trigger},${number}#`;
  } else if(data.instruction === 'Custom'){
    command = data.command;
  } else if (/^set_memory_(on|off)$/.test(data.instruction)) {
    state = data.instruction.split('_')[2];
    digit = state === 'on' ? 1 : 0;
    command = `*${password},601,${digit}#`;
  } else if (/^set_tremble$/.test(data.instruction)) {
    command = `*${password},021,${data.sleep ? 1 : 0},${data.tremble ? 1 : 0}#`;
  } else if (/^set_into_sleep$/.test(data.instruction)) {
    command = `*${password},044,${data.time}#`;
  } else if (/^set_wake_up$/.test(data.instruction)) {
    command = `*${password},043,${data.time}#`;
  } else if (/^reboot$/.test(data.instruction)) {
    command = `*${password},991#`;
  } else if (/^set_extend$/.test(data.instruction)) {
    a = data.a ? 1 : 0;
    b = data.b ? 1 : 0;
    c = data.c ? 1 : 0;
    d = data.d ? 1 : 0;
    e = data.e ? 1 : 0;
    f = data.f ? 1 : 0;
    g = data.g ? 1 : 0;
    h = data.h ? 1 : 0;
    command = `*${password},118,${a}${b}${c}${d}${e}${f}${g}${h}#`;
  } else if (/^set_heartbeat_(on|off)$/.test(data.instruction)) {
    state = data.instruction.split('_')[2];
    digit = state === 'on' ? 1 : 0;
    command = `*${password},040,${digit}#`;
  } else if (/^set_interval_heartbeat$/.test(data.instruction)) {
    command = `*${password},041,${data.times}#`;
  } else if (/^set_idling_(on|off)$/.test(data.instruction)) {
    state = data.instruction.split('_')[2];
    digit = state === 'on' ? 1 : 0;
    command = `*${password},404,${digit},${data.times}#`;
  }
  return command;
};

module.exports = {
  parse: parse,
  patterns: patterns,
  getAvl05: getAvl05,
  getAvl08: getAvl08,
  getAvl201: getAvl201,
  getCommand: getCommand,
  getPicture: getPicture,
  getCommandError: getCommandError,
  getCommandFirmware: getCommandFirmware,
  getCommandInfo: getCommandInfo,
  getCommandMap: getCommandMap,
  verifyLen: verifyLen,
  verifyCrc: verifyCrc,
  isTz: isTz,
  parseCommand: parseCommand
};
