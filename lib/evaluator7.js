/* eslint-disable camelcase */
const { suits }        = require('./dptables')
const { noflush7 }     = require('./hashtable7')
const { flush }        = require('./hashtable')
const { hash_quinary } = require('./hash')

const { binaries_by_id, suitbit_by_id } = require('./bin-bit-table')

module.exports = function evaluate_7_cards(a, b, c, d, e, f, g) {
  let suit_hash = 0
  const suit_binary = [ 0, 0, 0, 0 ] // 4
  const quinary = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] // 13
  let hash

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
  suit_hash += suitbit_by_id[f]
  quinary[(f >> 2)]++
  suit_hash += suitbit_by_id[g]
  quinary[(g >> 2)]++

  if (suits[suit_hash]) {
    suit_binary[a & 0x3] |= binaries_by_id[a]
    suit_binary[b & 0x3] |= binaries_by_id[b]
    suit_binary[c & 0x3] |= binaries_by_id[c]
    suit_binary[d & 0x3] |= binaries_by_id[d]
    suit_binary[e & 0x3] |= binaries_by_id[e]
    suit_binary[f & 0x3] |= binaries_by_id[f]
    suit_binary[g & 0x3] |= binaries_by_id[g]

    return flush[suit_binary[suits[suit_hash] - 1]]
  }

  hash = hash_quinary(quinary, 13, 7)

  return noflush7[hash]
}
