/*
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-13 15:27:55
 * @LastEditors: xuanzai xuanzai@bytedance.com
 * @LastEditTime: 2024-10-31 22:12:01
 * @FilePath: /figma-rename-helper/src/constants/i18n.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

export const i18nOptions = [
  {
    value: 'FR/FR',
    label: 'FR',
    imgPrefix: new URL('@/assets/Country-Flag/FR.png', import.meta.url).href,
  },
  {
    value: 'JP/JP',
    label: 'JP',
    imgPrefix: new URL('@/assets/Country-Flag/JP.png', import.meta.url).href,
  },
  {
    value: 'IT/IT',
    label: 'IT',
    imgPrefix: new URL('@/assets/Country-Flag/IT.png', import.meta.url).href,
  },
  {
    value: 'BR/BR',
    label: 'BR',
    imgPrefix: new URL('@/assets/Country-Flag/BR.png', import.meta.url).href,
  },
  {
    value: 'AR/AR',
    label: 'AR',
    imgPrefix: new URL('@/assets/Country-Flag/AR.png', import.meta.url).href,
  },
  {
    value: 'AU/AU',
    label: 'AU',
    imgPrefix: new URL('@/assets/Country-Flag/AU.png', import.meta.url).href,
  },
  {
    value: 'DE/DE',
    label: 'DE',
    imgPrefix: new URL('@/assets/Country-Flag/DE.png', import.meta.url).href,
  },
  {
    value: 'ES/ES',
    label: 'ES',
    imgPrefix: new URL('@/assets/Country-Flag/ES.png', import.meta.url).href,
  },
  {
    value: 'EU/EU',
    label: 'EU',
    imgPrefix: new URL('@/assets/Country-Flag/EU.png', import.meta.url).href,
  },
  {
    value: 'KR/KR',
    label: 'KR',
    imgPrefix: new URL('@/assets/Country-Flag/KR.png', import.meta.url).href,
  },
  {
    value: 'MX/MX',
    label: 'MX',
    imgPrefix: new URL('@/assets/Country-Flag/MX.png', import.meta.url).href,
  },
  {
    value: 'SEA/SEA',
    label: 'SEA',
    imgPrefix: new URL('@/assets/Country-Flag/SG.png', import.meta.url).href,
  },
  {
    value: 'TH/TH',
    label: 'TH',
    imgPrefix: new URL('@/assets/Country-Flag/TH.png', import.meta.url).href,
  },
  {
    value: 'UK/UK',
    label: 'UK',
    imgPrefix: new URL('@/assets/Country-Flag/UK.png', import.meta.url).href,
  },
  {
    value: 'CN/CN',
    label: 'CN',
    imgPrefix: new URL('@/assets/Country-Flag/CN.png', import.meta.url).href,
  },
  {
    value: 'NL/NL',
    label: 'NL',
    imgPrefix: new URL('@/assets/Country-Flag/NL.png', import.meta.url).href,
  },
  {
    value: 'LATAM/LATAM',
    label: 'LATAM',
    imgPrefix: new URL('@/assets/Country-Flag/LATAM.png', import.meta.url).href,
  },
].sort((a: any, b: any) => a.label.localeCompare(b.label))

i18nOptions.unshift(
  // {
  //   value: '',
  //   label: 'Select your language',
  //   imgPrefix: new URL('@/assets/Country-Flag/None.png', import.meta.url).href,
  // },
  {
    value: 'EN/EN',
    label: 'EN',
    imgPrefix: new URL('@/assets/Country-Flag/US.png', import.meta.url).href,
  },
)
