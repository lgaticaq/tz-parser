'use strict';

import tzParser from '../lib';
import {expect} from 'chai';

describe('tz-parzer', () => {
  describe('valid data with gps', () => {
    const raw = '$$B6869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|995F\r\n';
    let data;

    before((done) => {
      tzParser.parse(raw).then(result => {
        data = result;
        done();
      });
    });

    describe('#this.raw', () => {
      it('should return the same value passed in the constructor', () => {
        expect(data.raw).to.eql(raw);
      });
    });

    describe('#this.type', () => {
      it('should return the type TZ-AVL05', () => {
        expect(data.type).to.eql('TZ-AVL05');
      });
    });

    describe('#this.imei', () => {
      it('should return the imei 869444005480041', () => {
        expect(data.imei).to.eql(869444005480041);
      });
    });

    describe('#this.alarmType.type', () => {
      it('should return the alarmType.type Gps', () => {
        expect(data.alarmType.type).to.eql('Gps');
      });
    });

    describe('#this.gprmcData.raw', () => {
      it('should return the gprmcData.raw $GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C', () => {
        expect(data.gprmcData.raw).to.eql('$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C');
      });
    });

    describe('#this.pdop', () => {
      it('should return the pdop 2.1', () => {
        expect(data.pdop).to.eql(2.1);
      });
    });

    describe('#this.hdop', () => {
      it('should return the hdop 1.3', () => {
        expect(data.hdop).to.eql(1.3);
      });
    });

    describe('#this.vdop', () => {
      it('should return the vdop 1.7', () => {
        expect(data.vdop).to.eql(1.7);
      });
    });

    describe('#this.status.raw', () => {
      it('should return the status.raw 000000000000', () => {
        expect(data.status.raw).to.eql('000000000000');
      });
    });

    describe('#this.status.sos', () => {
      it('should return the status.sos false', () => {
        expect(data.status.sos).to.be.false;
      });
    });

    describe('#this.status.input.1', () => {
      it('should return the status.input.1 false', () => {
        expect(data.status.input[1]).to.be.false;
      });
    });

    describe('#this.status.input.2', () => {
      it('should return the status.input.2 false', () => {
        expect(data.status.input[2]).to.be.false;
      });
    });

    describe('#this.status.input.3', () => {
      it('should return the status.input.3 false', () => {
        expect(data.status.input[3]).to.be.false;
      });
    });

    describe('#this.status.input.4', () => {
      it('should return the status.input.4 false', () => {
        expect(data.status.input[4]).to.be.false;
      });
    });

    describe('#this.status.input.5', () => {
      it('should return the status.input.5 false', () => {
        expect(data.status.input[5]).to.be.false;
      });
    });

    describe('#this.status.charge', () => {
      it('should return the status.charge true', () => {
        expect(data.status.charge).to.be.true;
      });
    });

    describe('#this.datetime', () => {
      it('should return the datetime 2016-02-09T19:43:26', () => {
        expect(data.datetime).to.eql(new Date(2016, 1, 9, 19, 43, 26));
      });
    });

    describe('#this.voltage.battery', () => {
      it('should return the voltage.battery 3.98', () => {
        expect(data.voltage.battery).to.eql(3.98);
      });
    });

    describe('#this.voltage.inputCharge', () => {
      it('should return the voltage.inputCharge 11.88', () => {
        expect(data.voltage.inputCharge).to.eql(11.88);
      });
    });

    describe('#this.voltage.ada', () => {
      it('should return the voltage.ada 0', () => {
        expect(data.voltage.ada).to.eql(0);
      });
    });

    describe('#this.voltage.adb', () => {
      it('should return the voltage.adb 0', () => {
        expect(data.voltage.adb).to.eql(0);
      });
    });

    describe('#this.lac', () => {
      it('should return the lac 13011', () => {
        expect(data.lac).to.eql(13011);
      });
    });

    describe('#this.cid', () => {
      it('should return the cid 41023', () => {
        expect(data.cid).to.eql(41023);
      });
    });

    describe('#this.temperature', () => {
      it('should return the temperature 0', () => {
        expect(data.temperature).to.eql(0);
      });
    });

    describe('#this.odometer', () => {
      it('should return the odometer 0.6376', () => {
        expect(data.odometer).to.eql(0.6376);
      });
    });

    describe('#this.serialId', () => {
      it('should return the serialId 100', () => {
        expect(data.serialId).to.eql(100);
      });
    });

    describe('#this.valid', () => {
      it('should return the valid true', () => {
        expect(data.valid).to.be.true;
      });
    });

    describe('#this.currentData.isCurrent', () => {
      it('should return the currentData.isCurrent false', () => {
        expect(data.currentData.isCurrent).to.be.false;
      });
    });

    describe('#this.currentData.diff', () => {
      it('should return the currentData.diff as string', () => {
        expect(data.currentData.diff).to.be.a.string;
      });
    });

    describe('#this.gps', () => {
      it('should return the gps enable', () => {
        expect(data.gps).to.eql('enable');
      });
    });

    describe('#this.address', () => {
      it('should return the address as string', () => {
        expect(data.address).to.a.string;
      });
    });
  });
});
