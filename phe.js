'use strict'

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
  , rankCodes
  , suitCodes
  , stringifyCardCode
} = require('./lib/hand-code')

const evaluate5cards = require('./lib/evaluator5')
const evaluate6cards = require('./lib/evaluator6')
const evaluate7cards = require('./lib/evaluator7')

/**
 * Evaluates the 5 - 7 card codes to arrive at a number representing the hand
 * strength, smaller is better.
 *
 * @name evaluateCardCodes
 * @function
 * @param {Array.<Number>} cards the cards, i.e. `[ 49, 36, 4, 48, 41 ]`
 * @return {Number} the strength of the hand comprised by the card codes
 */
function evaluateCardCodes(codes) {
  const len = codes.length
  if (len === 5) return evaluate5cards.apply(null, codes)
  if (len === 6) return evaluate6cards.apply(null, codes)
  if (len === 7) return evaluate7cards.apply(null, codes)
  throw new Error(`Can only evaluate 5, 6 or 7 cards, you gave me ${len}`)
}

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
  return evaluateCardCodes(codes)
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
  return handRank(evaluateCards(cards))
}

/**
 * Same as `rankCards` but skips `cards` argument type check to be more
 * performant.
 */
function rankCardsFast(cards) {
  return handRank(evaluateCardsFast(cards))
}

/**
 * Evaluates the 5 - 7 card codes and then calculates the hand rank.
 *
 * @name rankCardCodes
 * @function
 * @param {Array.<Number>} cardCodes the card codes whose ranking to determine
 * @return {Number} the rank of the hand comprised by the card codes, i.e. `1` for
 * `FOUR_OF_A_KIND` (enumerated in ranks)
 */
function rankCardCodes(cardCodes) {
  return handRank(evaluateCardCodes(cardCodes))
}

/**
 * Evaluates the given board of 5 to 7 cards provided as part of the board to
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
 * Converts a set of cards to card codes.
 *
 * @name setCardCodes
 * @function
 * @param {Set.<String>} set card strings set, i.e. `Set({'Ah', 'Ks', 'Td', '3c, 'Ad'})`
 * @return {Set.<Number>} card code set
 */
function setCardCodes(set) {
  const codeSet = new Set()
  for (const v of set) codeSet.add(cardCode(v))
  return codeSet
}

/**
 * Converts a set of card codes to their string representations.
 *
 * @name setStringifyCardCodes
 * @function
 * @param {Set.<Number>} set card code set
 * @return {Set.<String>} set with string representations of the card codes,
 *                        i.e. `Set({'Ah', 'Ks', 'Td', '3c, 'Ad'})`
 */
function setStringifyCardCodes(set) {
  const stringSet = new Set()
  for (const v of set) stringSet.add(stringifyCardCode(v))
  return stringSet
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
  , evaluateCardCodes
  , evaluateBoard
  , rankCards
  , rankCardsFast
  , rankCardCodes
  , rankBoard

  // hand rank
  , handRank
  , rankDescription
  , ranks

  // hand code
  , cardCode
  , cardCodes
  , setCardCodes
  , setStringifyCardCodes
  , boardCodes
  , rankCodes
  , suitCodes
  , stringifyCardCode
}
