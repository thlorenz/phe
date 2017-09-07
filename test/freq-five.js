'use strict'

const test = require('tape')
const evaluate5cards = require('../lib/evaluator5')
const {
    handRank
  , rankDescription
  , ranks
} = require('../')

const frequencies = [
    40        // STRAIGHT_FLUSH
  , 624       // FOUR_OF_A_KIND
  , 3744      // FULL_HOUSE
  , 5108      // FLUSH
  , 10200     // STRAIGHT
  , 54912     // THREE_OF_A_KIND
  , 123552    // TWO_PAIR
  , 1098240   // ONE_PAIR
  , 1302540   // HIGH_CARD
]

test('\nfive: correct frequencies', function(t) {
  const freq = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] // 9

  // It's testing 311,875,200 permutations and takes about 0.72 secs
  // vs. the C version which takes 0.2 secs.
  for (let a = 0; a < 48; a++) {
    for (let b = a + 1; b < 49; b++) {
      for (let c = b + 1; c < 50; c++) {
        for (let d = c + 1; d < 51; d++) {
          for (let e = d + 1; e < 52; e++) {
            const i = evaluate5cards(a, b, c, d, e)
            const j = handRank(i)
            freq[j]++
          }
        }
      }
    }
  }

  for (let i = ranks.STRAIGHT_FLUSH; i <= ranks.HIGH_CARD; i++) {
    t.equal(freq[i], frequencies[i],
      `${rankDescription[i]}: ${frequencies[i]}`
    )
  }
  t.end()
})
