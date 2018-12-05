const fs = require('fs')

const isNotEmptyString = x => x !== ''

const FALLS_ASLEEP = 'falls asleep'
const WAKES_UP = 'wakes up'

const isStartShift = log => log !== FALLS_ASLEEP && log !== WAKES_UP

const parseBufferToArr = buffer => buffer.toString('utf-8').split('\n').filter(isNotEmptyString)

const sortLogs = (log1, log2) => {
  if (log1.month < log2.month) return -1
  if (log1.month > log2.month) return 1
  if (log1.day < log2.day) return -1
  if (log1.day > log2.day) return 1
  if (log1.hour < log2.hour) return -1
  if (log1.hour > log2.hour) return 1
  if (log1.minute < log2.minute) return -1
  if (log1.minute > log2.minute) return 1
  return 0
}

const parseToOrderedLogs = arr => {
  // const temp = [arr[0], arr[1]]
  const temp = arr
  const orderedLogs = temp.map(str => {
    const [datetime, log_str] = str.replace('[', '').split(']')
    const maybe_id_str = (log_str.match(/\d+/) || []).join('')
    const [date, time] = datetime.split(' ')
    const [year, month, day] = date.split('-')
    const [hour, minute] = time.split(':')
    return {
      maybe_id_str,
      month: parseInt(month, 10),
      day: parseInt(day, 10),
      minute: parseInt(minute, 10),
      // hour: parseInt(hour, 10)
      log: log_str.trim(),
    }
  }).sort(sortLogs)
  console.log(orderedLogs)
  for (let i = 0; i < orderedLogs.length; i++) {
    
  }
}

const parseBufferToOrderedLog = buffer => parseToOrderedLogs(parseBufferToArr(buffer))

const sumBuffer = (err, buffer) => err ? console.log(err) :  parseBufferToOrderedLog(buffer)

fs.readFile('../input.txt', sumBuffer)
