'use strict';

import 'babel-polyfill';

import crc from 'crc';
import moment from 'moment';
import nmea from 'node-nmea';
import redisUrl from 'redis-url';
import nodeGeocoder from 'node-geocoder';
import bscoords from 'bscoords';
import Promise from 'bluebird';

Promise.promisifyAll(bscoords);

let client;

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

const checkCurrentInfoPanel = (datetime) => {
  moment.locale('es');
  const now = moment.utc();
  now.subtract(1, 'minutes');
  return {
    isCurrent: now < moment.utc(datetime),
    diff: moment.duration(now.diff(datetime)).humanize()
  };
};

const getAvl05 = async function(raw, options) {
  const match = patterns.avl05.exec(raw.toString());
  const data = {
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
  data.currentData = checkCurrentInfoPanel(data.datetime);
  data.gps = data.gprmcData.loc ? 'enable' : 'disable';
  try {
    if (!data.gprmcData.loc) {
      const loc = await getLoc(options.mcc, options.mnc, data.lac, data.cid);
      if (!loc) return data;
      data.gprmcData.loc = loc;
      data.gps = 'triangulation';
    }
    const [lng, lat] = data.gprmcData.loc.geojson.coordinates;
    const address = await getAddress(lat, lng);
    data.gprmcData.address = address;
    return data;
  } catch (err) {
    return data;
  }
};

const getAvl08 = async function(raw, options) {
  const match = patterns.avl08.exec(raw.toString());
  const data = {
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
  data.currentData = checkCurrentInfoPanel(data.datetime);
  data.gps = data.gprmcData.loc ? 'enable' : 'disable';
  try {
    if (!data.gprmcData.loc) {
      const loc = await getLoc(options.mcc, options.mnc, data.lac, data.cid);
      if (!loc) return data;
      data.gprmcData.loc = loc;
      data.gps = 'triangulation';
    }
    const [lng, lat] = data.gprmcData.loc.geojson.coordinates;
    const address = await getAddress(lat, lng);
    data.gprmcData.address = address;
    return data;
  } catch (err) {
    return data;
  }
};

const getAvl201 = async function(raw, options) {
  const match = patterns.avl201.exec(raw.toString());
  const data = {
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
  data.currentData = checkCurrentInfoPanel(data.datetime);
  data.gps = data.gprmcData.loc ? 'enable' : 'disable';
  try {
    if (!data.gprmcData.loc) {
      const loc = await getLoc(options.mcc, options.mnc, data.lac, data.cid);
      if (!loc) return data;
      data.gprmcData.loc = loc;
      data.gps = 'triangulation';
    }
    const [lng, lat] = data.gprmcData.loc.geojson.coordinates;
    const address = await getAddress(lat, lng);
    data.gprmcData.address = address;
    return data;
  } catch (err) {
    return data;
  }
};

const getCommand = (raw) => {
  const match = patterns.receiveOk.exec(raw.toString());
  const password = match[1];
  const code = match[2];
  const extra = match[3] ? match[3].substr(1).split(',') : null;
  let data = {type: 'TZ-COMMAND', password: password};
  if (code === '001') {
    data.command = 'set_password';
    data.newPassword = extra;
  } else if (code === '002') {
    let [x, y] = extra;
    data.command = 'set_sms_position';
    data.enable = x !== '0';
    data.interval = x;
    data.limit = y;
  } else if (code === '003') {
    let [x, f, callNumber, smsNumber] = extra;
    data.command = 'set_sos_number';
    data.enable = ((x === '0') && (f === '1'));
    data.callNumber = callNumber;
    data.smsNumber = smsNumber;
  } else if (code === '004') {
    let [x, y] = extra;
    data.command = 'set_low_power';
    data.lowPower = parseFloat(x) / 100;
    data.autoShutdown = parseFloat(y) / 100;
  } else if (code === '005') {
    let [s, x, y, z] = extra;
    data.command = 'set_speed';
    data.enable = s === '1';
    data.speed = parseInt(x, 10);
    data.times = parseInt(y, 10);
    data.interval = parseInt(z, 10);
  } else if (code === '006') {
    let [lat1, lon1, lat2, lon2, x, y] = extra; // eslint-disable-line no-unused-vars
    data.command = 'set_geo_fence';
    if (y === '0') {
      data.enable = false;
    } else {
      data.enable = true;
      data.type = y === '1' ? 'inside' : 'outside';
      data.geojson = {
        type: 'Polygon',
        coordinates: [[
          [nmea.degToDec(lon2), nmea.degToDec(lat2)],
          [nmea.degToDec(lon2), nmea.degToDec(lat1)],
          [nmea.degToDec(lon1), nmea.degToDec(lat1)],
          [nmea.degToDec(lon1), nmea.degToDec(lat2)],
          [nmea.degToDec(lon2), nmea.degToDec(lat2)]
        ]]
      };
    }
  } else if (code === '008') {
    let [a, b, c, d, e, f, g] = extra;
    data.command = 'set_extend';
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
    data.command = 'set_band';
    if (extra === '0') {
      data.band = '900/1800';
    } else if (extra === '1') {
      data.band = '850/1900';
    } else {
      data.band = 'auto';
    }
  } else if (code === '011') {
    let [apn, username, pass] = extra;
    data.command = 'set_apn';
    data.apn = apn;
    data.username = username;
    data.pass = pass;
  } else if (code === '014') {
    let [x, dns1, dns2] = extra;
    data.command = 'set_dns';
    data.enable = x === '1';
    data.dns1 = dns1;
    data.dns2 = dns2;
  } else if (code === '015') {
    let [, host, port] = extra;
    data.command = 'set_server';
    data.host = host;
    data.port = parseInt(port, 10);
  } else if (code === '018') {
    let [x, y] = extra;
    data.command = 'set_interval_gprs';
    data.enable = x !== '0';
    data.interval = parseInt(x, 10);
    data.limit = parseInt(y, 10);
  } else if (code === '016') {
    let [x] = extra;
    data.command = 'set_gprs';
    data.enable = x === '1';
  } else if (code === '019') {
    let [x] = extra;
    data.command = 'set_gprs_mode';
    data.mode = x === '1' ? 'tcp' : 'udp';
  } else if (code === '021') {
    let [x, y] = extra;
    data.command = 'set_tremble';
    data.sleep = x === '1';
    data.tremble = y === '1';
  } else if (code === '022') {
    let [x, y] = extra;
    data.command = 'set_module';
    data.closeGps = x === '0';
    data.closeGsm = y === '0';
  } else if (code === '025') {
    const ports = {'A': 1, 'B': 2, 'C': 3, 'D': 4};
    let [x, y] = extra;
    data.command = 'set_digital_output';
    data.enable = y === '1';
    data.port = ports[x];
  } else if (code === '040') {
    let [x] = extra;
    data.command = 'set_heart_beat';
    data.enable = x === '1';
  } else if (code === '041') {
    let [x] = extra;
    data.command = 'set_heart_beat_interval';
    data.enable = x !== '0';
    data.interval = x;
  } else if (code === '042') {
    data.command = 'set_heart_beat_init';
  } else if (code === '044') {
    let [x] = extra;
    data.command = 'set_sleep_start';
    data.after = parseInt(x, 10);
  } else if (code === '043') {
    let [x] = extra;
    data.command = 'set_wake_up';
    data.after = parseInt(x, 10);
  } else if (code === '110') {
    let [x] = extra;
    data.command = 'set_parking';
    data.enable = x === '1';
  } else if (code === '990') {
    data.command = 'factory_reset';
  } else if (code === '991') {
    data.command = 'reboot';
  } else if (code === '113') {
    let [a, b] = extra;
    data.command = 'set_oil_sensor';
    data.empty = parseInt(a, 10) / 100;
    data.full = parseInt(b, 10) / 100;
  } else if (code === '117') {
    let [a, b, c, d] = extra;
    data.command = 'set_outa_data';
    data.speed = parseInt(a, 10);
    data.off = parseInt(b, 10);
    data.restart = parseInt(c, 10);
    data.repeat = parseInt(d, 10);
  } else if (code === '116') {
    let [a] = extra;
    data.command = 'set_outa';
    data.enable = a === '1';
  } else if (code === '103') {
    let [s, number] = extra;
    data.command = 'set_call_a';
    data.type = s === '0' ? 'gprs' : 'call';
    data.number = number;
  } else if (code === '118') {
    let [a, b, c, d, e, f, g, h] = extra;
    data.command = 'set_extend';
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
    data.command = 'set_pin';
    data.enable = s === '1';
    data.pin = parseInt(pin, 10);
  } else if (code === '300' || code === '400') {
    let [x, y] = extra;
    data.command = 'set_angle';
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
    data.command = 'set_reboot';
    data.enable = x === '1';
    data.interval = parseInt(y, 10);
  } else if (code === '120') {
    let [a, b, c] = extra;
    data.command = 'set_acceleration';
    data.enable = a === '1';
    data.acceleration = parseInt(b, 10);
    data.deceleration = parseInt(c, 10);
  } else if (code === '121') {
    let [x, y, z] = extra;
    data.command = 'set_roaming';
    data.enable = x === '1';
    data.interval = parseInt(y, 10);
    data.network = z;
  } else if (code === '123') {
    let [x] = extra;
    data.command = 'set_ack';
    data.enable = x === '1';
  } else if (code === '130') {
    let [x, y] = extra;
    data.command = 'set_call_filter';
    data.enable = x === '1';
    data.caller = y;
  } else if (code === '119') {
    let [x] = extra;
    data.command = 'set_send';
    data.type = x === '0' ? 'gprs' : 'sms';
  } else if (code === '200') {
    let [x, y] = extra;
    data.command = 'set_take_picture';
    data.interval = parseInt(x, 10);
    data.times = parseInt(y, 10);
  } else if (code === '500') {
    data.command = 'clear_mem';
  } else if (code === '210') {
    data.command = 'take_picture';
  } else if (code === '601') {
    let [x] = extra;
    data.command = 'set_memory';
    data.enable = x === '1';
  } else if (code === '156') {
    let [x, y, z] = extra;
    data.command = 'set_interval_gprs_by_input';
    data.enable = x === '1';
    data.intervalOn = parseInt(y, 10);
    data.intervalOff = parseInt(z, 10);
  } else if (code === '151') {
    let [x, y] = extra;
    data.command = 'set_send_odometer';
    data.enable = x === '1';
    data.range = parseInt(y, 10);
  } else if (code === '155') {
    let [x, y] = extra;
    data.command = 'set_imei';
    data.enable = x === '1';
    data.newImei = parseInt(y, 10);
  } else if (code === '404') {
    let [x, y] = extra;
    data.command = 'set_idle';
    data.enable = x === '1';
    data.interval = parseInt(y, 10);
  } else if (code === '023') {
    let [x, y] = extra;
    data.command = 'set_interval_gprs_standby';
    data.enable = x === '1';
    data.interval = parseInt(y, 10);
  } else if (code === '201') {
    let [x, y, z] = extra;
    data.command = 'set_auto_picture';
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
    data.command = 'set_packet_number_picture';
    data.number = parseInt(x, 10);
  }
  return data;
};

const getPicture = (data) => {
  const results = data.toString().match(/\$U\d{15}\d{5}\d{3}\d{3}[0-9a-fA-F]{1,200}#/g).map(x => {
    const match = /\$U(\d{15})(\d{5})(\d{3})(\d{3})([0-9a-fA-F]{1,200})#/.exec(x);
    console.log(match); // eslint-disable-line
    return {
      imei: parseInt(match[1], 10),
      number: parseInt(match[2], 10),
      total: parseInt(match[3], 10),
      sequence: parseInt(match[4], 10),
      data: match[5]
    };
  });
  return {type: 'TZ-IMAGE', data: results};
};

const getCommandError = (data) => {
  const match = patterns.receiveErr.exec(data.toString());
  return {type: 'TZ-ERROR', command: match[0]};
};

const getCommandFirmware = (data) => {
  const match = patterns.firmware.exec(data.toString());
  return {
    type: 'TZ-FIRMWARE',
    command: 'request_firmware',
    imei: parseInt(match[1], 10),
    firmware: match[2],
    gsm: match[3]
  };
};

const getCommandInfo = (data) => {
  const match = patterns.info.exec(data.toString());
  return {
    type: 'TZ-INFO',
    command: 'info',
    latitude: match[1],
    longitude: match[2],
    speed: parseInt(match[3], 10),
    fix: match[4],
    sat: parseInt(match[5], 10),
    hdop: parseFloat(match[6]),
    gsm: parseInt(match[7], 10),
    battery: parseFloat(match[8]),
    odometer: parseFloat(match[9]),
    datetime: moment(`${match[10]}0000`, 'DD/MM/YY HH:mm:ssZZ').toDate()
  };
};

const getCommandMap = (data) => {
  const match = patterns.map.exec(data.toString());
  return {
    type: 'TZ-MAP',
    command: 'map',
    url: match[0],
    latitude: parseFloat(match[1]),
    longitude: parseFloat(match[2])
  };
};

const setCache = (uri) => {
  try {
    client = redisUrl.connect(uri);
    Promise.promisifyAll(Object.getPrototypeOf(client));
  } catch (err) {
    throw err;
  }
};

const getReverse = async function(lat, lon) {
  const geocoderProvider = 'google';
  const httpAdapter = 'http';
  const geocoder = nodeGeocoder(geocoderProvider, httpAdapter);
  try {
    const res = await geocoder.reverse({lat: lat, lon: lon});
    if (res.length === 0) return null;
    return res[0].formattedAddress.split(',').map(x => x.trim()).slice(0, 2).join(', ');
  } catch (err) {
    return null;
  }
};

const getAddress = async function(lat, lng) {
  try {
    let address;
    if (client) {
      const reply = await client.getAsync(`geocoder:${lat}:${lng}`);
      if (reply) return reply;
      address = await getReverse(lat, lng);
      if (!address) return null;
      client.set(`geocoder:${lat}:${lng}`, address);
    } else {
      address = await getReverse(lat, lng);
    }
    return address;
  } catch (err) {
    return null;
  }
};

const getLoc = async function(mcc, mnc, lac, cellid) {
  try {
    const coords = await bscoords.requestGoogleAsync(mcc, mnc, lac, cellid);
    return {
      dmm: {
        latitude: nmea.latToDmm(coords.lat),
        longitude: nmea.lngToDmm(coords.lon)
      },
      geojson: {
        coordinates: [coords.lon, coords.lat],
        type: 'Point'
      }
    };
  } catch (err) {
    return null;
  }
};

const parse = async function(raw, options = {}) {
  options.mcc = options.mcc || 730;
  options.mnc = options.mnc || 1;
  let result;
  console.log(raw); // eslint-disable-line
  if (patterns.avl05.test(raw.toString())) {
    result = await getAvl05(raw, options);
  } else if (patterns.avl08.test(raw.toString())) {
    result = await getAvl08(raw, options);
  } else if (patterns.avl201.test(raw.toString())) {
    result = await getAvl201(raw, options);
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
  setCache: setCache,
  verifyLen: verifyLen,
  verifyCrc: verifyCrc
};
