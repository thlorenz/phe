const test = require('tape')
const evaluate6cards = require('../lib/evaluator6')
const {
    handRank
  , rankDescription
  , ranks
} = require('../')

const frequencies = [
    1844    // Straight Flush
  , 14664   // Four of a Kind
  , 165984  // Full House
  , 205792  // Flush
  , 361620  // Straight
  , 732160  // Three of a Kind
  , 2532816 // Two Pair
  , 9730740 // One Pair
  , 6612900 // High Card
]

test('\nsix: correct frequencies', function(t) {
  const freq = [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ] // 9
  // It's testing 14,658,134,400 permutations and takes about 5.3 secs
  // vs. the C version which takes 1.7 secs.
  for (let a = 0; a < 47; a++) {
    for (let b = a + 1; b < 48; b++) {
      for (let c = b + 1; c < 49; c++) {
        for (let d = c + 1; d < 50; d++) {
          for (let e = d + 1; e < 51; e++) {
            for (let f = e + 1; f < 52; f++) {
              const i = evaluate6cards(a, b, c, d, e, f)
              const j = handRank(i)
              freq[j]++
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
