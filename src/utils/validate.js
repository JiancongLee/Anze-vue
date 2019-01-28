/**
 * 邮箱
 * @param {*} s
 */
export function isEmail (s) {
  return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s)
}

/**
 * 手机号码
 * @param {*} s
 */
export function isMobile (s) {
  return /^1[0-9]{10}$/.test(s)
}

export function checkDecimals (rule, value, callback) {
  const reg = /^\d+\.\d{0,2}$/
  if (!value) {
    callback()
  } else {
    console.log('3333')
    if (!reg.test(value)) {
      console.log('444444')
      callback(new Error('请输入正确的数字'))
    } else {
      console.log('555555')
      callback()
    }
  }
}

/**
 * 电话号码
 * @param {*} s
 */
export function isPhone (s) {
  return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s)
}

/**
 * URL地址
 * @param {*} s
 */
export function isURL (s) {
  return /^http[s]?:\/\/.*/.test(s)
}
