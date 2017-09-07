'use strict'

/* eslint-disable camelcase */
const { suits }        = require('./dptables')
const { noflush5 }     = require('./hashtable5')
const { flush }        = require('./hashtable')
const { hash_quinary } = require('./hash')

const { binaries_by_id, suitbit_by_id } = require('./bin-bit-table')

module.exports = function evaluate_5_cards(a, b, c, d, e) {
  var suit_hash = 0
  const suit_binary = [ 0, 0, 0, 0 ] // 4
  const quinary = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] // 13
  var hash

  suit_hash += suitbit_by_id[a]
  quinary[(a >> 2)]++
  suit_hash += suitbit_by_id[b]
  quinary[(b >> 2)]++
  suit_hash += suitbit_by_id[c]
  quinary[(c >> 2)]++
  suit_hash += suitbit_by_id[d]
  quinary[(d >> 2)]++
  suit_hash += suitbit_by_id[e]
  quinary[(e >> 2)]++

  if (suits[suit_hash]) {
    suit_binary[a & 0x3] |= binaries_by_id[a]
    suit_binary[b & 0x3] |= binaries_by_id[b]
    suit_binary[c & 0x3] |= binaries_by_id[c]
    suit_binary[d & 0x3] |= binaries_by_id[d]
    suit_binary[e & 0x3] |= binaries_by_id[e]

    return flush[suit_binary[suits[suit_hash] - 1]]
  }

  hash = hash_quinary(quinary, 13, 5)

  return noflush5[hash]
}
