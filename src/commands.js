'use strict';

const parseSetUserPassword = data => {
  return `*${data.password},001,${data.newPassword}#`;
};

const parseSetIoSwitch = data => {
  const _data = data.instruction.split('_');
  const ports = {'1': 'A', '2': 'B', '3': 'C', '4': 'D'};
  return `*${data.password},025,${ports[_data[0]]},${_data[1] === 'on' ? 1 : 0}#`;
};

const parseSetSysSwitch = data => {
  const state = data.instruction.split('_')[1];
  return `*${data.password},016,${state === 'on' ? 1 : 0}#`;
};

const parseClearbuf = data => {
  return `*${data.password},500#`;
};

const parseSetGprsInterval = data => {
  return `*${data.password},018,${data.interval},${data.times || 999}#`;
};

const parseSetPhoneSmsForSos = data => {
  const state = data.instruction.split('_')[0];
  return `*${data.password},003,0,${state === 'set' ? 1 : 0},00569${data.number},00569${data.number}#`;
};

const parseSetOverSpeedAlarm = data => {
  const speed = data.speed || 100;
  const state = data.instruction.split('_')[2];
  const times = data.times || 10;
  const interval = data.interval || 60;
  const digit = /on(E)?/.test(state) ? 1 : 0;
  return `*${data.password},005,${digit},${speed},${times},${interval}#`;
};

const parseSetpictureinterval = data => {
  const interval = data.interval || 5;
  const times = data.times || 1;
  return `*${data.password},200,${interval},${times}#`;
};

const parseGetpicture = data => {
  return `*${data.password},210#`;
};

const parseSetiopicture = data => {
  const triggers = {on: 1, off: 2, both: 3};
  const trigger = triggers[data.trigger || 'both'];
  const number = data.number || 1;
  return `*${data.password},201,${data.port},${trigger},${number}#`;
};

const parseCustom = data => {
  return data.command;
};

const parseSetdataflash = data => {
  const state = data.instruction.split('_')[2];
  const digit = state === 'on' ? 1 : 0;
  return `*${data.password},601,${digit}#`;
};

const parseSetTrembleSwitch = data => {
  return `*${data.password},021,${data.sleep ? 1 : 0},${data.tremble ? 1 : 0}#`;
};

const parseSetTrembleToSleep = data => {
  return `*${data.password},044,${data.time}#`;
};

const parseSetTrembleToWakeup = data => {
  return `*${data.password},043,${data.time}#`;
};

const parseRboot = data => {
  return `*${data.password},991#`;
};

const parseExtendComponent = data => data ? 1 : 0;

const parseSetExtend2 = data => {
  const a = parseExtendComponent(data.a);
  const b = parseExtendComponent(data.b);
  const c = parseExtendComponent(data.c);
  const d = parseExtendComponent(data.d);
  const e = parseExtendComponent(data.e);
  const f = parseExtendComponent(data.f);
  const g = parseExtendComponent(data.g);
  const h = parseExtendComponent(data.h);
  return `*${data.password},118,${a}${b}${c}${d}${e}${f}${g}${h}#`;
};

const parseSetHeartbeatSwitch = data => {
  const state = data.instruction.split('_')[2];
  const digit = state === 'on' ? 1 : 0;
  return `*${data.password},040,${digit}#`;
};

const parseSetHeartbeatInterval = data => {
  return `*${data.password},041,${data.times}#`;
};

const parseSetidle = data => {
  const state = data.instruction.split('_')[2];
  const digit = state === 'on' ? 1 : 0;
  return `*${data.password},404,${digit},${data.times}#`;
};

const parseCommand = data => {
  let command = null;
  data.password = data.password || '000000';
  const parsers = [
    {pattern: /^set_password$/, parser: parseSetUserPassword},
    {pattern: /^[1-4]{1}_(on|off)$/, parser: parseSetIoSwitch},
    {pattern: /^gprs_(on|off)$/, parser: parseSetSysSwitch},
    {pattern: /^clear_mem$/, parser: parseClearbuf},
    {pattern: /^set_interval_gprs$/, parser: parseSetGprsInterval},
    {pattern: /^(set|setoff)_sos_number(E)?$/, parser: parseSetPhoneSmsForSos},
    {pattern: /^set_speed_(on|off)(E)?$/, parser: parseSetOverSpeedAlarm},
    {pattern: /^picture$/, parser: parseSetpictureinterval},
    {pattern: /^take_picture$/, parser: parseGetpicture},
    {pattern: /^configure_io_picture$/, parser: parseSetiopicture},
    {pattern: /^Custom$/, parser: parseCustom},
    {pattern: /^set_memory_(on|off)$/, parser: parseSetdataflash},
    {pattern: /^set_tremble$/, parser: parseSetTrembleSwitch},
    {pattern: /^set_into_sleep$/, parser: parseSetTrembleToSleep},
    {pattern: /^set_wake_up$/, parser: parseSetTrembleToWakeup},
    {pattern: /^reboot$/, parser: parseRboot},
    {pattern: /^set_extend$/, parser: parseSetExtend2},
    {pattern: /^set_heartbeat_(on|off)$/, parser: parseSetHeartbeatSwitch},
    {pattern: /^set_interval_heartbeat$/, parser: parseSetHeartbeatInterval},
    {pattern: /^set_idling_(on|off)$/, parser: parseSetidle}
  ];
  const parser = parsers.find(x => x.pattern.test(data.instruction));
  if (parser) {
    command = parser.parser(data);
  }

  return command;
};

module.exports = {
  parseCommand: parseCommand
};
