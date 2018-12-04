const fs = require('fs')

const isNotEmptyString = x => x !== ''

const parseBufferToArr = buffer => buffer.toString('utf-8').split('\n').filter(isNotEmptyString)

const getRepeatedChars = string1 => string2 => {
  const string2Chars = string2.split('')
  return string1.split('').reduce((repeatedChars, char, i) => 
    char === string2Chars[i] ? repeatedChars + char : repeatedChars
  , '')
  
}

const getResult = (_, buffer) => {
  const boxes = parseBufferToArr(buffer)
  const chars = boxes.reduce((acc, box, i) => {
    for (let j = i+1; j < boxes.length; j++) {
      const repeateds = getRepeatedChars(box)(boxes[j])
      if (repeateds.length > acc.length) {
        acc = repeateds
      }
    }
    return acc
  }, '')
  console.log(chars)
}

fs.readFile('../input.txt', getResult)
