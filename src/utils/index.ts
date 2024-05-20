/*
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-14 15:10:40
 * @LastEditors: 旋仔 zixuan.wen@shopcider.com
 * @LastEditTime: 2024-05-20 14:35:32
 * @FilePath: /figma-rename-helper/src/utils/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { MessageType } from '@/types'

// 判断是否为小数
export const isFractionalPart = (number: number) => {
  return String(number).includes('.')
}

// 保留小数位数
export const reservedDecimal = (number: number, digit: number) => {
  // 如果不是小数，直接返回
  if (!isFractionalPart(number)) return number
  // 如果是小数，保留指定位数
  const transformNumber = number.toFixed(digit)
  // 拆分整数和小数部分
  const splitTransformNumber = transformNumber.split('.')
  // 如果小数部分为0，直接返回整数部分
  if (Number(splitTransformNumber[1]) === 0) {
    return splitTransformNumber[0]
  }
  // 如果小数部分不为0，返回整数和小数部分
  return transformNumber
}

// 发送消息给figma
export const postMessageToUI = (type: MessageType, value: any) => {
  window.parent.postMessage(
    {
      pluginMessage: {
        type,
        value,
      },
    },
    '*',
  )
}

// 判断是否存在多个匹配项
export const isMultipleMatch = (inputStr: string, pattern: RegExp) => {
  // 查找所有匹配的结果
  const matches = inputStr.match(pattern)
  return matches && matches.length > 1
}

// 匹配并替换最后一个满足正则表达式的字符串
export const replaceLastMatch = (inputStr: string, pattern: RegExp, replacement: string) => {
  // 查找所有匹配的结果
  const matches = inputStr.match(pattern)
  if (matches) {
    // 获取最后一个匹配的子字符串
    const lastMatch = matches[matches.length - 1]
    // 获取最后一个匹配的子字符串的起始索引
    const lastIndex = inputStr.lastIndexOf(lastMatch)
    // 构建新的字符串，将最后一个匹配的子字符串替换为指定的替换字符串
    const result = inputStr.substring(0, lastIndex) + replacement + inputStr.substring(lastIndex + lastMatch.length)
    return result
  } else {
    return inputStr // 没有匹配的字符串，返回原始字符串
  }
}

// 匹配并替换第一个满足正则表达式的字符串
export const replaceFirstMatch = (inputStr: string, pattern: RegExp, replacement: string) => {
  // 查找第一个匹配的结果
  const match = inputStr.match(pattern)
  if (match) {
    // 获取第一个匹配的子字符串
    const firstMatch = match[0]
    // 获取第一个匹配的子字符串的起始索引
    const firstIndex = inputStr.indexOf(firstMatch)
    // 构建新的字符串，将第一个匹配的子字符串替换为指定的替换字符串
    const result = inputStr.substring(0, firstIndex) + replacement + inputStr.substring(firstIndex + firstMatch.length)
    return result
  } else {
    return inputStr // 没有匹配的字符串，返回原始字符串
  }
}
