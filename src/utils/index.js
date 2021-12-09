const utils = {
  /**
 * @description 校验金额
 * @param {number} value
 * @param {number} [max=5]
 * @param {number} [msg='仅支持小数点后两位数，最小值可填入0.01']
 * @return {string}
*/
  validateMoney: (value, max = 5, msg = '仅支持小数点后两位数，最小值可填入0.01') => {
    const patten1 = '(^([0-9]?\\.)[0-9]{1,2}$)' // 如：0.01
    const patten2 = `(^[1-9][0-9]{0,${max}}$)` // 整型，如：123456 最大max位
    const patten3 = `(^[1-9][0-9]{0,${max}}?\\.[0-9]{1,2}$)` // 如999999.99 ,不含小数点共max位,含小数点max+2位
    const patten = patten1 + '|' + patten2 + '|' + patten3
    if (!new RegExp(patten).test(value)) {
      return msg
    } else {
      return 'ok'
    }
  },

  /**
 * @description 返回一个指定日期
 * @param {number} value
 * @return {string}
 */
  getDate: (value) => {
    const date = new Date()
    date.setDate(date.getDate() + value)
    const y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? '0' + m : m
    let d = date.getDate()
    d = d < 10 ? '0' + d : d
    return y + '-' + m + '-' + d
  },

}

export {
  utils
}