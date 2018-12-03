const fs = require('fs')

const isNotEmptyString = x => x !== ''

const parseBufferToArr = buffer => buffer.toString('utf-8').split('\n').filter(isNotEmptyString)

const parseBufferToIntArr = buffer => parseBufferToArr(buffer).map(str => parseInt(str, 10))

const findRepeatedFrequency = (_, buffer) => {
  const inputArray = parseBufferToIntArr(buffer)
  let lastFrequency = 0
  const frequencies = {}
  frequencies[lastFrequency] = 1
  for (let i = 0; true; i++) {
    lastFrequency = lastFrequency + inputArray[i % inputArray.length]
    if (lastFrequency in frequencies) {
      frequencies[lastFrequency]++
      console.log(lastFrequency)
      return lastFrequency
    }
    frequencies[lastFrequency] = 1
  }
}
fs.readFile('../input.txt', findRepeatedFrequency)
