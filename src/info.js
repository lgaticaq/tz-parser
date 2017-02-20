'use strict';

const dateParse = require('date-fns/parse');
const patterns = require('./patterns');
const {degToDec} = require('node-nmea');

module.exports = data => {
  const match = patterns.info.exec(data.toString());
  const lat = degToDec(match[1].replace(/(\d+)\.(\d+)(\w{1})/, '$1.$2,$3'));
  const lng = degToDec(match[2].replace(/(\d+)\.(\d+)(\w{1})/, '$1.$2,$3'));
  return {
    raw: null,
    manufacturer: 'tz',
    device: 'tz',
    model: null,
    type: 'data',
    imei: null,
    loc: {
      type: 'Point',
      coordinates: [lng, lat]
    },
    speed: parseInt(match[3], 10),
    gpsStatus: match[4] === 'A',
    azimuth: null,
    magneticVariation: null,
    gpsMode: null,
    sat: parseInt(match[5], 10),
    pdop: null,
    hdop: parseFloat(match[6]),
    vdop: null,
    gsm: parseInt(match[7], 10),
    odometer: parseFloat(match[9]),
    datetime: dateParse(
      match[10].replace(
        /(\d{2})\/(\d{2})\/(\d{2}) (\d{2}:\d{2}:\d{2})/,
        '20$3-$2-$1T$4+00:00')),
    status: {
      raw: null,
      sos: null,
      input: null,
      output: null,
      charge: null
    },
    voltage: {
      battery: parseFloat(match[8]),
      inputCharge: null,
      ada: null,
      adb: null
    },
    lac: null,
    cid: null,
    temperature: null,
    serialId: null,
    valid: true
  };
};
