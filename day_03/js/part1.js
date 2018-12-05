const fs = require('fs')

const isNotEmptyString = x => x !== ''

const parseBufferToArr = buffer => buffer.toString('utf-8').split('\n').filter(isNotEmptyString)

const parseBufferToRectanglesDict = buffer => parseBufferToArr(buffer).map(row => {
  const [ idSplit, tail] = row.split('@')
  const id = idSplit.trim().replace('#', '')
  const [ padSplit, sizeSplit] = tail.split(':')
  const [leftPad, topPad] = padSplit.split(',')
  const [width, height] = sizeSplit.split('x')
  const top = parseInt(topPad, 10) + 1
  const left = parseInt(leftPad, 10) + 1
  const bottom = top + parseInt(height, 10) - 1
  const right = left + parseInt(width, 10) - 1 
  return { id, top, left, bottom, right }
})

const findOverlays = (_, buffer) => {
  const rectangles = parseBufferToRectanglesDict(buffer)
  const filledInches = {}
  const overlays = rectangles.reduce((acc, rectangle) => {
    for (let x = rectangle.left; x <= rectangle.right; x++) {
      for (let y = rectangle.top; y <= rectangle.bottom; y++) {
        const coordinate = `${x}, ${y}`
        if (filledInches[coordinate] === undefined) {
          filledInches[coordinate] = 1
          continue
        }
        if (filledInches[coordinate] === 1) {
          filledInches[coordinate] = 2
          acc += 1
          continue
        }
      }
    }
    return acc
  }, 0)

  console.log(overlays)
  return overlays
}

fs.readFile('../input.txt', findOverlays)
