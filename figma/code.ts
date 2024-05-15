/*
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-04-30 10:51:17
 * @LastEditors: 旋仔 zixuan.wen@shopcider.com
 * @LastEditTime: 2024-05-15 13:41:45
 * @FilePath: /cider-figma-plugin/code.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { NodeType } from './typing'

let selectionNode = figma.currentPage.selection

let formatSelectionNode: any[] = []

figma.showUI(__html__, { visible: true, width: 720, height: 500 })

// 取出节点所有属性
const getNodeAllProperties = (node: any) => {
  const properties: any = {}
  for (const key in node) {
    if (key === 'parent') continue
    properties[key] = node[key]
  }
  console.log('properties', properties)
  return properties
}

// 监听图层选中
const handleSelectionChange = () => {
  formatSelectionNode = []
  figma.currentPage.selection.forEach((node) => {
    if ([NodeType.COMPONENT, NodeType.INSTANCE].includes(node.type as NodeType)) return
    formatSelectionNode.push(getNodeAllProperties(node))
  })
  selectionNode = figma.currentPage.selection
  figma.ui.postMessage({ type: 'selectionNodes', value: JSON.stringify(formatSelectionNode) })
}

// 确认重命名
const handleConfirmRename = (newList: Array<NewNodeType>) => {
  selectionNode.forEach((oldNode) => {
    // 获取新节点
    const newNode = newList.find((newNode) => newNode.id === oldNode.id) as NewNodeType
    let constraint
    if ((newNode.exportSettings[0] as any)?.constraint) {
      constraint = (newNode.exportSettings[newNode.exportSettings.length - 1] as any)?.constraint
    }
    oldNode.name = newNode.newName
  })
}

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'confirm') {
    handleConfirmRename(msg.value)
    figma.closePlugin()
  }
}

figma.on('selectionchange', handleSelectionChange)

handleSelectionChange()
