/*
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-20 16:41:22
 * @LastEditors: 旋仔 zixuan.wen@shopcider.com
 * @LastEditTime: 2024-05-20 16:42:37
 * @FilePath: /figma-rename-helper/src/utils/device.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 判断是否是macos系统
export const isMacOs = (): boolean => {
  return /macintosh|mac os x/i.test(navigator.userAgent)
}
