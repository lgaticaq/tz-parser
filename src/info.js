'use strict';

const moment = require('moment');
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
    datetime: moment(`${match[10]} +00:00`, 'DD/MM/YY HH:mm:ss ZZ').toDate()
  };
};
