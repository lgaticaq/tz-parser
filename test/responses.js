'use strict'

const { describe, it } = require('mocha')
const tz = require('../src')
const expect = require('chai').expect

describe('responses', () => {
  it('should return SetUserPassword data parsed', () => {
    const raw = Buffer.from("Receive:'001'OK\r\n*000000,001,111111#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SetUserPassword')
    expect(data.message).to.eql('Cambio de contraseña del dispositivo')
    expect(data.newPassword).to.eql('111111')
  })

  it('should return SETINTERVALOFSMS data parsed', () => {
    const raw = Buffer.from("Receive:'002'OK\r\n*000000,002,1,999#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETINTERVALOFSMS')
    expect(data.message).to.eql('Ajuste de intervalos de sms')
    expect(data.enable).to.eql(true)
    expect(data.interval).to.eql('1')
    expect(data.limit).to.eql('999')
  })

  it('should return SETPHONESMSFORSOS data parsed', () => {
    const raw = Buffer.from(
      "Receive:'003'OK\r\n*000000,003,0,1,005695487459,005695487459#"
    )
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETPHONESMSFORSOS')
    expect(data.message).to.eql('Ajuste de teléfono y sms para SOS')
    expect(data.enable).to.eql(true)
    expect(data.callNumber).to.eql('005695487459')
    expect(data.smsNumber).to.eql('005695487459')
  })

  it('should return SETLOWPOWERALARM data parsed', () => {
    const raw = Buffer.from("Receive:'004'OK\r\n*000000,004,380,350#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETLOWPOWERALARM')
    expect(data.message).to.eql('Ajuste de la alarma de energía baja')
    expect(data.lowPower).to.eql(3.8)
    expect(data.autoShutdown).to.eql(3.5)
  })

  it('should return SETOVERSPEEDALARM data parsed', () => {
    const raw = Buffer.from("Receive:'005'OK\r\n*000000,005,1,100,10,360#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETOVERSPEEDALARM')
    expect(data.message).to.eql('Ajuste de la alarma de exceso de velocidad')
    expect(data.enable).to.eql(true)
    expect(data.speed).to.eql(100)
    expect(data.times).to.eql(10)
    expect(data.interval).to.eql(360)
  })

  it('should return SETGEOFENCEALARM data parsed', () => {
    const raw = Buffer.from(
      "Receive:'006'OK\r\n*000000,006,+3321.6805,+07030.9513,+3321.6095,+07030.8714,1,1#"
    )
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETGEOFENCEALARM')
    expect(data.message).to.eql('Ajuste de la alarma de geocerca')
    expect(data.enable).to.eql(true)
    expect(data.mode).to.eql('inside')
    expect(data.geojson.type).to.eql('Polygon')
    expect(data.geojson.coordinates).to.eql([
      [
        [70.51452333333333, 33.36015833333333],
        [70.51452333333333, 33.36134166666667],
        [70.515855, 33.36134166666667],
        [70.515855, 33.36015833333333],
        [70.51452333333333, 33.36015833333333]
      ]
    ])
  })

  it('should return SETGEOFENCEALARM data parsed', () => {
    const raw = Buffer.from(
      "Receive:'006'OK\r\n*000000,006,-3321.6805,-07030.9513,-3321.6095,-07030.8714,1,2#"
    )
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETGEOFENCEALARM')
    expect(data.message).to.eql('Ajuste de la alarma de geocerca')
    expect(data.enable).to.eql(true)
    expect(data.mode).to.eql('outside')
    expect(data.geojson.type).to.eql('Polygon')
    expect(data.geojson.coordinates).to.eql([
      [
        [-70.51452333333333, -33.36015833333333],
        [-70.51452333333333, -33.36134166666667],
        [-70.515855, -33.36134166666667],
        [-70.515855, -33.36015833333333],
        [-70.51452333333333, -33.36015833333333]
      ]
    ])
  })

  it('should return SETGEOFENCEALARM data parsed', () => {
    const raw = Buffer.from(
      "Receive:'006'OK\r\n*000000,006,-3321.6805,-07030.9513,-3321.6095,-07030.8714,1,0#"
    )
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETGEOFENCEALARM')
    expect(data.message).to.eql('Ajuste de la alarma de geocerca')
    expect(data.enable).to.eql(false)
  })

  it('should return SETEXTEND data parsed', () => {
    const raw = Buffer.from("Receive:'008'OK\r\n*000000,008,1000001#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETEXTEND')
    expect(data.message).to.eql('Ajuste de configuración extendida')
    expect(data.extend).to.eql({
      a: true,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
      g: true
    })
  })

  it('should return SETGSMBAUD data parsed', () => {
    const raw = Buffer.from("Receive:'009'OK\r\n*000000,009,0#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETGSMBAUD')
    expect(data.message).to.eql('Ajuste de banda GSM')
    expect(data.band).to.eql('900/1800')
  })

  it('should return SETGSMBAUD data parsed', () => {
    const raw = Buffer.from("Receive:'009'OK\r\n*000000,009,1#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETGSMBAUD')
    expect(data.message).to.eql('Ajuste de banda GSM')
    expect(data.band).to.eql('850/1900')
  })

  it('should return SETGSMBAUD data parsed', () => {
    const raw = Buffer.from("Receive:'009'OK\r\n*000000,009,2#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETGSMBAUD')
    expect(data.message).to.eql('Ajuste de banda GSM')
    expect(data.band).to.eql('auto')
  })

  it('should return SETAPN data parsed', () => {
    const raw = Buffer.from(
      "Receive:'011'OK\r\n*000000,011,imovil.entelpcs.cl,entelpcs,entelpcs#"
    )
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETAPN')
    expect(data.message).to.eql('Ajuste de APN')
    expect(data.apn).to.eql('imovil.entelpcs.cl')
    expect(data.username).to.eql('entelpcs')
    expect(data.pass).to.eql('entelpcs')
  })

  it('should return SETDNS data parsed', () => {
    const raw = Buffer.from("Receive:'014'OK\r\n*000000,014,1,8.8.8.8,8.8.4.4#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETDNS')
    expect(data.message).to.eql('Ajuste de DNS')
    expect(data.enable).to.eql(true)
    expect(data.dns1).to.eql('8.8.8.8')
    expect(data.dns2).to.eql('8.8.4.4')
  })

  it('should return SETIPANDPORT data parsed', () => {
    const raw = Buffer.from("Receive:'015'OK\r\n*000000,015,1,server.com,1331#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETIPANDPORT')
    expect(data.message).to.eql('Ajuste de ip y puerto del servidor')
    expect(data.host).to.eql('server.com')
    expect(data.port).to.eql(1331)
  })

  it('should return SETGPRSINTERVAL data parsed', () => {
    const raw = Buffer.from("Receive:'018'OK\r\n*000000,018,10,999#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETGPRSINTERVAL')
    expect(data.message).to.eql('Ajuste de intervalo GPRS')
    expect(data.enable).to.eql(true)
    expect(data.interval).to.eql(10)
    expect(data.limit).to.eql(999)
  })

  it('should return SETSYSSWITCH data parsed', () => {
    const raw = Buffer.from("Receive:'016'OK\r\n*000000,016,1#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETSYSSWITCH')
    expect(data.message).to.eql('Ajuste de GPRS')
    expect(data.enable).to.eql(true)
  })

  it('should return SETTCPSWITCH data parsed', () => {
    const raw = Buffer.from("Receive:'019'OK\r\n*000000,019,1#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETTCPSWITCH')
    expect(data.message).to.eql('Ajuste de modo GPRS')
    expect(data.mode).to.eql('tcp')
  })

  it('should return SETTCPSWITCH data parsed', () => {
    const raw = Buffer.from("Receive:'019'OK\r\n*000000,019,0#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETTCPSWITCH')
    expect(data.message).to.eql('Ajuste de modo GPRS')
    expect(data.mode).to.eql('udp')
  })

  it('should return SETTREMBLESWITCH data parsed', () => {
    const raw = Buffer.from("Receive:'021'OK\r\n*000000,021,1,1#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETTREMBLESWITCH')
    expect(data.message).to.eql('Ajuste de sensor de movimiento')
    expect(data.sleep).to.eql(true)
    expect(data.tremble).to.eql(true)
  })

  it('should return SETSLEEPSWITCH data parsed', () => {
    const raw = Buffer.from("Receive:'022'OK\r\n*000000,022,0,0#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETSLEEPSWITCH')
    expect(data.message).to.eql('Ajuste de Sleep')
    expect(data.closeGps).to.eql(true)
    expect(data.closeGsm).to.eql(true)
  })

  it('should return SETIOSWITCH data parsed', () => {
    const raw = Buffer.from("Receive:'025'OK\r\n*000000,025,A,1#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETIOSWITCH')
    expect(data.message).to.eql('Cambio de estado en las salidas digitales')
    expect(data.enable).to.eql(true)
    expect(data.port).to.eql(1)
  })

  it('should return SETIOSWITCH data parsed', () => {
    const raw = Buffer.from("Receive:'025'OK\r\n*000000,025,A,1#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETIOSWITCH')
    expect(data.message).to.eql('Cambio de estado en las salidas digitales')
    expect(data.enable).to.eql(true)
    expect(data.port).to.eql(1)
  })

  it('should return SETHEARTBEATSWITCH data parsed', () => {
    const raw = Buffer.from("Receive:'040'OK\r\n*000000,040,0#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETHEARTBEATSWITCH')
    expect(data.message).to.eql('Ajuste de Heartbeat')
    expect(data.enable).to.eql(false)
  })

  it('should return SETHEARTBEATINTERVAL data parsed', () => {
    const raw = Buffer.from("Receive:'041'OK\r\n*000000,041,0#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETHEARTBEATINTERVAL')
    expect(data.message).to.eql('Ajuste de intervalo de Heartbeat')
    expect(data.enable).to.eql(false)
  })

  it('should return SETHEARTBEATINIT data parsed', () => {
    const raw = Buffer.from("Receive:'042'OK\r\n*000000,042#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETHEARTBEATINIT')
    expect(data.message).to.eql('Ajuste de inicialización de Heartbeat')
  })

  it('should return SETTREMBLETOSLEEP data parsed', () => {
    const raw = Buffer.from("Receive:'044'OK\r\n*000000,044,30#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETTREMBLETOSLEEP')
    expect(data.message).to.eql('Ajuste de activación de modo Sleep')
    expect(data.after).to.eql(30)
  })

  it('should return SETTREMBLETOWAKEUP data parsed', () => {
    const raw = Buffer.from("Receive:'043'OK\r\n*000000,043,10#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETTREMBLETOWAKEUP')
    expect(data.message).to.eql('Ajuste de activación de modo Wake Up')
    expect(data.after).to.eql(10)
  })

  it('should return SETPARKINGALARM data parsed', () => {
    const raw = Buffer.from("Receive:'110'OK\r\n*000000,110,0#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETPARKINGALARM')
    expect(data.message).to.eql('Ajuste de la alarma de estacionamiento')
    expect(data.enable).to.eql(false)
  })

  it('should return FACTORYRESET data parsed', () => {
    const raw = Buffer.from("Receive:'990'OK\r\n*000000,990#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('FACTORYRESET')
    expect(data.message).to.eql('Restablecimiento de fabrica')
  })

  it('should return RBOOT data parsed', () => {
    const raw = Buffer.from("Receive:'991'OK\r\n*000000,991#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('RBOOT')
    expect(data.message).to.eql('Dispositivo reiniciado')
  })

  it('should return SETOILSENSER data parsed', () => {
    const raw = Buffer.from("Receive:'113'OK\r\n*000000,113,100,500#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETOILSENSER')
    expect(data.message).to.eql('Ajuste del sensor de combustible')
    expect(data.empty).to.eql(1)
    expect(data.full).to.eql(5)
  })

  it('should return SETSHUTOIL data parsed', () => {
    const raw = Buffer.from("Receive:'117'OK\r\n*000000,117,60,500,3000,5#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETSHUTOIL')
    expect(data.message).to.eql('Ajuste del corte de combustible')
    expect(data.speed).to.eql(60)
    expect(data.off).to.eql(500)
    expect(data.restart).to.eql(3000)
    expect(data.repeat).to.eql(5)
  })

  it('should return SETSHUTOILSWITCH data parsed', () => {
    const raw = Buffer.from("Receive:'116'OK\r\n*000000,116,0#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETSHUTOILSWITCH')
    expect(data.message).to.eql('Activación del corte de combustible')
    expect(data.enable).to.eql(false)
  })

  it('should return SETCALLA data parsed', () => {
    const raw = Buffer.from("Receive:'103'OK\r\n*000000,103,0,005695487459#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETCALLA')
    expect(data.message).to.eql('Ajuste de la alarma de SOS')
    expect(data.mode).to.eql('gprs')
    expect(data.number).to.eql('005695487459')
  })

  it('should return SETCALLA data parsed', () => {
    const raw = Buffer.from("Receive:'103'OK\r\n*000000,103,1,005695487459#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETCALLA')
    expect(data.message).to.eql('Ajuste de la alarma de SOS')
    expect(data.mode).to.eql('call')
    expect(data.number).to.eql('005695487459')
  })

  it('should return SETEXTEND2 data parsed', () => {
    const raw = Buffer.from("Receive:'118'OK\r\n*000000,118,10000001#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETEXTEND2')
    expect(data.message).to.eql('Ajuste de configuración extendida 2')
    expect(data.extend).to.eql({
      a: true,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
      g: false,
      h: true
    })
  })

  it('should return SETPIN data parsed', () => {
    const raw = Buffer.from("Receive:'122'OK\r\n*000000,122,0,1234#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETPIN')
    expect(data.message).to.eql('Ajuste del código pin de la tarjeta sim')
    expect(data.enable).to.eql(false)
    expect(data.pin).to.eql('1234')
  })

  it('should return SETANGLE data parsed', () => {
    const raw = Buffer.from("Receive:'300'OK\r\n*000000,300,0,360#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETANGLE')
    expect(data.message).to.eql('Ajuste de la alarma de angulo')
    expect(data.enable).to.eql(false)
    expect(data.angle).to.eql(360)
  })

  it('should return SETANGLE data parsed', () => {
    const raw = Buffer.from("Receive:'400'OK\r\n*000000,400,0,360#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETANGLE')
    expect(data.message).to.eql('Ajuste de la alarma de angulo')
    expect(data.enable).to.eql(false)
    expect(data.angle).to.eql(360)
  })

  it('should return SETANGLE data parsed', () => {
    const raw = Buffer.from("Receive:'400'OK\r\n*000000,400,1,360#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETANGLE')
    expect(data.message).to.eql('Ajuste de la alarma de angulo')
    expect(data.enable).to.eql(true)
    expect(data.angle).to.eql(360)
  })

  it('should return SETANGLE data parsed', () => {
    const raw = Buffer.from("Receive:'400'OK\r\n*000000,400,2,360#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETANGLE')
    expect(data.message).to.eql('Ajuste de la alarma de angulo')
    expect(data.enable).to.eql(true)
    expect(data.port).to.eql(4)
    expect(data.angle).to.eql(360)
  })

  it('should return SETANGLE data parsed', () => {
    const raw = Buffer.from("Receive:'400'OK\r\n*000000,400,3,360#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETANGLE')
    expect(data.message).to.eql('Ajuste de la alarma de angulo')
    expect(data.enable).to.eql(true)
    expect(data.port).to.eql(3)
    expect(data.angle).to.eql(360)
  })

  it('should return SETREBOOT data parsed', () => {
    const raw = Buffer.from("Receive:'600'OK\r\n*000000,600,0,30#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETREBOOT')
    expect(data.message).to.eql('Ajuste del intervalo de reiniciación')
    expect(data.enable).to.eql(false)
    expect(data.interval).to.eql(30)
  })

  it('should return SETACCALARM data parsed', () => {
    const raw = Buffer.from("Receive:'120'OK\r\n*000000,120,0,30,30#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETACCALARM')
    expect(data.message).to.eql('Ajuste de la alarma de aceleración')
    expect(data.enable).to.eql(false)
    expect(data.acceleration).to.eql(30)
    expect(data.deceleration).to.eql(30)
  })

  it('should return SETROAMING data parsed', () => {
    const raw = Buffer.from("Receive:'121'OK\r\n*000000,121,0,30,210#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETROAMING')
    expect(data.message).to.eql('Ajuste de roaming')
    expect(data.enable).to.eql(false)
    expect(data.interval).to.eql(30)
    expect(data.network).to.eql('210')
  })

  it('should return SETACKSTATE data parsed', () => {
    const raw = Buffer.from("Receive:'123'OK\r\n*000000,123,0#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETACKSTATE')
    expect(data.message).to.eql('Ajuste de ACK')
    expect(data.enable).to.eql(false)
  })

  it('should return SETCALLFILTER data parsed', () => {
    const raw = Buffer.from("Receive:'130'OK\r\n*000000,130,0,0#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETCALLFILTER')
    expect(data.message).to.eql('Ajuste de filtrado de llamadas')
    expect(data.enable).to.eql(false)
    expect(data.caller).to.eql('0')
  })

  it('should return SETSENDTYPE data parsed', () => {
    const raw = Buffer.from("Receive:'119'OK\r\n*000000,119,0#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETSENDTYPE')
    expect(data.message).to.eql('Ajuste del tipo de envío de datos')
    expect(data.mode).to.eql('gprs')
  })

  it('should return SETSENDTYPE data parsed', () => {
    const raw = Buffer.from("Receive:'119'OK\r\n*000000,119,1#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETSENDTYPE')
    expect(data.message).to.eql('Ajuste del tipo de envío de datos')
    expect(data.mode).to.eql('sms')
  })

  it('should return SETPICTUREINTERVAL data parsed', () => {
    const raw = Buffer.from("Receive:'200'OK\r\n*000000,200,10,999#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETPICTUREINTERVAL')
    expect(data.message).to.eql('Ajuste de intervalo de captura de imágenes')
    expect(data.interval).to.eql(10)
    expect(data.times).to.eql(999)
  })

  it('should return CLEARBUF data parsed', () => {
    const raw = Buffer.from("Receive:'500'OK\r\n*000000,500#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('CLEARBUF')
    expect(data.message).to.eql('Memoria interna vaciada')
  })

  it('should return GETPICTURE data parsed', () => {
    const raw = Buffer.from("Receive:'210'OK\r\n*000000,210#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('GETPICTURE')
    expect(data.message).to.eql('Nueva captura de imagen')
  })

  it('should return SETDATAFLASH data parsed', () => {
    const raw = Buffer.from("Receive:'601'OK\r\n*000000,601,1#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETDATAFLASH')
    expect(data.message).to.eql('Activación de vaciado de memoria interna')
    expect(data.enable).to.eql(true)
  })

  it('should return SETTRACKINGINTERVAL data parsed', () => {
    const raw = Buffer.from("Receive:'156'OK\r\n*000000,156,0,30,30#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETTRACKINGINTERVAL')
    expect(data.message).to.eql('Ajuste del intervalo de envío de datos')
    expect(data.enable).to.eql(false)
    expect(data.intervalOn).to.eql(30)
    expect(data.intervalOff).to.eql(30)
  })

  it('should return SETSENDODOMETER data parsed', () => {
    const raw = Buffer.from("Receive:'151'OK\r\n*000000,151,0,100#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETSENDODOMETER')
    expect(data.message).to.eql('Activación de alarma de odometro')
    expect(data.enable).to.eql(false)
    expect(data.range).to.eql(100)
  })

  it('should return SETIMEI data parsed', () => {
    const raw = Buffer.from("Receive:'155'OK\r\n*000000,155,0,000000000000000#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETIMEI')
    expect(data.message).to.eql('Ajuste de IMEI')
    expect(data.enable).to.eql(false)
    expect(data.newImei).to.eql('000000000000000')
  })

  it('should return SETIDLE data parsed', () => {
    const raw = Buffer.from("Receive:'404'OK\r\n*000000,404,0,30#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETIDLE')
    expect(data.message).to.eql('Ajuste de la alarma de ralenti')
    expect(data.enable).to.eql(false)
    expect(data.interval).to.eql(30)
  })

  it('should return SETINTERVALGPRSSTANDBY data parsed', () => {
    const raw = Buffer.from("Receive:'023'OK\r\n*000000,023,0,30#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETINTERVALGPRSSTANDBY')
    expect(data.message).to.eql(
      'Ajuste del intervalo de envío de datos en modo standby'
    )
    expect(data.enable).to.eql(false)
    expect(data.interval).to.eql(30)
  })

  it('should return SETIOPICTURE data parsed', () => {
    const raw = Buffer.from("Receive:'201'OK\r\n*000000,201,0,3,5#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETIOPICTURE')
    expect(data.message).to.eql(
      'Ajuste de captura de imágenes por activación de salidas digitales'
    )
    expect(data.enable).to.eql(false)
    expect(data.mode).to.eql('both')
    expect(data.times).to.eql(5)
  })

  it('should return SETIOPICTURE data parsed', () => {
    const raw = Buffer.from("Receive:'201'OK\r\n*000000,201,1,1,5#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETIOPICTURE')
    expect(data.message).to.eql(
      'Ajuste de captura de imágenes por activación de salidas digitales'
    )
    expect(data.enable).to.eql(true)
    expect(data.port).to.eql(4)
    expect(data.mode).to.eql('open')
    expect(data.times).to.eql(5)
  })

  it('should return SETIOPICTURE data parsed', () => {
    const raw = Buffer.from("Receive:'201'OK\r\n*000000,201,2,2,5#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETIOPICTURE')
    expect(data.message).to.eql(
      'Ajuste de captura de imágenes por activación de salidas digitales'
    )
    expect(data.enable).to.eql(true)
    expect(data.port).to.eql(3)
    expect(data.mode).to.eql('close')
    expect(data.times).to.eql(5)
  })

  it('should return SETIOPICTURE data parsed', () => {
    const raw = Buffer.from("Receive:'201'OK\r\n*000000,201,3,3,5#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETIOPICTURE')
    expect(data.message).to.eql(
      'Ajuste de captura de imágenes por activación de salidas digitales'
    )
    expect(data.enable).to.eql(true)
    expect(data.port).to.eql(2)
    expect(data.mode).to.eql('both')
    expect(data.times).to.eql(5)
  })

  it('should return SETIOPICTURE data parsed', () => {
    const raw = Buffer.from("Receive:'201'OK\r\n*000000,201,4,3,5#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETIOPICTURE')
    expect(data.message).to.eql(
      'Ajuste de captura de imágenes por activación de salidas digitales'
    )
    expect(data.enable).to.eql(true)
    expect(data.port).to.eql(1)
    expect(data.mode).to.eql('both')
    expect(data.times).to.eql(5)
  })

  it('should return SETPICTUREPACKET data parsed', () => {
    const raw = Buffer.from("Receive:'202'OK\r\n*000000,202,6#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.command).to.eql('SETPICTUREPACKET')
    expect(data.message).to.eql(
      'Ajuste de cantidad de paquetes enviados por imagen'
    )
    expect(data.number).to.eql(6)
  })

  it('should return undefined response', () => {
    const raw = Buffer.from("Receive:'999'OK\r\n*000000,999#")
    const data = tz.parse(raw)
    expect(data.password).to.eql('000000')
    expect(data.device).to.eql('tz')
    expect(data.message).to.eql('Última acción')
  })
})
