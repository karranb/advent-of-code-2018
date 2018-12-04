const fs = require('fs')

const isNotEmptyString = x => x !== ''

const parseBufferToArr = buffer => buffer.toString('utf-8').split('\n').filter(isNotEmptyString)

const hasValue = value => dict => Object.values(dict).indexOf(value) > -1

const getRepeatedChars = string1 => string2 => {
  const string2Chars = string2.split('')
  return string1.split('').reduce((repeatedChars, char, i) => 
    char === string2Chars[i] ? repeatedChars + char : repeatedChars
  , '')
  
}

const sortByRepeatedSum = (a, b) => {
  if (a.repeatedSum > b.repeatedSum) {
    return 1;
  }
  if (a.repeatedSum < b.repeatedSum) {
    return -1;
  }
  return 0;
}

const findChecksum = (_, buffer) => {
  const boxes = parseBufferToArr(buffer)
  const hashedBoxes = boxes.reduce((acc, box, i) => {
    let current = acc[box] ? acc[box]: {repeatedSum: -1}
    for (let j = i+1; j < boxes.length; j++) {
      const repeateds = getRepeatedChars(box)(boxes[j])
      if (repeateds.length > current.repeatedSum) {
        acc[box] = {
          repeatedSum: repeateds.length,
          repeateds,
          otherIndex: j, 
        }
        acc[boxes[j]] = {
          repeatedSum: repeateds.length,
          repeateds,
          otherIndex: i, 
        }
      }
    }
    return acc
  }, {})
  const values = Object.values(hashedBoxes)
  const correctBox = values.sort(sortByRepeatedSum)[values.length-1]
  console.log(correctBox.repeateds)
}

fs.readFile('../input.txt', findChecksum)
