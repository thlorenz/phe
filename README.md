# phe [![build status](https://secure.travis-ci.org/thlorenz/phe.png)](http://travis-ci.org/thlorenz/phe)

Poker hand evaluator, a port of [PokerHandEvaluator](https://github.com/HenryRLee/PokerHandEvaluator).

It's super fast even though still 3x slower than the C version it was ported from, but hey you can use this directly
with Node.js or even in the browser.

It's fast, cause it's using a hash algorithm relying on masking and tables. However the table data isn't huge like I've
seen in other projects. This is possible because flushes are considered separately from other rankings

I highly recommend reading the [informative writeup on how this all
works](https://github.com/HenryRLee/PokerHandEvaluator/tree/master/Documentation).

```js
const { rankBoard, rankDescription } = require('phe')

const board = 'As Ks 4h Ad Kd'
const rank = rankBoard(board)
const name = rankDescription[rank]

console.log('%s is a %s', board, name)
```

    As Ks 4h Ad Kd is a Two Pair

## Installation

    npm install phe

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [API](#api)
  - [evaluateCardCodes](#evaluatecardcodes)
  - [evaluateCards](#evaluatecards)
  - [evaluateCardsFast](#evaluatecardsfast)
  - [evaluateBoard](#evaluateboard)
  - [rankCards](#rankcards)
  - [rankCardsFast](#rankcardsfast)
  - [rankCardCodes](#rankcardcodes)
  - [rankBoard](#rankboard)
  - [setCardCodes](#setcardcodes)
  - [setStringifyCardCodes](#setstringifycardcodes)
  - [ranks](#ranks)
  - [rankDescription](#rankdescription)
  - [handRank](#handrank)
  - [rankCodes](#rankcodes)
  - [suitCodes](#suitcodes)
  - [stringifyCardCode](#stringifycardcode)
  - [stringifyRank](#stringifyrank)
  - [cardCode](#cardcode)
  - [cardCodes](#cardcodes)
  - [boardCodes](#boardcodes)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## [API](https://thlorenz.github.io/phe)

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### evaluateCardCodes

Evaluates the 5 - 7 card codes to arrive at a number representing the hand
strength, smaller is better.

**Parameters**

-   `cards` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** the cards, i.e. `[ 49, 36, 4, 48, 41 ]`

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the strength of the hand comprised by the card codes

### evaluateCards

Evaluates the 5 - 7 cards to arrive at a number representing the hand
strength, smaller is better.

**Parameters**

-   `cards` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** the cards, i.e. `[ 'Ah', 'Ks', 'Td', '3c', 'Ad' ]`

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the strength of the hand comprised by the cards

### evaluateCardsFast

Same as `evaluateCards` but skips `cards` argument type check to be more
performant.

**Parameters**

-   `cards`  

### evaluateBoard

Evaluates the given board of 5 to 7 cards provided as part of the board to
arrive at a number representing the hand strength, smaller is better.

**Parameters**

-   `board` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the board, i.e. `'Ah Ks Td 3c Ad'`

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the strength of the hand comprised by the cards of the board

### rankCards

Evaluates the 5 - 7 cards and then calculates the hand rank.

**Parameters**

-   `cards` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** the cards, i.e. `[ 'Ah', 'Ks', 'Td', '3c', 'Ad' ]`

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the rank of the hand comprised by the cards, i.e. `1` for
`FOUR_OF_A_KIND` (enumerated in ranks)

### rankCardsFast

Same as `rankCards` but skips `cards` argument type check to be more
performant.

**Parameters**

-   `cards`  

### rankCardCodes

Evaluates the 5 - 7 card codes and then calculates the hand rank.

**Parameters**

-   `cardCodes` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** the card codes whose ranking to determine

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the rank of the hand comprised by the card codes, i.e. `1` for
`FOUR_OF_A_KIND` (enumerated in ranks)

### rankBoard

Evaluates the given board of 5 to 7 cards provided as part of the board to
and then calculates the hand rank.

**Parameters**

-   `board` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the board, i.e. `'Ah Ks Td 3c Ad'`

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the rank of the hand comprised by the cards, i.e. `1` for
`FOUR_OF_A_KIND` (enumerated in ranks)

### setCardCodes

Converts a set of cards to card codes.

**Parameters**

-   `set` **[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** card strings set, i.e. `Set({'Ah', 'Ks', 'Td', '3c, 'Ad'})`

Returns **[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)&lt;[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** card code set

### setStringifyCardCodes

Converts a set of card codes to their string representations.

**Parameters**

-   `set` **[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)&lt;[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** card code set

Returns **[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** set with string representations of the card codes,
                       i.e. `Set({'Ah', 'Ks', 'Td', '3c, 'Ad'})`

### ranks

Enumeration of possible hand ranks, each rank is a number from 0-8.

    STRAIGHT_FLUSH
    FOUR_OF_A_KIND
    FULL_HOUSE
    FLUSH
    STRAIGHT
    THREE_OF_A_KIND
    TWO_PAIR
    ONE_PAIR
    HIGH_CARD

### rankDescription

Provides a description of a hand rank number.
It's an {Array} which can be indexed into with the hand rank
in order to retrieve the matching description.

Example: `rankDescription[rank.FULL_HOUSE] === 'Full House'`

### handRank

Converts a hand strength number into a hand rank number
`0 - 8` for `STRAIGHT_FLUSH - HIGH_CARD`.

**Parameters**

-   `val` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** hand strength (result of an `evaluate` function)

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the hand rank

### rankCodes

The ranks of the cards sorted highest to lowest.

-   2 = 0
-   3 = 1
-   4 = 2
-   5 = 2
-   6 = 4
-   7 = 5
-   8 = 6
-   9 = 7
-   T = 8
-   J = 9
-   Q = 10
-   K = 11
-   A = 12

6 bits each.

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** the ranks indexed as described above

### suitCodes

The suitCodes

-   s = 0
-   h = 1
-   d = 2
-   c = 3

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** the suits indexed as described above

### stringifyCardCode

Converts the given card code into a string presentation.

**Parameters**

-   `code` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the card code, i.e. obtained via `cardCode(rank, suit)`.

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** a string representation of the card in question, i.e. `Ah`

### stringifyRank

Converts the given rank index into a rank.

**Parameters**

-   `rank` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the rank to stringify, i.e. `0b000100`

Returns **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the string of the rank, i.e. `'2'`

### cardCode

Determines the code for the given hand.

**Parameters**

-   `rank` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the rank of the hand, i.e. `A`
-   `suit` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the suit of the hand, i.e. `h`

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** the card code that can be used to further evaluate the hand

### cardCodes

Determines the code for the given hands.

**Parameters**

-   `cards` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)>** the cards to convert into card codes, i.e. `[ 'Ah', 'Kd' ]`

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** the card codes that can be used to further evaluate the hands

### boardCodes

Determines the code for the given hands.

**Parameters**

-   `board` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** the board to convert into card codes, i.e. `'Ah Kd Qh'`

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)&lt;[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)>** the card codes that can be used to further evaluate the hands

## License

MIT
