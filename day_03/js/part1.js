const fs = require('fs')

const isNotEmptyString = x => x !== ''

const parseBufferToArr = buffer => buffer.toString('utf-8').split('\n').filter(isNotEmptyString)

const parseBufferToRectanglesDict = buffer => [parseBufferToArr(buffer)[0]].map(row => {
// const parseBufferToRectanglesDict = buffer => parseBufferToArr(buffer).reduce((acc, row) => {
  const [ idSplit, tail] = row.split('@')
  const id = idSplit.trim().replace('#', '')
  const [ padSplit, sizeSplit] = tail.split(':')
  const [leftPad, topPad] = padSplit.split(',')
  const [width, height] = sizeSplit.split('x')
  const top = parseInt(topPad, 10) + 1
  const left = parseInt(leftPad, 10) + 1
  const bottom = top + parseInt(height, 10)
  const right = left + parseInt(width, 10)
  console.log({ id, top, left, bottom, right })
  return { id, top, left, bottom, right }
})
  // return acc[id] = { top, left, bottom, right }
// }, {})


// const getOverlayedInches = already_overlayeds => rectangle1 => rectangle2 => {
//   for
// }

// const hasOverlay = rectangle1 => rectangle2 => {
//   if (rectangle1.left > rectangle2.right) return false
//   if (rectangle1.right < rectangle2.left) return false
//   if (rectangle1.top > rectangle2.bottom) return false
//   if (rectangle1.bottom < rectangle2.top) return false
//   return true
// }

const findOverlays = (_, buffer) => {
  const rectangles = parseBufferToRectanglesDict(buffer)
  // console.log(rectangles[0])
  const filledInches = {}
  const temp = [rectangles[0], rectangles[0]]
  const overlays = temp.reduce((acc, rectangle) => {
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

  console.log(filledInches)
  console.log(overlays)
  return overlays
}

fs.readFile('../input.txt', findOverlays)
