/*
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-14 15:10:40
 * @LastEditors: 旋仔 zixuan.wen@shopcider.com
 * @LastEditTime: 2024-05-15 13:50:54
 * @FilePath: /figma-rename-helper/src/utils/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 判断是否为小数
export const isFractionalPart = (number: number) => {
  return String(number).includes('.')
}

// 保留小数位数
export const reservedDecimal = (number: number, digit: number) => {
  if (!isFractionalPart(number)) return number
  const transformNumber = number.toFixed(digit)
  const splitTransformNumber = transformNumber.split('.')
  if (Number(splitTransformNumber[1]) === 0) {
    return splitTransformNumber[0]
  }
  return transformNumber
}
