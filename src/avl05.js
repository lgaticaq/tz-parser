'use strict';

const moment = require('moment');
const nmea = require('node-nmea');
const patterns = require('./patterns');
const utils = require('./utils');

module.exports = raw => {
  const match = patterns.avl05.exec(raw.toString());
  const gprmcData = nmea.parse(match[4]);
  const data = {
    raw: match[0],
    device: 'tz',
    model: 'TZ-AVL05',
    type: 'data',
    imei: match[2],
    alarm: utils.getAlarm(match[3]),
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
    serialId: parseInt(match[42], 10),
    valid: utils.isValid(match[0], parseInt(match[1], 16), parseInt(match[43], 16))
  };
  return data;
};
