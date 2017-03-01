const colors = require('ansicolors')
const suits = {
    h: colors.red('♥')
  , s: colors.brightBlack('♠')
  , d: colors.red('♦')
  , c: colors.brightBlack('♣')
}

function prettyBoard(board) {
  return board
    .replace(/h/g, suits.h + ' ')
    .replace(/s/g, suits.s + ' ')
    .replace(/d/g, suits.d + ' ')
    .replace(/c/g, suits.c + ' ')
}

exports.prettyBoard = prettyBoard
