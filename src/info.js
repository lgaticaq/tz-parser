'use strict';

const dateParse = require('date-fns/parse');
const patterns = require('./patterns');

module.exports = data => {
  const match = patterns.info.exec(data.toString());
  return {
    manufacturer: 'tz',
    device: 'tz',
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
    datetime: dateParse(
      match[10].replace(
        /(\d{2})\/(\d{2})\/(\d{2}) (\d{2}:\d{2}:\d{2})/,
        '20$3-$2-$1T$4+00:00'))
  };
};
