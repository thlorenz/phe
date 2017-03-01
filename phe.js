const {
     handRank
   , rankDescription
   , STRAIGHT_FLUSH
   , FOUR_OF_A_KIND
   , FULL_HOUSE
   , FLUSH
   , STRAIGHT
   , THREE_OF_A_KIND
   , TWO_PAIR
   , ONE_PAIR
   , HIGH_CARD
} = require('./lib/hand-rank')

const {
    cardCode
  , cardCodes
  , boardCodes
} = require('./lib/hand-code')

const evaluate5cards = require('./lib/evaluator5')
const evaluate6cards = require('./lib/evaluator6')
const evaluate7cards = require('./lib/evaluator7')

/**
 * Evaluates the 5 - 7 cards to arrive at a number representing the hand
 * strength, smaller is better.
 *
 * @name evaluateCards
 * @function
 * @param {Array.<String>} cards the cards, i.e. `[ 'Ah', 'Ks', 'Td', '3c', 'Ad' ]`
 * @return {Number} the strength of the hand comprised by the cards
 */
function evaluateCards(cards) {
  if (!Array.isArray(cards)) {
    throw new Error('Need to supply an Array with 5,6 or 7 cards')
  }
  return evaluateCardsFast(cards)
}

/**
 * Same as `evaluateCards` but skips `cards` argument type check to be more
 * performant.
 */
function evaluateCardsFast(cards) {
  const codes = cardCodes(cards)
  const len = codes.length
  if (len === 5) return evaluate5cards.apply(null, codes)
  if (len === 6) return evaluate6cards.apply(null, codes)
  if (len === 7) return evaluate7cards.apply(null, codes)
  throw new Error(`Can only evaluate 5, 6 or 7 cards, you gave me ${len}`)
}

/**
 * Evaluates the given board of 5 to 7 cards provided as part of the board to
 * arrive at a number representing the hand strength, smaller is better.
 *
 * @name evaluateBoard
 * @function
 * @param {String} board the board, i.e. `'Ah Ks Td 3c Ad'`
 * @return {Number} the strength of the hand comprised by the cards of the board
 */
function evaluateBoard(board) {
  if (typeof board !== 'string') throw new Error('board needs to be a string')
  const cards = board.trim().split(/ /)
  return evaluateCardsFast(cards)
}

/**
 * Evaluates the 5 - 7 cards and then calculates the hand rank.
 *
 * @name rankCards
 * @function
 * @param {Array.<String>} cards the cards, i.e. `[ 'Ah', 'Ks', 'Td', '3c', 'Ad' ]`
 * @return {Number} the rank of the hand comprised by the cards, i.e. `1` for
 * `FOUR_OF_A_KIND` (enumerated in ranks)
 */
function rankCards(cards) {
  return handRank(rankCards(cards))
}

/**
 * Same as `rankCards` but skips `cards` argument type check to be more
 * performant.
 */
function rankCardsFast(cards) {
  return handRank(evaluateCardsFast(cards))
}

/**
 * ranks the given board of 5 to 7 cards provided as part of the board to
 * and then calculates the hand rank.
 *
 * @name rankBoard
 * @function
 * @param {String} board the board, i.e. `'Ah Ks Td 3c Ad'`
 * @return {Number} the rank of the hand comprised by the cards, i.e. `1` for
 * `FOUR_OF_A_KIND` (enumerated in ranks)
 */
function rankBoard(cards) {
  return handRank(evaluateBoard(cards))
}

/**
  * Enumeration of possible hand ranks, each rank is a number from 0-8.
  *
  * ```
  * STRAIGHT_FLUSH
  * FOUR_OF_A_KIND
  * FULL_HOUSE
  * FLUSH
  * STRAIGHT
  * THREE_OF_A_KIND
  * TWO_PAIR
  * ONE_PAIR
  * HIGH_CARD
  * ```
  *
  * @name ranks
  * @function
  */
const ranks = {
    STRAIGHT_FLUSH
  , FOUR_OF_A_KIND
  , FULL_HOUSE
  , FLUSH
  , STRAIGHT
  , THREE_OF_A_KIND
  , TWO_PAIR
  , ONE_PAIR
  , HIGH_CARD
}

module.exports = {
    evaluateCards
  , evaluateCardsFast
  , evaluateBoard
  , rankCards
  , rankCardsFast
  , rankBoard

  // hand rank
  , handRank
  , rankDescription
  , ranks

  // hand code
  , cardCode
  , cardCodes
  , boardCodes
}
