'use strict'

const responses = require('./responses')
const commands = require('./commands')
const patterns = require('./patterns')
const avl05 = require('./avl05')
const avl08 = require('./avl08')
const avl201 = require('./avl201')
const pictures = require('./pictures')
const errors = require('./errors')
const firmware = require('./firmware')
const info = require('./info')
const map = require('./map')

const parse = raw => {
  let result = {type: 'UNKNOWN', raw: raw.toString()}
  const _patterns = [
    {pattern: patterns.avl05, parser: avl05},
    {pattern: patterns.avl08, parser: avl08},
    {pattern: patterns.avl201, parser: avl201},
    {pattern: patterns.receiveOk, parser: responses.getCommand},
    {pattern: patterns.picture, parser: pictures},
    {pattern: patterns.receiveErr, parser: errors},
    {pattern: patterns.info, parser: info},
    {pattern: patterns.firmware, parser: firmware},
    {pattern: patterns.map, parser: map}
  ]
  const parser = _patterns.find(x => x.pattern.test(raw.toString()))
  if (parser) {
    result = parser.parser(raw)
  }
  return result
}

const isTz = raw => {
  const pattern = Object.keys(patterns).map(x => patterns[x]).find(x => x.test(raw.toString()))
  return typeof pattern !== 'undefined'
}

const getRebootCommand = password => `*${password || '000000'},991#`

const getImei = raw => {
  let imei = null
  const data = raw.toString()
  const _patterns = [patterns.avl05, patterns.avl08, patterns.avl201]
  const pattern = _patterns.find(x => x.test(data))
  if (pattern) {
    imei = pattern.exec(data)[2]
  }
  return imei
}

module.exports = {
  parse: parse,
  patterns: patterns,
  parseCommand: commands.parseCommand,
  isTz: isTz,
  getRebootCommand: getRebootCommand,
  getImei: getImei
}
