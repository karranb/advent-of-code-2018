const fs = require('fs')

const sumData = (acc, number) => {
  console.log(acc, parseInt(number, 10))
  return acc + parseInt(number, 10)
}

const isNotEmptyString = x => x !== ''

const parseBufferToArr = buffer => buffer.toString('utf-8').split('\n').filter(isNotEmptyString)

const sumBuffer = (err, buffer) => err ? console.log(err) :  console.log(parseBufferToArr(buffer).reduce(sumData, 0))

fs.readFile('../input.txt', sumBuffer)
