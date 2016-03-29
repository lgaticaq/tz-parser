'use strict';

import tz from '../lib';
import {expect} from 'chai';

describe('tz-parzer', () => {
  it('should return TZ-AVL05 data parsed', () => {
    const raw = new Buffer('$$B6869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100|995F\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.device).to.eql('TZ-AVL05');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('Gps');
    expect(data.loc.type).to.eql('Point');
    expect(data.loc.coordinates).to.eql([-70.51273333333333, -33.361225]);
    expect(data.speed).to.eql(0);
    expect(data.gpsStatus).to.be.a.true;
    expect(data.track).to.eql('0.00');
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
    expect(data.valid).to.be.true;
  });

  it('should return TZ-AVL08 data parsed', () => {
    const raw = new Buffer('$$B7869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|00000000|32D3A03F|0000|0.6376|0100||56E2\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.device).to.eql('TZ-AVL08');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('Gps');
    expect(data.loc.type).to.eql('Point');
    expect(data.loc.coordinates).to.eql([-70.51273333333333, -33.361225]);
    expect(data.speed).to.eql(0);
    expect(data.gpsStatus).to.be.a.true;
    expect(data.track).to.eql('0.00');
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
    expect(data.status.output[3]).to.be.false;
    expect(data.status.output[4]).to.be.false;
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
    expect(data.rfidNumber).to.be.null;
  });

  it('should return TZ-AVL201 data parsed', () => {
    const raw = new Buffer('$$AD869444005480041|AA$GPRMC,194329.000,A,3321.6735,S,07030.7640,W,0.00,0.00,090216,,,A*6C|02.1|01.3|01.7|000000000000|20160209194326|13981188|32D3A03F|0000|0.6376|0100|5BEB\r\n');
    const data = tz.parse(raw);
    expect(data.raw).to.eql(raw.toString());
    expect(data.device).to.eql('TZ-AVL201');
    expect(data.type).to.eql('data');
    expect(data.imei).to.eql('869444005480041');
    expect(data.alarm.type).to.eql('Gps');
    expect(data.loc.type).to.eql('Point');
    expect(data.loc.coordinates).to.eql([-70.51273333333333, -33.361225]);
    expect(data.speed).to.eql(0);
    expect(data.gpsStatus).to.be.a.true;
    expect(data.track).to.eql('0.00');
    expect(data.magneticVariation).to.be.null;
    expect(data.gpsMode).to.eql('Autonomous');
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
    expect(data.device).to.eql('TZ-INFO');
    expect(data.type).to.eql('info');
    expect(data.latitude).to.eql('-3321.6664S');
    expect(data.longitude).to.eql('-07030.8921W');
    expect(data.speed).to.eql(0);
    expect(data.fix).to.eql('A');
    expect(data.sat).to.eql(4);
    expect(data.hdop).to.eql(2.2);
    expect(data.gsm).to.eql(29);
    expect(data.battery).to.eql(4.01);
    expect(data.odometer).to.eql(0.1527);
    expect(data.datetime).to.eql(new Date('2016-02-19T15:00:17.000Z'));
  });

  it('should return TZ-COMMAND-OK SetUserPassword data parsed', () => {
    const raw = new Buffer('Receive:\'001\'OK\r\n*000000,001,111111#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SetUserPassword');
    expect(data.newPassword).to.eql('111111');
  });

  it('should return TZ-COMMAND-OK SETINTERVALOFSMS data parsed', () => {
    const raw = new Buffer('Receive:\'002\'OK\r\n*000000,002,1,999#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETINTERVALOFSMS');
    expect(data.enable).to.be.true;
    expect(data.interval).to.eql('1');
    expect(data.limit).to.eql('999');
  });

  it('should return TZ-COMMAND-OK SETPHONESMSFORSOS data parsed', () => {
    const raw = new Buffer('Receive:\'003\'OK\r\n*000000,003,0,1,005695487459,005695487459#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETPHONESMSFORSOS');
    expect(data.enable).to.be.true;
    expect(data.callNumber).to.eql('005695487459');
    expect(data.smsNumber).to.eql('005695487459');
  });

  it('should return TZ-COMMAND-OK SETLOWPOWERALARM data parsed', () => {
    const raw = new Buffer('Receive:\'004\'OK\r\n*000000,004,380,350#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETLOWPOWERALARM');
    expect(data.lowPower).to.eql(3.8);
    expect(data.autoShutdown).to.eql(3.5);
  });

  it('should return TZ-COMMAND-OK SETOVERSPEEDALARM data parsed', () => {
    const raw = new Buffer('Receive:\'005\'OK\r\n*000000,005,1,100,10,360#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETOVERSPEEDALARM');
    expect(data.enable).to.be.true;
    expect(data.speed).to.eql(100);
    expect(data.times).to.eql(10);
    expect(data.interval).to.eql(360);
  });

  it('should return TZ-COMMAND-OK SETGEOFENCEALARM data parsed', () => {
    const raw = new Buffer('Receive:\'006\'OK\r\n*000000,006,-3321.6805,-07030.9513,-3321.6095,-07030.8714,1,1#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETGEOFENCEALARM');
    expect(data.enable).to.be.true;
    expect(data.mode).to.eql('inside');
    expect(data.geojson.type).to.eql('Polygon');
    expect(data.geojson.coordinates).to.eql([[
      [-70.51452333333333, -33.36015833333333],
      [-70.51452333333333, -33.36134166666667],
      [-70.515855, -33.36134166666667],
      [-70.515855, -33.36015833333333],
      [-70.51452333333333, -33.36015833333333]
    ]]);
  });

  it('should return TZ-COMMAND-OK SETEXTEND data parsed', () => {
    const raw = new Buffer('Receive:\'008\'OK\r\n*000000,008,1000001#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETEXTEND');
    expect(data.extend).to.eql({a: true, b: false, c: false, d: false, e: false, f: false, g: true});
  });

  it('should return TZ-COMMAND-OK SETGSMBAUD data parsed', () => {
    const raw = new Buffer('Receive:\'009\'OK\r\n*000000,009,2#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETGSMBAUD');
    expect(data.band).to.eql('auto');
  });

  it('should return TZ-COMMAND-OK SETAPN data parsed', () => {
    const raw = new Buffer('Receive:\'011\'OK\r\n*000000,011,imovil.entelpcs.cl,entelpcs,entelpcs#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETAPN');
    expect(data.apn).to.eql('imovil.entelpcs.cl');
    expect(data.username).to.eql('entelpcs');
    expect(data.pass).to.eql('entelpcs');
  });

  it('should return TZ-COMMAND-OK SETDNS data parsed', () => {
    const raw = new Buffer('Receive:\'014\'OK\r\n*000000,014,1,8.8.8.8,8.8.4.4#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETDNS');
    expect(data.enable).to.be.true;
    expect(data.dns1).to.eql('8.8.8.8');
    expect(data.dns2).to.eql('8.8.4.4');
  });

  it('should return TZ-COMMAND-OK SETIPANDPORT data parsed', () => {
    const raw = new Buffer('Receive:\'015\'OK\r\n*000000,015,1,server.com,1331#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETIPANDPORT');
    expect(data.host).to.eql('server.com');
    expect(data.port).to.eql(1331);
  });

  it('should return TZ-COMMAND-OK SETGPRSINTERVAL data parsed', () => {
    const raw = new Buffer('Receive:\'018\'OK\r\n*000000,018,10,999#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETGPRSINTERVAL');
    expect(data.enable).to.be.true;
    expect(data.interval).to.eql(10);
    expect(data.limit).to.eql(999);
  });

  it('should return TZ-COMMAND-OK SETSYSSWITCH data parsed', () => {
    const raw = new Buffer('Receive:\'016\'OK\r\n*000000,016,1#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETSYSSWITCH');
    expect(data.enable).to.be.true;
  });

  it('should return TZ-COMMAND-OK SETTCPSWITCH data parsed', () => {
    const raw = new Buffer('Receive:\'019\'OK\r\n*000000,019,1#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETTCPSWITCH');
    expect(data.mode).to.eql('tcp');
  });

  it('should return TZ-COMMAND-OK SETTREMBLESWITCH data parsed', () => {
    const raw = new Buffer('Receive:\'021\'OK\r\n*000000,021,1,1#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETTREMBLESWITCH');
    expect(data.sleep).to.be.true;
    expect(data.tremble).to.be.true;
  });

  it('should return TZ-COMMAND-OK SETSLEEPSWITCH data parsed', () => {
    const raw = new Buffer('Receive:\'022\'OK\r\n*000000,022,0,0#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETSLEEPSWITCH');
    expect(data.closeGps).to.be.true;
    expect(data.closeGsm).to.be.true;
  });

  it('should return TZ-COMMAND-OK SETIOSWITCH data parsed', () => {
    const raw = new Buffer('Receive:\'025\'OK\r\n*000000,025,A,1#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETIOSWITCH');
    expect(data.enable).to.be.true;
    expect(data.port).to.eql(1);
  });

  it('should return TZ-COMMAND-OK SETHEARTBEATSWITCH data parsed', () => {
    const raw = new Buffer('Receive:\'040\'OK\r\n*000000,040,0#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETHEARTBEATSWITCH');
    expect(data.enable).to.be.false;
  });

  it('should return TZ-COMMAND-OK SETHEARTBEATINTERVAL data parsed', () => {
    const raw = new Buffer('Receive:\'041\'OK\r\n*000000,041,0#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETHEARTBEATINTERVAL');
    expect(data.enable).to.be.false;
  });

  it('should return TZ-COMMAND-OK SETHEARTBEATINIT data parsed', () => {
    const raw = new Buffer('Receive:\'042\'OK\r\n*000000,042#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETHEARTBEATINIT');
  });

  it('should return TZ-COMMAND-OK SETTREMBLETOSLEEP data parsed', () => {
    const raw = new Buffer('Receive:\'044\'OK\r\n*000000,044,30#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETTREMBLETOSLEEP');
    expect(data.after).to.eql(30);
  });

  it('should return TZ-COMMAND-OK SETTREMBLETOWAKEUP data parsed', () => {
    const raw = new Buffer('Receive:\'043\'OK\r\n*000000,043,10#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETTREMBLETOWAKEUP');
    expect(data.after).to.eql(10);
  });

  it('should return TZ-COMMAND-OK SETPARKINGALARM data parsed', () => {
    const raw = new Buffer('Receive:\'110\'OK\r\n*000000,110,0#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETPARKINGALARM');
    expect(data.enable).to.be.false;
  });

  it('should return TZ-COMMAND-OK FACTORYRESET data parsed', () => {
    const raw = new Buffer('Receive:\'990\'OK\r\n*000000,990#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('FACTORYRESET');
  });

  it('should return TZ-COMMAND-OK RBOOT data parsed', () => {
    const raw = new Buffer('Receive:\'991\'OK\r\n*000000,991#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('RBOOT');
  });

  it('should return TZ-COMMAND-OK SETOILSENSER data parsed', () => {
    const raw = new Buffer('Receive:\'113\'OK\r\n*000000,113,100,500#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETOILSENSER');
    expect(data.empty).to.eql(1);
    expect(data.full).to.eql(5);
  });

  it('should return TZ-COMMAND-OK SETSHUTOIL data parsed', () => {
    const raw = new Buffer('Receive:\'117\'OK\r\n*000000,117,60,500,3000,5#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETSHUTOIL');
    expect(data.speed).to.eql(60);
    expect(data.off).to.eql(500);
    expect(data.restart).to.eql(3000);
    expect(data.repeat).to.eql(5);
  });

  it('should return TZ-COMMAND-OK SETSHUTOILSWITCH data parsed', () => {
    const raw = new Buffer('Receive:\'116\'OK\r\n*000000,116,0#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETSHUTOILSWITCH');
    expect(data.enable).to.be.false;
  });

  it('should return TZ-COMMAND-OK SETCALLA data parsed', () => {
    const raw = new Buffer('Receive:\'103\'OK\r\n*000000,103,0,005695487459#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETCALLA');
    expect(data.mode).to.eql('gprs');
    expect(data.number).to.eql('005695487459');
  });

  it('should return TZ-COMMAND-OK SETEXTEND2 data parsed', () => {
    const raw = new Buffer('Receive:\'118\'OK\r\n*000000,118,10000001#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETEXTEND2');
    expect(data.extend).to.eql({a: true, b: false, c: false, d: false, e: false, f: false, g: false, h: true});
  });

  it('should return TZ-COMMAND-OK SETPIN data parsed', () => {
    const raw = new Buffer('Receive:\'122\'OK\r\n*000000,122,0,1234#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETPIN');
    expect(data.enable).to.be.false;
    expect(data.pin).to.eql('1234');
  });

  it('should return TZ-COMMAND-OK SETANGLE data parsed', () => {
    const raw = new Buffer('Receive:\'300\'OK\r\n*000000,300,0,360#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETANGLE');
    expect(data.enable).to.be.false;
    expect(data.angle).to.eql(360);
  });

  it('should return TZ-COMMAND-OK SETANGLE data parsed', () => {
    const raw = new Buffer('Receive:\'400\'OK\r\n*000000,400,0,360#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETANGLE');
    expect(data.enable).to.be.false;
    expect(data.angle).to.eql(360);
  });

  it('should return TZ-COMMAND-OK SETREBOOT data parsed', () => {
    const raw = new Buffer('Receive:\'600\'OK\r\n*000000,600,0,30#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETREBOOT');
    expect(data.enable).to.be.false;
    expect(data.interval).to.eql(30);
  });

  it('should return TZ-COMMAND-OK SETACCALARM data parsed', () => {
    const raw = new Buffer('Receive:\'120\'OK\r\n*000000,120,0,30,30#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETACCALARM');
    expect(data.enable).to.be.false;
    expect(data.acceleration).to.eql(30);
    expect(data.deceleration).to.eql(30);
  });

  it('should return TZ-COMMAND-OK SETROAMING data parsed', () => {
    const raw = new Buffer('Receive:\'121\'OK\r\n*000000,121,0,30,210#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETROAMING');
    expect(data.enable).to.be.false;
    expect(data.interval).to.eql(30);
    expect(data.network).to.eql('210');
  });

  it('should return TZ-COMMAND-OK SETACKSTATE data parsed', () => {
    const raw = new Buffer('Receive:\'123\'OK\r\n*000000,123,0#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETACKSTATE');
    expect(data.enable).to.be.false;
  });

  it('should return TZ-COMMAND-OK SETCALLFILTER data parsed', () => {
    const raw = new Buffer('Receive:\'130\'OK\r\n*000000,130,0,0#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETCALLFILTER');
    expect(data.enable).to.be.false;
    expect(data.caller).to.eql('0');
  });

  it('should return TZ-COMMAND-OK SETSENDTYPE data parsed', () => {
    const raw = new Buffer('Receive:\'119\'OK\r\n*000000,119,0#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETSENDTYPE');
    expect(data.mode).to.eql('gprs');
  });

  it('should return TZ-COMMAND-OK SETPICTUREINTERVAL data parsed', () => {
    const raw = new Buffer('Receive:\'200\'OK\r\n*000000,200,10,999#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETPICTUREINTERVAL');
    expect(data.interval).to.eql(10);
    expect(data.times).to.eql(999);
  });

  it('should return TZ-COMMAND-OK CLEARBUF data parsed', () => {
    const raw = new Buffer('Receive:\'500\'OK\r\n*000000,500#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('CLEARBUF');
  });

  it('should return TZ-COMMAND-OK GETPICTURE data parsed', () => {
    const raw = new Buffer('Receive:\'210\'OK\r\n*000000,210#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('GETPICTURE');
  });

  it('should return TZ-COMMAND-OK SETDATAFLASH data parsed', () => {
    const raw = new Buffer('Receive:\'601\'OK\r\n*000000,601,1#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETDATAFLASH');
    expect(data.enable).to.be.true;
  });

  it('should return TZ-COMMAND-OK SETTRACKINGINTERVAL data parsed', () => {
    const raw = new Buffer('Receive:\'156\'OK\r\n*000000,156,0,30,30#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETTRACKINGINTERVAL');
    expect(data.enable).to.be.false;
    expect(data.intervalOn).to.eql(30);
    expect(data.intervalOff).to.eql(30);
  });

  it('should return TZ-COMMAND-OK SETSENDODOMETER data parsed', () => {
    const raw = new Buffer('Receive:\'151\'OK\r\n*000000,151,0,100#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETSENDODOMETER');
    expect(data.enable).to.be.false;
    expect(data.range).to.eql(100);
  });

  it('should return TZ-COMMAND-OK SETIMEI data parsed', () => {
    const raw = new Buffer('Receive:\'155\'OK\r\n*000000,155,0,000000000000000#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETIMEI');
    expect(data.enable).to.be.false;
    expect(data.newImei).to.eql('000000000000000');
  });

  it('should return TZ-COMMAND-OK SETIDLE data parsed', () => {
    const raw = new Buffer('Receive:\'404\'OK\r\n*000000,404,0,30#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETIDLE');
    expect(data.enable).to.be.false;
    expect(data.interval).to.eql(30);
  });

  it('should return TZ-COMMAND-OK SETINTERVALGPRSSTANDBY data parsed', () => {
    const raw = new Buffer('Receive:\'023\'OK\r\n*000000,023,0,30#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETINTERVALGPRSSTANDBY');
    expect(data.enable).to.be.false;
    expect(data.interval).to.eql(30);
  });

  it('should return TZ-COMMAND-OK SETIOPICTURE data parsed', () => {
    const raw = new Buffer('Receive:\'201\'OK\r\n*000000,201,3,3,5#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETIOPICTURE');
    expect(data.enable).to.be.true;
    expect(data.port).to.eql(2);
    expect(data.mode).to.eql('both');
    expect(data.times).to.eql(5);
  });

  it('should return TZ-COMMAND-OK SETPICTUREPACKET data parsed', () => {
    const raw = new Buffer('Receive:\'202\'OK\r\n*000000,202,6#');
    const data = tz.parse(raw);
    expect(data.password).to.eql('000000');
    expect(data.device).to.eql('TZ-COMMAND-OK');
    expect(data.command).to.eql('SETPICTUREPACKET');
    expect(data.number).to.eql(6);
  });

  it('should return TZ-FIRMWARE data parsed', () => {
    const raw = new Buffer('IMEI:869444005480041\r\nVER:TC_AVL05vSST_JOSE10.12\r\nGSMVER:1116B02SIM840WL_MXIC\r\n');
    const data = tz.parse(raw);
    expect(data.device).to.eql('TZ-FIRMWARE');
    expect(data.type).to.eql('firmware');
    expect(data.imei).to.eql('869444005480041');
    expect(data.firmware).to.eql('TC_AVL05vSST_JOSE10.12');
    expect(data.gsm).to.eql('1116B02SIM840WL_MXIC');
  });

  it('should return TZ-MAP data parsed', () => {
    const raw = new Buffer('http://maps.google.com/maps?f=q&hl=en&q=-33.361106,-070.514868&ie=UTF8&z=16&iwloc=addr&om=1');
    const data = tz.parse(raw);
    expect(data.device).to.eql('TZ-MAP');
    expect(data.type).to.eql('map_link');
    expect(data.url).to.eql('http://maps.google.com/maps?f=q&hl=en&q=-33.361106,-070.514868&ie=UTF8&z=16&iwloc=addr&om=1');
    expect(data.latitude).to.eql(-33.361106);
    expect(data.longitude).to.eql(-70.514868);
  });

  it('should return TZ-ERROR data parsed', () => {
    const raw = new Buffer('Receive:Set Err\r\n*000000,999,9999#');
    const data = tz.parse(raw);
    expect(data.device).to.eql('TZ-ERROR');
    expect(data.type).to.eql('error');
    expect(data.command).to.eql('Receive:Set Err\r\n*000000,999,9999#');
  });

  it('should return TZ-IMAGE data parsed', () => {
    const raw = new Buffer('$U35977203928389100001071001FFD8FFDB008400100B0C0E0C0A100E0D0E1211101318281A181616183123251D283A333D3C3933383740485C4E404457453738506D51575F626768673E4D71797064785C656763011112121815182F1A1A2F634238426363636363636363636363636363#');
    const data = tz.parse(raw);
    expect(data.device).to.eql('TZ-IMAGE');
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

  it('should return raw command gprs on', () => {
    const data = {
      instruction: 'gprs_on'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,016,1#');
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

  it('should return raw command set on speed', () => {
    const data = {
      instruction: 'set_speed_on',
      speed: 120
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,005,1,120,10,60#');
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

  it('should return raw command set sleep and tremble', () => {
    const data = {
      instruction: 'set_tremble',
      sleep: true,
      tremble: true
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,021,1,1#');
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
      a: true
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,118,10000000#');
  });

  it('should return raw command set heartbeat on', () => {
    const data = {
      instruction: 'set_heartbeat_on'
    };
    const raw = tz.parseCommand(data);
    expect(raw).to.eql('*000000,040,1#');
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
});
