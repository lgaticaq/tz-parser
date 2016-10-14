'use strict';

const patterns = require('./patterns');

module.exports = data => {
  const match = patterns.map.exec(data.toString());
  return {
    manufacturer: 'tz',
    device: 'tz',
    type: 'map_link',
    url: match[0],
    latitude: parseFloat(match[1]),
    longitude: parseFloat(match[2])
  };
};
