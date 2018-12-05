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

const hasOverlay = rectangle1 => rectangle2 => {
  if (rectangle1.right < rectangle2.left || rectangle2.right < rectangle1.left) return false
  if (rectangle1.bottom < rectangle2.top || rectangle2.bottom < rectangle1.top) return false
  return true
}

const findId = (_, buffer) => {
  const rectangles = parseBufferToRectanglesDict(buffer)
  const cachedHits = {}

  outerLoop:
  for (let i = 0; i < rectangles.length; i++) {
    const rectangle1 = rectangles[i]
    if (cachedHits[rectangle1.id]) continue
    for (let j = 0; j < rectangles.length; j++) {
      if (j === i) continue
      const rectangle2 = rectangles[j]
      if (hasOverlay(rectangle1)(rectangle2)) {
        cachedHits[rectangle2.id] = true
        hit = true
        continue outerLoop
      }
    }
    console.log(rectangle1.id)
    return rectangle1.id
  }
}

fs.readFile('../input.txt', findId)
