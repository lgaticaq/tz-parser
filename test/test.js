'use strict';

const tz = require('../src');
const expect = require('chai').expect;

describe('tz-parzer', () => {
  it('should return UNKNOWN data parsed', () => {
    const raw = new Buffer('+RESP:GTFRI,350302,867844003012625,,12372,10,1,0,0.0,0,820.8,-70.514872,-33.361021,20160811154617,0730,0002,7410,C789,00,0.0,00000:15:30,2788,705,164,0D,00,,,20160811154651,061D$');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.type).to.eql('UNKNOWN');
  });

  it('should return TZ-AVL05 data parsed with invalid checksum', () => {
    const raw = new Buffer('$$B6869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|995A\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.model).to.eql('TZ-AVL05');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('Gps');
    expect(data.loc.type).to.eql('Point');
    expect(data.loc.coordinates).to.eql([-70.51273333333333, -33.361225]);
    expect(data.speed).to.eql(0);
    expect(data.gpsStatus).to.be.a.true;
    expect(data.azimuth).to.eql(0);
    expect(data.magneticVariation).to.be.null;
    expect(data.gpsMode).to.eql('Autonomous');
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
    expect(data.datetime).to.eql(new Date('2016-02-09T19:43:26.000Z'));
    expect(data.voltage.battery).to.eql(3.98);
    expect(data.voltage.inputCharge).to.eql(11.88);
    expect(data.voltage.ada).to.eql(0);
    expect(data.voltage.adb).to.eql(0);
    expect(data.lac).to.eql(13011);
    expect(data.cid).to.eql(41023);
    expect(data.temperature).to.eql(0);
    expect(data.odometer).to.eql(0.6376);
    expect(data.serialId).to.eql(100);
    expect(data.valid).to.be.false;
  });

  it('should return TZ-AVL05 data parsed', () => {
    const raw = new Buffer('$$B6869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|101100001100|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|2FBD\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.model).to.eql('TZ-AVL05');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('Gps');
    expect(data.loc.type).to.eql('Point');
    expect(data.loc.coordinates).to.eql([-70.51273333333333, -33.361225]);
    expect(data.speed).to.eql(0);
    expect(data.gpsStatus).to.be.a.true;
    expect(data.azimuth).to.eql(0);
    expect(data.magneticVariation).to.be.null;
    expect(data.gpsMode).to.eql('Autonomous');
    expect(data.pdop).to.eql(2.1);
    expect(data.hdop).to.eql(1.3);
    expect(data.vdop).to.eql(1.7);
    expect(data.status.raw).to.eql('101100001100');
    expect(data.status.sos).to.be.true;
    expect(data.status.input[1]).to.be.true;
    expect(data.status.input[2]).to.be.true;
    expect(data.status.input[3]).to.be.false;
    expect(data.status.input[4]).to.be.false;
    expect(data.status.input[5]).to.be.false;
    expect(data.status.output[1]).to.be.true;
    expect(data.status.output[2]).to.be.true;
    expect(data.status.charge).to.be.true;
    expect(data.datetime).to.eql(new Date('2016-02-09T19:43:26.000Z'));
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
  });

  it('should return TZ-AVL05 data with empty GPRMC parsed', () => {
    const raw = new Buffer('$$AE869444005480041|AA000000000000000000000000000000000000000000000000000000000000|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|6CCB\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.model).to.eql('TZ-AVL05');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('Gps');
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
    expect(data.datetime).to.eql(new Date('2016-02-09T19:43:26.000Z'));
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
  });

  it('should return TZ-AVL08 data parsed', () => {
    const raw = new Buffer('$$C1869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|010010110011|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|0123456789|7986\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.model).to.eql('TZ-AVL08');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('Gps');
    expect(data.loc.type).to.eql('Point');
    expect(data.loc.coordinates).to.eql([-70.51273333333333, -33.361225]);
    expect(data.speed).to.eql(0);
    expect(data.gpsStatus).to.be.a.true;
    expect(data.azimuth).to.eql(0);
    expect(data.magneticVariation).to.be.null;
    expect(data.gpsMode).to.eql('Autonomous');
    expect(data.pdop).to.eql(2.1);
    expect(data.hdop).to.eql(1.3);
    expect(data.vdop).to.eql(1.7);
    expect(data.status.raw).to.eql('010010110011');
    expect(data.status.sos).to.be.false;
    expect(data.status.input[1]).to.be.true;
    expect(data.status.input[2]).to.be.false;
    expect(data.status.input[3]).to.be.true;
    expect(data.status.input[4]).to.be.true;
    expect(data.status.input[5]).to.be.true;
    expect(data.status.output[1]).to.be.false;
    expect(data.status.output[2]).to.be.false;
    expect(data.status.output[3]).to.be.true;
    expect(data.status.output[4]).to.be.true;
    expect(data.status.charge).to.be.true;
    expect(data.datetime).to.eql(new Date('2016-02-09T19:43:26.000Z'));
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
    expect(data.rfidNumber).to.eql('0123456789');
  });

  it('should return TZ-AVL08 data with empty GPRMC parsed', () => {
    const raw = new Buffer('$$AF869444005480041|AA000000000000000000000000000000000000000000000000000000000000|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100||8195\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.model).to.eql('TZ-AVL08');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('Gps');
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
    expect(data.datetime).to.eql(new Date('2016-02-09T19:43:26.000Z'));
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
  });

  it('should return TZ-AVL201 data parsed', () => {
    const raw = new Buffer('$$AD869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|100100000010|20160209194326|13981188|32D3A03F|0000|0.6376|0100|0232\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.model).to.eql('TZ-AVL201');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('Gps');
    expect(data.loc.type).to.eql('Point');
    expect(data.loc.coordinates).to.eql([-70.51273333333333, -33.361225]);
    expect(data.speed).to.eql(0);
    expect(data.gpsStatus).to.be.a.true;
    expect(data.azimuth).to.eql(0);
    expect(data.magneticVariation).to.be.null;
    expect(data.gpsMode).to.eql('Autonomous');
    expect(data.pdop).to.eql(2.1);
    expect(data.hdop).to.eql(1.3);
    expect(data.vdop).to.eql(1.7);
    expect(data.status.raw).to.eql('100100000010');
    expect(data.status.input[1]).to.be.false;
    expect(data.status.input[2]).to.be.true;
    expect(data.status.input[3]).to.be.true;
    expect(data.status.output[1]).to.be.true;
    expect(data.status.charge).to.be.true;
    expect(data.datetime).to.eql(new Date('2016-02-09T19:43:26.000Z'));
    expect(data.voltage.battery).to.eql(3.98);
    expect(data.voltage.inputCharge).to.eql(11.88);
    expect(data.lac).to.eql(13011);
    expect(data.cid).to.eql(41023);
    expect(data.temperature).to.eql(0);
    expect(data.odometer).to.eql(0.6376);
    expect(data.serialId).to.eql(100);
    expect(data.valid).to.be.true;
  });

  it('should return TZ-AVL201 data with empty GPRMC parsed', () => {
    const raw = new Buffer('$$A5869444005480041|AA000000000000000000000000000000000000000000000000000000000000|02.1|01.3|01.7|000000000000|20160209194326|13981188|32D3A03F|0000|0.6376|0100|A683\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.model).to.eql('TZ-AVL201');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('Gps');
    expect(data.pdop).to.eql(2.1);
    expect(data.hdop).to.eql(1.3);
    expect(data.vdop).to.eql(1.7);
    expect(data.status.raw).to.eql('000000000000');
    expect(data.status.input[1]).to.be.false;
    expect(data.status.input[2]).to.be.false;
    expect(data.status.input[3]).to.be.false;
    expect(data.status.output[1]).to.be.false;
    expect(data.status.charge).to.be.true;
    expect(data.datetime).to.eql(new Date('2016-02-09T19:43:26.000Z'));
    expect(data.voltage.battery).to.eql(3.98);
    expect(data.voltage.inputCharge).to.eql(11.88);
    expect(data.lac).to.eql(13011);
    expect(data.cid).to.eql(41023);
    expect(data.temperature).to.eql(0);
    expect(data.odometer).to.eql(0.6376);
    expect(data.serialId).to.eql(100);
    expect(data.valid).to.be.true;
  });

  it('should return TZ-INFO data parsed', () => {
    const raw = new Buffer('Lat:-3321.6664S\r\nLong:-07030.8921W\r\nSpd:000km/h\r\nFix:A\r\nSat:04\r\nHDOP:02.2\r\nGSM:29\r\nBatt:04.01V\r\nMile:0.1527\r\nTime:19/02/16 15:00:17\r\n');
    const data = tz.parse(raw);

    expect(data.raw).to.be.null;
    expect(data.alarm.type).to.eql('Gps');
    expect(data.alarm.message).to.eql('Gps');
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.model).to.be.null;
    expect(data.type).to.eql('data');
    expect(data.imei).to.be.null;
    expect(data.loc.type).to.eql('Point');
    expect(data.loc.coordinates).to.eql([-70.51486833333334, -33.361106666666664]);
    expect(data.speed).to.eql(0);
    expect(data.gpsStatus).to.be.true;
    expect(data.azimuth).to.be.null;
    expect(data.magneticVariation).to.be.null;
    expect(data.gpsMode).to.be.null;
    expect(data.sat).to.eql(4);
    expect(data.pdop).to.be.null;
    expect(data.hdop).to.eql(2.2);
    expect(data.vdop).to.be.null;
    expect(data.gsm).to.eql(29);
    expect(data.odometer).to.eql(0.1527);
    expect(data.datetime).to.eql(new Date('2016-02-19T15:00:17.000Z'));
    expect(data.status.raw).to.be.null;
    expect(data.status.sos).to.be.null;
    expect(data.status.input).to.be.null;
    expect(data.status.output).to.be.null;
    expect(data.status.charge).to.be.null;
    expect(data.voltage.battery).to.eql(4.01);
    expect(data.voltage.inputCharge).to.be.null;
    expect(data.voltage.ada).to.be.null;
    expect(data.voltage.adb).to.be.null;
    expect(data.lac).to.be.null;
    expect(data.cid).to.be.null;
    expect(data.temperature).to.be.null;
    expect(data.serialId).to.be.null;
    expect(data.valid).to.be.true;
  });

  it('should return TZ-FIRMWARE data parsed', () => {
    const raw = new Buffer('IMEI:869444005480041\r\nVER:TC_AVL05vSST_JOSE10.12\r\nGSMVER:1116B02SIM840WL_MXIC\r\n');
    const data = tz.parse(raw);
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.type).to.eql('firmware');
    expect(data.imei).to.eql('869444005480041');
    expect(data.firmware).to.eql('TC_AVL05vSST_JOSE10.12');
    expect(data.gsm).to.eql('1116B02SIM840WL_MXIC');
  });

  it('should return TZ-MAP data parsed', () => {
    const raw = new Buffer('http://maps.google.com/maps?f=q&hl=en&q=-33.361106,-070.514868&ie=UTF8&z=16&iwloc=addr&om=1');
    const data = tz.parse(raw);
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.type).to.eql('map_link');
    expect(data.url).to.eql('http://maps.google.com/maps?f=q&hl=en&q=-33.361106,-070.514868&ie=UTF8&z=16&iwloc=addr&om=1');
    expect(data.latitude).to.eql(-33.361106);
    expect(data.longitude).to.eql(-70.514868);
  });

  it('should return TZ-ERROR data parsed', () => {
    const raw = new Buffer('Receive:Set Err\r\n*000000,999,9999#');
    const data = tz.parse(raw);
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.type).to.eql('error');
    expect(data.command).to.eql('Receive:Set Err\r\n*000000,999,9999#');
  });

  it('should return TZ-IMAGE data parsed', () => {
    const raw = new Buffer('$U35977203928389100001071001FFD8FFDB008400100B0C0E0C0A100E0D0E1211101318281A181616183123251D283A333D3C3933383740485C4E404457453738506D51575F626768673E4D71797064785C656763011112121815182F1A1A2F634238426363636363636363636363636363#');
    const data = tz.parse(raw);
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.type).to.eql('image');
    expect(data.imei).to.eql('359772039283891');
    expect(data.number).to.eql(1);
    expect(data.total).to.eql(71);
    expect(data.data).to.eql([{
      sequence: 1,
      data: 'FFD8FFDB008400100B0C0E0C0A100E0D0E1211101318281A181616183123251D283A333D3C3933383740485C4E404457453738506D51575F626768673E4D71797064785C656763011112121815182F1A1A2F634238426363636363636363636363636363'
    }]);
  });

  it('should return true for valid tz data', () => {
    const raw = new Buffer('$$B6869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|995F\r\n');
    const data = tz.isTz(raw);
    expect(data).to.be.a.true;
  });

  it('should return true for valid tz data', () => {
    const raw = new Buffer('$$A138,862170013556541,AAA,35,7.092076,79.960473,140412132808,A,10,9,57,275,1,14,5783799,7403612,413|1|F6E0|3933,0000,000B|0009||02D8|0122,*EE\r\n');
    const data = tz.isTz(raw);
    expect(data).to.be.a.false;
  });

  it('should return raw command set password', () => {
    const data = {
      instruction: 'set_password',
      newPassword: 111111
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,001,111111#');
  });

  it('should return raw command di 1 on', () => {
    const data = {
      instruction: '1_on'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,025,A,1#');
  });

  it('should return raw command di 1 off', () => {
    const data = {
      instruction: '1_off'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,025,A,0#');
  });

  it('should return raw command gprs on', () => {
    const data = {
      instruction: 'gprs_on'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,016,1#');
  });

  it('should return raw command gprs off', () => {
    const data = {
      instruction: 'gprs_off'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,016,0#');
  });

  it('should return raw command clear internal memory', () => {
    const data = {
      instruction: 'clear_mem'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,500#');
  });

  it('should return raw command set interval gprs', () => {
    const data = {
      instruction: 'set_interval_gprs',
      interval: 10
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,018,10,999#');
  });

  it('should return raw command set off sos number', () => {
    const data = {
      instruction: 'setoff_sos_numberE',
      number: 92052518
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,003,0,0,0056992052518,0056992052518#');
  });

  it('should return raw command set on sos number', () => {
    const data = {
      instruction: 'set_sos_number',
      number: 92052518
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,003,0,1,0056992052518,0056992052518#');
  });

  it('should return raw command set on speed', () => {
    const data = {
      instruction: 'set_speed_on',
      speed: 120
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,005,1,120,10,60#');
  });

  it('should return raw command set on speed', () => {
    const data = {
      instruction: 'set_speed_on'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,005,1,100,10,60#');
  });

  it('should return raw command set off speed', () => {
    const data = {
      instruction: 'set_speed_off'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,005,0,100,10,60#');
  });

  it('should return raw command set time taking pictures', () => {
    const data = {
      instruction: 'picture'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,200,5,1#');
  });

  it('should return raw command set take picture', () => {
    const data = {
      instruction: 'take_picture'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,210#');
  });

  it('should return raw command set take picture', () => {
    const data = {
      instruction: 'configure_io_picture',
      password: 589756,
      port: 3
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*589756,201,3,3,1#');
  });

  it('should return raw command set memory on', () => {
    const data = {
      instruction: 'set_memory_on'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,601,1#');
  });

  it('should return raw command set memory on', () => {
    const data = {
      instruction: 'set_memory_off'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,601,0#');
  });

  it('should return raw command set sleep and tremble', () => {
    const data = {
      instruction: 'set_tremble',
      sleep: true,
      tremble: true
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,021,1,1#');
  });

  it('should return raw command set sleep and tremble', () => {
    const data = {
      instruction: 'set_tremble',
      sleep: false,
      tremble: false
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,021,0,0#');
  });

  it('should return raw command set into sleep', () => {
    const data = {
      instruction: 'set_into_sleep',
      time: 60
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,044,60#');
  });

  it('should return raw command set wake up', () => {
    const data = {
      instruction: 'set_wake_up',
      time: 60
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,043,60#');
  });

  it('should return raw command reboot', () => {
    const data = {
      instruction: 'reboot'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,991#');
  });

  it('should return raw command extend', () => {
    const data = {
      instruction: 'set_extend',
      a: true,
      b: true,
      c: true,
      d: true,
      e: true,
      f: true,
      g: true,
      h: true
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,118,11111111#');
  });

  it('should return raw command extend', () => {
    const data = {
      instruction: 'set_extend',
      a: false,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
      g: false,
      h: false
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,118,00000000#');
  });

  it('should return raw command set heartbeat on', () => {
    const data = {
      instruction: 'set_heartbeat_on'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,040,1#');
  });

  it('should return raw command set heartbeat off', () => {
    const data = {
      instruction: 'set_heartbeat_off'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,040,0#');
  });

  it('should return raw command set interval heartbeat', () => {
    const data = {
      instruction: 'set_interval_heartbeat',
      times: 3
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,041,3#');
  });

  it('should return raw command set idling alarm', () => {
    const data = {
      instruction: 'set_idling_on',
      times: 300
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,404,1,300#');
  });

  it('should return raw command set off idling alarm', () => {
    const data = {
      instruction: 'set_idling_off',
      times: 300
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,404,0,300#');
  });

  it('should return raw get current position', () => {
    const data = {instruction: 'get_current_position'};
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,000#');
  });

  it('should return raw custom command', () => {
    const data = {
      instruction: 'Custom',
      command: '*000000,991#'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,991#');
  });

  it('should return raw null command', () => {
    const data = {instruction: 'asdf'};
    const raw = tz.parseCommand(data);
    expect(raw).to.be.null;
  });

  it('should return raw command reboot', () => {
    const raw = tz.getRebootCommand();
    expect(raw).to.eql('*000000,991#');
  });

  it('should return raw command reboot with password', () => {
    const raw = tz.getRebootCommand('123456');
    expect(raw).to.eql('*123456,991#');
  });

  it('should return null imei', () => {
    const raw = new Buffer('askdhaskjdhakjdhaksjdhaksjdh');
    const imei = tz.getImei(raw);
    expect(imei).to.be.null;
  });

  it('should return avl05 imei', () => {
    const raw = new Buffer('$$B6869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|995F\r\n');
    const imei = tz.getImei(raw);
    expect(imei).to.eql('869444005480041');
  });

  it('should return avl08 imei', () => {
    const raw = new Buffer('$$B7869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100||56E2\r\n');
    const imei = tz.getImei(raw);
    expect(imei).to.eql('869444005480041');
  });

  it('should return avl201 imei', () => {
    const raw = new Buffer('$$AD869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|32D3A03F|0000|0.6376|0100|5BEB\r\n');
    const imei = tz.getImei(raw);
    expect(imei).to.eql('869444005480041');
  });

  it('should return TZ-AVL05 01 alarm parsed', () => {
    const raw = new Buffer('$$B6869444005480041|01$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|101100001100|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|40C7\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.model).to.eql('TZ-AVL05');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('SOS_Button');
    expect(data.alarm.message).to.eql('Botón SOS presionado');
    expect(data.loc.type).to.eql('Point');
    expect(data.loc.coordinates).to.eql([-70.51273333333333, -33.361225]);
    expect(data.speed).to.eql(0);
    expect(data.gpsStatus).to.be.a.true;
    expect(data.azimuth).to.eql(0);
    expect(data.magneticVariation).to.be.null;
    expect(data.gpsMode).to.eql('Autonomous');
    expect(data.pdop).to.eql(2.1);
    expect(data.hdop).to.eql(1.3);
    expect(data.vdop).to.eql(1.7);
    expect(data.status.raw).to.eql('101100001100');
    expect(data.status.sos).to.be.true;
    expect(data.status.input[1]).to.be.true;
    expect(data.status.input[2]).to.be.true;
    expect(data.status.input[3]).to.be.false;
    expect(data.status.input[4]).to.be.false;
    expect(data.status.input[5]).to.be.false;
    expect(data.status.output[1]).to.be.true;
    expect(data.status.output[2]).to.be.true;
    expect(data.status.charge).to.be.true;
    expect(data.datetime).to.eql(new Date('2016-02-09T19:43:26.000Z'));
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
  });

  it('should return TZ-AVL05 49 alarm parsed', () => {
    const raw = new Buffer('$$B6869444005480041|49$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|101100001100|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|50A5\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.model).to.eql('TZ-AVL05');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('DI');
    expect(data.alarm.number).to.eql(5);
    expect(data.alarm.status).to.be.true;
    expect(data.alarm.message).to.eql('Entrada digital 5 activada');
    expect(data.loc.type).to.eql('Point');
    expect(data.loc.coordinates).to.eql([-70.51273333333333, -33.361225]);
    expect(data.speed).to.eql(0);
    expect(data.gpsStatus).to.be.a.true;
    expect(data.azimuth).to.eql(0);
    expect(data.magneticVariation).to.be.null;
    expect(data.gpsMode).to.eql('Autonomous');
    expect(data.pdop).to.eql(2.1);
    expect(data.hdop).to.eql(1.3);
    expect(data.vdop).to.eql(1.7);
    expect(data.status.raw).to.eql('101100001100');
    expect(data.status.sos).to.be.true;
    expect(data.status.input[1]).to.be.true;
    expect(data.status.input[2]).to.be.true;
    expect(data.status.input[3]).to.be.false;
    expect(data.status.input[4]).to.be.false;
    expect(data.status.input[5]).to.be.false;
    expect(data.status.output[1]).to.be.true;
    expect(data.status.output[2]).to.be.true;
    expect(data.status.charge).to.be.true;
    expect(data.datetime).to.eql(new Date('2016-02-09T19:43:26.000Z'));
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
  });

  it('should return TZ-AVL05 09 alarm parsed', () => {
    const raw = new Buffer('$$B6869444005480041|09$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|101100001100|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|44A7\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.model).to.eql('TZ-AVL05');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('Auto_Shutdown');
    expect(data.alarm.message).to.eql('Dispositivo apagado');
    expect(data.loc.type).to.eql('Point');
    expect(data.loc.coordinates).to.eql([-70.51273333333333, -33.361225]);
    expect(data.speed).to.eql(0);
    expect(data.gpsStatus).to.be.a.true;
    expect(data.azimuth).to.eql(0);
    expect(data.magneticVariation).to.be.null;
    expect(data.gpsMode).to.eql('Autonomous');
    expect(data.pdop).to.eql(2.1);
    expect(data.hdop).to.eql(1.3);
    expect(data.vdop).to.eql(1.7);
    expect(data.status.raw).to.eql('101100001100');
    expect(data.status.sos).to.be.true;
    expect(data.status.input[1]).to.be.true;
    expect(data.status.input[2]).to.be.true;
    expect(data.status.input[3]).to.be.false;
    expect(data.status.input[4]).to.be.false;
    expect(data.status.input[5]).to.be.false;
    expect(data.status.output[1]).to.be.true;
    expect(data.status.output[2]).to.be.true;
    expect(data.status.charge).to.be.true;
    expect(data.datetime).to.eql(new Date('2016-02-09T19:43:26.000Z'));
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
  });

  it('should return TZ-AVL05 10 alarm parsed', () => {
    const raw = new Buffer('$$B6869444005480041|10$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|101100001100|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|E54A\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.model).to.eql('TZ-AVL05');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('Low_Battery');
    expect(data.alarm.message).to.eql('Batería baja');
    expect(data.loc.type).to.eql('Point');
    expect(data.loc.coordinates).to.eql([-70.51273333333333, -33.361225]);
    expect(data.speed).to.eql(0);
    expect(data.gpsStatus).to.be.a.true;
    expect(data.azimuth).to.eql(0);
    expect(data.magneticVariation).to.be.null;
    expect(data.gpsMode).to.eql('Autonomous');
    expect(data.pdop).to.eql(2.1);
    expect(data.hdop).to.eql(1.3);
    expect(data.vdop).to.eql(1.7);
    expect(data.status.raw).to.eql('101100001100');
    expect(data.status.sos).to.be.true;
    expect(data.status.input[1]).to.be.true;
    expect(data.status.input[2]).to.be.true;
    expect(data.status.input[3]).to.be.false;
    expect(data.status.input[4]).to.be.false;
    expect(data.status.input[5]).to.be.false;
    expect(data.status.output[1]).to.be.true;
    expect(data.status.output[2]).to.be.true;
    expect(data.status.charge).to.be.true;
    expect(data.datetime).to.eql(new Date('2016-02-09T19:43:26.000Z'));
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
  });

  it('should return TZ-AVL05 11 alarm parsed', () => {
    const raw = new Buffer('$$B7869444005480041|11$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,62.00,0.00,090216,,,A*58|02.1|01.3|01.7|101100001100|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|F433\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.manufacturer).to.eql('tz');
    expect(data.device).to.eql('tz');
    expect(data.model).to.eql('TZ-AVL05');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('Over_Speed');
    expect(data.alarm.status).to.be.true;
    expect(data.alarm.message).to.eql('Exceso de Velocidad 115 (km/h)');
    expect(data.loc.type).to.eql('Point');
    expect(data.loc.coordinates).to.eql([-70.51273333333333, -33.361225]);
    expect(data.speed).to.eql(114.82400000000001);
    expect(data.gpsStatus).to.be.a.true;
    expect(data.azimuth).to.eql(0);
    expect(data.magneticVariation).to.be.null;
    expect(data.gpsMode).to.eql('Autonomous');
    expect(data.pdop).to.eql(2.1);
    expect(data.hdop).to.eql(1.3);
    expect(data.vdop).to.eql(1.7);
    expect(data.status.raw).to.eql('101100001100');
    expect(data.status.sos).to.be.true;
    expect(data.status.input[1]).to.be.true;
    expect(data.status.input[2]).to.be.true;
    expect(data.status.input[3]).to.be.false;
    expect(data.status.input[4]).to.be.false;
    expect(data.status.input[5]).to.be.false;
    expect(data.status.output[1]).to.be.true;
    expect(data.status.output[2]).to.be.true;
    expect(data.status.charge).to.be.true;
    expect(data.datetime).to.eql(new Date('2016-02-09T19:43:26.000Z'));
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
  });
});
