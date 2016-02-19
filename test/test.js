'use strict';

import tzParser from '../lib';
import {expect} from 'chai';

describe('tz-parzer', () => {
  describe('valid TZ-AVL05 data with gps', () => {
    const raw = '$$B6869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|995F\r\n';
    let data;

    before((done) => {
      tzParser.parse(raw).then(result => {
        data = result;
        done();
      });
    });

    describe('parse', () => {
      it('should return the raw data parsed', () => {
        expect(data.raw).to.eql(raw);
        expect(data.type).to.eql('TZ-AVL05');
        expect(data.imei).to.eql(869444005480041);
        expect(data.alarmType.type).to.eql('Gps');
        expect(data.gprmcData.raw).to.eql('$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C');
        expect(data.pdop).to.eql(2.1);
        expect(data.hdop).to.eql(1.3);
        expect(data.vdop).to.eql(1.7);
        expect(data.status.raw).to.eql('000000000000');
        expect(data.status.sos).to.be.false;
        expect(data.status.input[1]).to.be.false;
        expect(data.status.input[2]).to.be.false;
        expect(data.status.input[3]).to.be.false;
        expect(data.status.input[4]).to.be.false;
        expect(data.status.input[5]).to.be.false;
        expect(data.status.output[1]).to.be.false;
        expect(data.status.output[2]).to.be.false;
        expect(data.status.charge).to.be.true;
        expect(data.datetime).to.eql(new Date(2016, 1, 9, 19, 43, 26));
        expect(data.voltage.battery).to.eql(3.98);
        expect(data.voltage.inputCharge).to.eql(11.88);
        expect(data.voltage.ada).to.eql(0);
        expect(data.voltage.adb).to.eql(0);
        expect(data.lac).to.eql(13011);
        expect(data.cid).to.eql(41023);
        expect(data.temperature).to.eql(0);
        expect(data.odometer).to.eql(0.6376);
        expect(data.serialId).to.eql(100);
        expect(data.valid).to.be.true;
        expect(data.currentData.isCurrent).to.be.false;
        expect(data.currentData.diff).to.be.a.string;
        expect(data.gps).to.eql('enable');
        expect(data.address).to.a.string;
      });
    });
  });

  describe('valid TZ-AVL08 data with gps', () => {
    const raw = '$$C1869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|0000000000|ABCF\r\n';
    let data;

    before((done) => {
      tzParser.parse(raw).then(result => {
        data = result;
        done();
      }).catch(done);
    });

    describe('parse', () => {
      it('should return the raw data parsed', () => {
        expect(data.raw).to.eql(raw);
        expect(data.type).to.eql('TZ-AVL08');
        expect(data.imei).to.eql(869444005480041);
        expect(data.alarmType.type).to.eql('Gps');
        expect(data.gprmcData.raw).to.eql('$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C');
        expect(data.pdop).to.eql(2.1);
        expect(data.hdop).to.eql(1.3);
        expect(data.vdop).to.eql(1.7);
        expect(data.status.raw).to.eql('000000000000');
        expect(data.status.sos).to.be.false;
        expect(data.status.input[1]).to.be.false;
        expect(data.status.input[2]).to.be.false;
        expect(data.status.input[3]).to.be.false;
        expect(data.status.input[4]).to.be.false;
        expect(data.status.input[5]).to.be.false;
        expect(data.status.output[1]).to.be.false;
        expect(data.status.output[2]).to.be.false;
        expect(data.status.output[3]).to.be.false;
        expect(data.status.output[4]).to.be.false;
        expect(data.status.charge).to.be.true;
        expect(data.datetime).to.eql(new Date(2016, 1, 9, 19, 43, 26));
        expect(data.voltage.battery).to.eql(3.98);
        expect(data.voltage.inputCharge).to.eql(11.88);
        expect(data.voltage.ada).to.eql(0);
        expect(data.voltage.adb).to.eql(0);
        expect(data.lac).to.eql(13011);
        expect(data.cid).to.eql(41023);
        expect(data.temperature).to.eql(0);
        expect(data.odometer).to.eql(0.6376);
        expect(data.serialId).to.eql(100);
        expect(data.valid).to.be.true;
        expect(data.currentData.isCurrent).to.be.false;
        expect(data.currentData.diff).to.be.a.string;
        expect(data.gps).to.eql('enable');
        expect(data.address).to.a.string;
        expect(data.rfidNumber).to.eql(0);
      });
    });
  });

  describe('valid TZ-AVL201 data with gps', () => {
    const raw = '$$AD869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|32D3A03F|0000|0.6376|0100|5BEB\r\n';
    let data;

    before((done) => {
      tzParser.parse(raw).then(result => {
        data = result;
        done();
      });
    });

    describe('parse', () => {
      it('should return the raw data parsed', () => {
        expect(data.raw).to.eql(raw);
        expect(data.type).to.eql('TZ-AVL201');
        expect(data.imei).to.eql(869444005480041);
        expect(data.alarmType.type).to.eql('Gps');
        expect(data.gprmcData.raw).to.eql('$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C');
        expect(data.pdop).to.eql(2.1);
        expect(data.hdop).to.eql(1.3);
        expect(data.vdop).to.eql(1.7);
        expect(data.status.raw).to.eql('000000000000');
        expect(data.status.input[1]).to.be.false;
        expect(data.status.input[2]).to.be.false;
        expect(data.status.input[3]).to.be.false;
        expect(data.status.output[1]).to.be.false;
        expect(data.status.charge).to.be.true;
        expect(data.datetime).to.eql(new Date(2016, 1, 9, 19, 43, 26));
        expect(data.voltage.battery).to.eql(3.98);
        expect(data.voltage.inputCharge).to.eql(11.88);
        expect(data.lac).to.eql(13011);
        expect(data.cid).to.eql(41023);
        expect(data.temperature).to.eql(0);
        expect(data.odometer).to.eql(0.6376);
        expect(data.serialId).to.eql(100);
        expect(data.valid).to.be.true;
        expect(data.currentData.isCurrent).to.be.false;
        expect(data.currentData.diff).to.be.a.string;
        expect(data.gps).to.eql('enable');
        expect(data.address).to.a.string;
      });
    });
  });

  describe('valid TZ-COMMAND data', () => {
    let data;
    const raw = 'Lat:-3321.6664S\r\nLong:-07030.8921W\r\nSpd:000km/h\r\nFix:A\r\nSat:04\r\nHDOP:02.2\r\nGSM:29\r\nBatt:04.01V\r\nMile:0.1527\r\nTime:19/02/16 15:00:17\r\n';
    before((done) => {
      tzParser.parse(raw).then(result => {
        data = result;
        done();
      });
    });
    describe('parse', () => {
      it('should return the raw data parsed', () => {
        expect(data.type).to.eql('TZ-INFO');
        expect(data.command).to.eql('info');
        expect(data.latitude).to.eql('-3321.6664S');
        expect(data.longitude).to.eql('-07030.8921W');
        expect(data.speed).to.eql(0);
        expect(data.fix).to.eql('A');
        expect(data.sat).to.eql(4);
        expect(data.hdop).to.eql(2.2);
        expect(data.gsm).to.eql(29);
        expect(data.battery).to.eql(4.01);
        expect(data.odometer).to.eql(0.1527);
        expect(data.datetime).to.eql(new Date(2016, 1, 19, 15, 0, 17));
      });
    });
  });

  describe('valid TZ-COMMAND data', () => {
    let data;
    const raw = 'Receive:\'001\'OK\r\n*000000,001,111111#';
    before((done) => {
      tzParser.parse(raw).then(result => {
        console.log(result);
        data = result;
        done();
      });
    });

    describe('parse', () => {
      expect(data.password).to.eql('000000');
      expect(data.type).to.eql('TZ-COMMAND');
      expect(data.command).to.eql('set_password');
      expect(data.newPassword).to.eql('111111');
    });
  });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'002\'OK\r\n*000000,002,1,999#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_sms_position');
  //     expect(data.enable).to.be.true;
  //     expect(data.interval).to.eql('1');
  //     expect(data.limit).to.eql('999');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'003\'OK\r\n*000000,003,0,1,005695487459,005695487459#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_sos_number');
  //     expect(data.enable).to.be.true;
  //     expect(data.callNumber).to.eql('005695487459');
  //     expect(data.smsNumber).to.eql('005695487459');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'004\'OK\r\n*000000,004,380,350#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_low_power');
  //     expect(data.lowPower).to.eql(3.8);
  //     expect(data.autoShutdown).to.eql(3.5);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'005\'OK\r\n*000000,005,1,100,10,360#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_speed');
  //     expect(data.enable).to.be.true;
  //     expect(data.speed).to.eql(100);
  //     expect(data.times).to.eql(10);
  //     expect(data.interval).to.eql(360);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'006\'OK\r\n*000000,006,-3321.6805,-07030.9513,-3321.6095,-07030.8714,1,1#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_geo_fence');
  //     expect(data.enable).to.be.true;
  //     expect(data.type).to.eql('inside');
  //     expect(data.geojson.type).to.eql('Polygon');
  //     expect(data.geojson.coordinates).to.eql([[
  //       [-70.5158543586731, -33.36134137449663],
  //       [-70.5158543586731, -33.36015852386533],
  //       [-70.51452398300171, -33.36015852386533],
  //       [-70.51452398300171, -33.36134137449663],
  //       [-70.5158543586731, -33.36134137449663]
  //     ]]);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'008\'OK\r\n*000000,008,0000000#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_speed');
  //     expect(data.extend).to.eql({a: false, b: false, c: false, d: false, e: false, f: false, g: false});
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'009\'OK\r\n*000000,009,2#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_band');
  //     expect(data.band).to.eql('auto');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'011\'OK\r\n*000000,011,imovil.entelpcs.cl,entelpcs,entelpcs#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_apn');
  //     expect(data.apn).to.eql('imovil.entelpcs.cl');
  //     expect(data.username).to.eql('entelpcs');
  //     expect(data.pass).to.eql('entelpcs');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'014\'OK\r\n*000000,014,1,8.8.8.8,8.8.4.4#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_dns');
  //     expect(data.enable).to.be.true;
  //     expect(data.dns1).to.eql('8.8.8.8');
  //     expect(data.dns2).to.eql('8.8.4.4');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'015\'OK\r\n*000000,015,1,server.com,1331#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_server');
  //     expect(data.host).to.eql('server.com');
  //     expect(data.port).to.eql(1331);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'018\'OK\r\n*000000,018,10,999#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_server');
  //     expect(data.enable).to.be.true;
  //     expect(data.interval).to.eql(10);
  //     expect(data.limit).to.eql(999);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'016\'OK\r\n*000000,016,1#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_gprs');
  //     expect(data.enable).to.be.true;
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'019\'OK\r\n*000000,019,1#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_gprs_mode');
  //     expect(data.mode).to.eql('tcp');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'021\'OK\r\n*000000,021,1,1#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_tremble');
  //     expect(data.sleep).to.be.true;
  //     expect(data.tremble).to.be.true;
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'022\'OK\r\n*000000,022,0,0#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_module');
  //     expect(data.closeGps).to.be.true;
  //     expect(data.closeGsm).to.be.true;
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'025\'OK\r\n*000000,025,A,1#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_digital_output');
  //     expect(data.enable).to.be.true;
  //     expect(data.port).to.eql(1);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'040\'OK\r\n*000000,040,0#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_heart_beat');
  //     expect(data.enable).to.be.false;
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'041\'OK\r\n*000000,041,0#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_heart_beat_interval');
  //     expect(data.enable).to.be.false;
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'042\'OK\r\n*000000,042#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_heart_beat_init');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'044\'OK\r\n*000000,044,30#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_sleep_start');
  //     expect(data.after).to.eql(30);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'043\'OK\r\n*000000,043,10#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_wake_up');
  //     expect(data.after).to.eql(10);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'110\'OK\r\n*000000,110,0#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_parking');
  //     expect(data.enable).to.be.false;
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'IMEI:869444005480041\r\nVER:TC_AVL05vSST_JOSE10.12\r\nGSMVER:1116B02SIM840WL_MXIC\r\n';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.type).to.eql('TZ-FIRMWARE');
  //     expect(data.command).to.eql('request_firmware');
  //     expect(data.imei).to.eql(869444005480041);
  //     expect(data.firmware).to.eql('TC_AVL05vSST_JOSE10.12');
  //     expect(data.gsm).to.eql('1116B02SIM840WL_MXIC');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'990\'OK\r\n*000000,990#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('factory_reset');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'991\'OK\r\n*000000,991#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('reboot');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'http://maps.google.com/maps?f=q&hl=en&q=-33.361106,-070.514868&ie=UTF8&z=16&iwloc=addr&om=1';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('map_link');
  //     expect(data.map).to.eql('http://maps.google.com/maps?f=q&hl=en&q=-33.361106,-070.514868&ie=UTF8&z=16&iwloc=addr&om=1');
  //     expect(data.latitude).to.eql(-33.361106);
  //     expect(data.longitude).to.eql(-70.514868);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'113\'OK\r\n*000000,113,100,500#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_oil_sensor');
  //     expect(data.empty).to.eql(1);
  //     expect(data.full).to.eql(5);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'117\'OK\r\n*000000,117,60,500,3000,5#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_outa_data');
  //     expect(data.speed).to.eql(60);
  //     expect(data.off).to.eql(500);
  //     expect(data.restart).to.eql(3000);
  //     expect(data.repeat).to.eql(5);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'116\'OK\r\n*000000,116,0#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_outa');
  //     expect(data.enable).to.be.false;
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'103\'OK\r\n*000000,103,0,005695487459#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_call_a');
  //     expect(data.type).to.eql('gprs');
  //     expect(data.number).to.eql('005695487459');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'118\'OK\r\n*000000,118,00000000#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_extend');
  //     expect(data.extend).to.eql({a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false});
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'122\'OK\r\n*000000,122,0,1234#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_pin');
  //     expect(data.enable).to.be.false;
  //     expect(data.pin).to.eql(1234);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'300\'OK\r\n*000000,300,0,360#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_angle');
  //     expect(data.enable).to.be.false;
  //     expect(data.angle).to.eql(360);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'400\'OK\r\n*000000,400,0,360#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_angle');
  //     expect(data.enable).to.be.false;
  //     expect(data.angle).to.eql(360);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'600\'OK\r\n*000000,600,0,30#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_reboot');
  //     expect(data.enable).to.be.false;
  //     expect(data.interval).to.eql(30);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'120\'OK\r\n*000000,120,0,30,30#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_acceleration');
  //     expect(data.enable).to.be.false;
  //     expect(data.acceleration).to.eql(30);
  //     expect(data.deceleration).to.eql(30);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'121\'OK\r\n*000000,121,0,30,210#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_roaming');
  //     expect(data.enable).to.be.false;
  //     expect(data.interval).to.eql(30);
  //     expect(data.network).to.eql('210');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'123\'OK\r\n*000000,123,0#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_ack');
  //     expect(data.enable).to.be.false;
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'130\'OK\r\n*000000,130,0,0#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_call_filter');
  //     expect(data.enable).to.be.false;
  //     expect(data.caller).to.eql('0');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'119\'OK\r\n*000000,119,0#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_send');
  //     expect(data.type).to.eql('gprs');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'200\'OK\r\n*000000,200,10,999#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_take_picture');
  //     expect(data.interval).to.eql(10);
  //     expect(data.times).to.eql(999);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'500\'OK\r\n*000000,500#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('clear_mem');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'210\'OK\r\n*000000,210#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('take_picture');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'601\'OK\r\n*000000,601,1#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_memory');
  //     expect(data.enable).to.be.true;
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'156\'OK\r\n*000000,156,0,30,30#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_interval_gprs_by_input');
  //     expect(data.enable).to.be.false;
  //     expect(data.intervalOn).to.eql(30);
  //     expect(data.intervalOff).to.eql(30);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'151\'OK\r\n*000000,151,0,100#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_send_odometer');
  //     expect(data.enable).to.be.false;
  //     expect(data.range).to.eql(100);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'155\'OK\r\n*000000,155,0,000000000000000#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_imei');
  //     expect(data.enable).to.be.false;
  //     expect(data.newImei).to.eql(0);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'404\'OK\r\n*000000,404,0,30#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_idle');
  //     expect(data.enable).to.be.false;
  //     expect(data.interval).to.eql(30);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'023\'OK\r\n*000000,023,0,30#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_interval_gprs_standby');
  //     expect(data.enable).to.be.false;
  //     expect(data.interval).to.eql(30);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'201\'OK\r\n*000000,201,3,3,5#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_auto_picture');
  //     expect(data.enable).to.be.true;
  //     expect(data.port).to.eql(2);
  //     expect(data.mode).to.eql('both');
  //     expect(data.times).to.eql(5);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:\'202\'OK\r\n*000000,202,6#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-COMMAND');
  //     expect(data.command).to.eql('set_packet_number_picture');
  //     expect(data.number).to.eql(6);
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = 'Receive:Set Err\r\n*000000,999,9999#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     expect(data.password).to.eql('000000');
  //     expect(data.type).to.eql('TZ-ERROR');
  //     expect(data.command).to.eql('Receive:Set Err\r\n*000000,999,9999#');
  //   });
  // });
  // describe('valid TZ-COMMAND data', () => {
  //   let data;
  //   before((done) => {
  //     const raw = '$U35977203928389100001071001FFD8FFDB008400100B0C0E0C0A100E0D0E1211101318281A181616183123251D283A333D3C3933383740485C4E404457453738506D51575F626768673E4D71797064785C656763011112121815182F1A1A2F634238426363636363636363636363636363#';
  //     tzParser.parse(raw).then(result => {
  //       data = result;
  //       done();
  //     });
  //   });
  //   describe('parse', () => {
  //     console.log('data');
  //     console.log(data);
  //     expect(data.type).to.eql('TZ-IMAGE');
  //     expect(data.data).to.eql([{
  //       imei: 359772039283892,
  //       number: 1,
  //       total: 71,
  //       sequence: 1,
  //       data: 'FFD8FFDB008400100B0C0E0C0A100E0D0E1211101318281A181616183123251D283A333D3C3933383740485C4E404457453738506D51575F626768673E4D71797064785C656763011112121815182F1A1A2F634238426363636363636363636363636363'
  //     }]);
  //   });
  // });
});
