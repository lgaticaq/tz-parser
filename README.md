# tz-parser

[![npm version](https://img.shields.io/npm/v/tz-parser.svg?style=flat-square)](https://www.npmjs.com/package/tz-parser)
[![npm downloads](https://img.shields.io/npm/dm/tz-parser.svg?style=flat-square)](https://www.npmjs.com/package/tz-parser)
[![Build Status](https://img.shields.io/travis/lgaticaq/tz-parser.svg?style=flat-square)](https://travis-ci.org/lgaticaq/tz-parser)
[![Coverage Status](https://img.shields.io/coveralls/lgaticaq/tz-parser/master.svg?style=flat-square)](https://coveralls.io/github/lgaticaq/tz-parser?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/github/lgaticaq/tz-parser.svg?style=flat-square)](https://codeclimate.com/github/lgaticaq/tz-parser)
[![dependency Status](https://img.shields.io/david/lgaticaq/tz-parser.svg?style=flat-square)](https://david-dm.org/lgaticaq/tz-parser#info=dependencies)
[![devDependency Status](https://img.shields.io/david/dev/lgaticaq/tz-parser.svg?style=flat-square)](https://david-dm.org/lgaticaq/tz-parser#info=devDependencies)

> Parse raw data from TZ-AVL devices (AVL-05, AVL-08, AVL-201)

## Installation

```bash
npm i -S tz-parser
```

## Use

[Try on Tonic](https://tonicdev.com/npm/tz-parser)
```js
const tz = require('tz-parser');

const raw = new Buffer('$$B6869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|995F\r\n');
const data = tz.parse(raw);
/*{
  raw: '$$B6869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|995F\r\n',
  device: 'tz',
  model: 'TZ-AVL05',
  type: 'data',
  imei: '869444005480041',
  alarm: {type: 'Gps'},
  loc: {
    type: 'Point',
    coordinates: [-70.51273333333333, -33.361225]
  },
  speed: 0,
  gpsStatus: true,
  track: '0.00',
  magneticVariation: null,
  gpsMode: 'Autonomous',
  pdop: 2.1,
  hdop: 1.3,
  vdop: 1.7,
  status: {
    raw: '000000000000',
    sos: false,
    input: {'1': false, '2': false, '3': false, '4': false, '5': false},
    output: {'1': false, '2': false},
    charge: true
  },
  datetime: 2016-02-09T19:43:26.000Z,
  voltage: {battery: 3.98, inputCharge: 11.88, ada: 0, adb: 0},
  lac: 13011,
  cid: 41023,
  temperature: 0,
  odometer: 0.6376,
  serialId: 100,
  valid: true
}*/
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
