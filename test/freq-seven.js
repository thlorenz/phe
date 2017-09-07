'use strict'

const test = require('tape')
const evaluate7cards = require('../lib/evaluator7')
const {
    handRank
  , rankDescription
  , ranks
} = require('../')

const frequencies = [
    41584    // Straight Flush
  , 224848   // Four of a Kind
  , 3473184  // Full House
  , 4047644  // Flush
  , 6180020  // Straight
  , 6461620  // Three of a Kind
  , 31433400 // Two Pair
  , 58627800 // One Pair
  , 23294460 // High Card
]

test('\nseven: correct frequencies', function(t) {
  if (parseInt(process.env.SEVEN_FREQ) !== 1) {
    console.error('Skipping seven: correct frequencies.')
    console.error('Set SEVEN_FREQ=1 to include it.')
    return t.end()
  }

  const freq = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] // 9
  // It's testing 674,274,182,400 permutations and takes about 34.6 secs
  // vs. the C version which takes 11.6 secs.
  for (let a = 0; a < 46; a++) {
    for (let b = a + 1; b < 47; b++) {
      for (let c = b + 1; c < 48; c++) {
        for (let d = c + 1; d < 49; d++) {
          for (let e = d + 1; e < 50; e++) {
            for (let f = e + 1; f < 51; f++) {
              for (let g = f + 1; g < 52; g++) {
                const i = evaluate7cards(a, b, c, d, e, f, g)
                const j = handRank(i)
                freq[j]++
              }
            }
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
