'use strict';

const patterns = require('./patterns');

module.exports = data => {
  const match = patterns.receiveErr.exec(data.toString());
  return {manufacturer: 'tz', device: 'tz', type: 'error', command: match[0]};
};
