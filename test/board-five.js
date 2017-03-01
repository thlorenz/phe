const test = require('tape')
const { rankBoard, rankDescription } = require('../')
const { prettyBoard } = require('./utils/utils')
const {
     STRAIGHT_FLUSH
   , FOUR_OF_A_KIND
   , FULL_HOUSE
   , FLUSH
   , STRAIGHT
   , THREE_OF_A_KIND
   , TWO_PAIR
   , ONE_PAIR
   , HIGH_CARD
} = require('../').ranks

// eslint-disable-next-line no-unused-vars
function inspect(obj, depth) {
  console.error(require('util').inspect(obj, false, depth || 5, true))
}

test('\n5 card boards', function(t) {
  function check(board, expectedRank) {
    const rank = rankBoard(board)
    const desc = rankDescription[expectedRank]
    t.equal(rank, expectedRank, `${prettyBoard(board)} = ${desc}`)
  }
  [ [ 'Th Jh Qh Kh Ah', STRAIGHT_FLUSH ]
  , [ 'Th Jh Qh Kh 9h', STRAIGHT_FLUSH ]
  , [ 'Th Jh Js Jd Jc', FOUR_OF_A_KIND ]
  , [ 'Th Jh Js Jd Tc', FULL_HOUSE ]
  , [ '8h Jh Qh Kh 9h', FLUSH ]
  , [ 'Th Jh Qh Kh As', STRAIGHT ]
  , [ 'As 2h 3d 4h 5c', STRAIGHT ]
  , [ 'Th Jh Js Jd 9c', THREE_OF_A_KIND ]
  , [ 'Th Jh Js 9d 9c', TWO_PAIR ]
  , [ 'Th Jh 2s 9d 9c', ONE_PAIR ]
  , [ 'Th Jh 2s Ad 9c', HIGH_CARD ]
  ].forEach(x => check(x[0], x[1]))

  t.end()
})
