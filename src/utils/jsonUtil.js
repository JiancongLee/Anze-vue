export function parseJson (data, newData, prefix, isArray) {
  if (!prefix) {
    prefix = ''
  }
  // 循环所有键
  for (let key in data) {
    let element = data[key]
    if (element.length > 0 && typeof (element) === 'object') {
      let tempPrefix
      if (isArray) {
        tempPrefix = prefix + '.'
      }
      if (prefix) {
        tempPrefix = tempPrefix || prefix + '.' + key
      } else {
        tempPrefix = key
      }
      parseJson(element, newData, tempPrefix, true)
    } else if (typeof (element) === 'object') {
      let tempPrefix
      if (isArray) {
        tempPrefix = prefix + '[' + key + ']'
      } else if (prefix) {
        tempPrefix = prefix + '.' + key
      } else {
        tempPrefix = key
      }
      parseJson(element, newData, tempPrefix, false)
    } else {
      if (typeof (element) === 'undefined' || !element) {
        continue
      }
      if (!prefix) {
        newData[key] = element
      } else if (isArray) {
        newData[prefix + '[' + key + ']'] = element
      } else {
        newData[prefix + '.' + key] = element
      }
    }
  }
}
