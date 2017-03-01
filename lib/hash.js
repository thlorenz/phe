const { dp, choose } = require('./dptables')

/* eslint-disable camelcase */

/**
 * Calculates the quinary hash using the dp table.
 *
 * @name hash_quinary
 * @function
 * @private
 * @param {Array} q array with an element for each rank, usually total of 13
 * @param {Number} len number of ranks, usually 13
 * @param {Number} k number of cards that make up the hand, 5, 6 or 7
 * @return {Number} hash sum
 */
function hash_quinary(q, len, k) {
  let sum = 0
  let i

  for (i = 0; i < len; i++) {
    sum += dp[q[i]][len - i - 1][k]

    k -= q[i]

    if (k <= 0) break
  }

  return sum
}

/**
 * Calculates the binary hash using the choose table.
 *
 * @name hash_binary
 * @function
 * @private
 * @param {Array} q array with an element for each rank, usually total of 13
 * @param {Number} len number of ranks, usually 13
 * @param {Number} k number of cards that make up the hand, 5, 6 or 7
 * @return {Number} hash sum
 */
function hash_binary(q, len, k) {
  let sum = 0
  let i

  for (i = 0; i < len; i++) {
    if (q[i]) {
      if (len - i - 1 >= k) {
        sum += choose[len - i - 1][k]
      }

      k--
      if (k === 0) break
    }
  }

  return sum
}

exports.hash_quinary = hash_quinary
exports.hash_binary = hash_binary
