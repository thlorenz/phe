/*
 * Card id, ranges from 0 to 51.
 *
 * The two least significant bits represent the 4 suits, ranged from 0-3.
 *
 * The rest of it represent the 13 ranks, ranged from 0-12.
 * More specifically:
 * deuce = 0, trey = 1, four = 2, five = 3, six = 4, seven = 5, eight = 6,
 * nine = 7, ten = 8, jack = 9, queen = 10, king = 11, ace = 12.
 *
 * 13 * 4 gives all 52 ids.
 */

const ranks = {
    2: 0b000000
  , 3: 0b000100
  , 4: 0b001000
  , 5: 0b001100
  , 6: 0b010000
  , 7: 0b010100
  , 8: 0b011000
  , 9: 0b011100
  , T: 0b100000
  , J: 0b100100
  , Q: 0b101000
  , K: 0b101100
  , A: 0b110000
}

const suits = {
    s: 0b00000
  , h: 0b00001
  , d: 0b00010
  , c: 0b00011
}

/**
 * Determines the code for the given hand.
 *
 * @name cardCode
 * @function
 * @param {String} rank the rank of the hand, i.e. `A`
 * @param {String} suit the suit of the hand, i.e. `h`
 * @return {Number} the card code that can be used to further evaluate the hand
 */
function cardCode(rank, suit) {
  return ranks[rank] | suits[suit]
}

function toCardCode(x) {
  return ranks[x[0]] | suits[x[1]]
}

/**
 * Determines the code for the given hands.
 *
 * @name cardCodes
 * @function
 * @param {Array.<String>} cards the cards to convert into card codes, i.e. `[ 'Ah', 'Kd' ]`
 * @return {Array.<Number>} the card codes that can be used to further evaluate the hands
 */
function cardCodes(cards) {
  return cards.map(toCardCode)
}

/**
 * Determines the code for the given hands.
 *
 * @name boardCodes
 * @function
 * @param {String} board the board to convert into card codes, i.e. `'Ah Kd Qh'`
 * @return {Array.<Number>} the card codes that can be used to further evaluate the hands
 */
function boardCodes(board) {
  const cards = board.trim().split(/ /)
  return cardCodes(cards)
}

exports.cardCode = cardCode
exports.cardCodes = cardCodes
exports.boardCodes = boardCodes
