# tz-parser

[![npm version](https://img.shields.io/npm/v/tz-parser.svg?style=flat-square)](https://www.npmjs.com/package/tz-parser)
[![npm downloads](https://img.shields.io/npm/dm/tz-parser.svg?style=flat-square)](https://www.npmjs.com/package/tz-parser)
[![Build Status](https://img.shields.io/travis/lgaticaq/tz-parser.svg?style=flat-square)](https://travis-ci.org/lgaticaq/tz-parser)
[![Coverage Status](https://img.shields.io/coveralls/lgaticaq/tz-parser/master.svg?style=flat-square)](https://coveralls.io/github/lgaticaq/tz-parser?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/github/lgaticaq/tz-parser.svg?style=flat-square)](https://codeclimate.com/github/lgaticaq/tz-parser)
[![dependency Status](https://img.shields.io/david/lgaticaq/tz-parser.svg?style=flat-square)](https://david-dm.org/lgaticaq/tz-parser#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/tz-parser.svg?style=flat-square)](https://david-dm.org/lgaticaq/tz-parser#info=devDependencies)
[![Join the chat at https://gitter.im/lgaticaq/tz-parser](https://img.shields.io/badge/gitter-join%20chat%20%E2%86%92-brightgreen.svg?style=flat-square)](https://gitter.im/lgaticaq/tz-parser?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Parse raw data from TZ-AVL devices

## Installation

```bash
npm i -S tz-parser
```

## Use

[Try on Tonic](https://tonicdev.com/npm/tz-parser)
```js
import tz from 'tz-parser'

const raw = new Buffer('$$B6869444005480041|91$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|7B20\r\n');
const data = tz.parse(raw);
/*{
  raw: '$$B6869444005480041|91$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|7B20\r\n',
  device: 'TZ-AVL05',
  type: 'data',
  imei: '869444005480041',
  alarm: { type: 'Sleep', status: true },
  loc: { type: 'Point', coordinates: [ -70.51273333, -33.361225 ] },
  gpsStatus: true,
  speed: 0,
  track: '0.00',
  magneticVariation: null,
  gpsMode: 'Autonomous'
  pdop: 2.1,
  hdop: 1.3,
  vdop: 1.7,
  status: {
    raw: '000000000000',
    sos: false,
    input: { '1': false, '2': false, '3': false, '4': false, '5': false },
    output: { '1': false, '2': false },
    charge: true
  },
  datetime: Tue Feb 09 2016 19:43:26 GMT+0000 (UTC),
  voltage: { battery: 3.98, inputCharge: 11.88, ada: 0, adb: 0 },
  lac: 13011,
  cid: 41023,
  temperature: 0,
  odometer: 0.6376,
  serialId: 100,
  valid: true
}*/
```
