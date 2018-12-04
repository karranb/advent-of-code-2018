const fs = require('fs')

const isNotEmptyString = x => x !== ''

const parseBufferToArr = buffer => buffer.toString('utf-8').split('\n').filter(isNotEmptyString)

const hasValue = value => dict => Object.values(dict).indexOf(value) > -1

const hasValue2 = dict => hasValue(2)(dict)
const hasValue3 = dict => hasValue(3)(dict)

const findChecksum = (_, buffer) => {
  let sumOfTwo = 0
  let sumOfThree = 0

  parseBufferToArr(buffer).forEach((str, i) => {
    const dict = str.split('').reduce((acc, letter) => {
      const count = acc[letter] !== undefined ? acc[letter] + 1 : 1
      acc[letter] = count
      return acc
    }, {})
    if (hasValue2(dict)) sumOfTwo++
    if (hasValue3(dict)) sumOfThree++
  })
  const result = sumOfTwo * sumOfThree
  console.log(result)
  return result
}

fs.readFile('../input.txt', findChecksum)
