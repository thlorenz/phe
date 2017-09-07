'use strict'

const { rankBoard, rankDescription } = require('../')

const board = 'As Ks 4h Ad Kd'
const rank = rankBoard(board)
const name = rankDescription[rank]

console.log('%s is a %s', board, name)
