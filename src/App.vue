<!--
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-11 18:08:49
 * @LastEditors: xuanzai xuanzai@bytedance.com
 * @LastEditTime: 2024-10-31 22:12:22
 * @FilePath: /figma-plugin-vue3-template/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <template v-if="formatListData?.length">
    <div class="relative m-40px mt-20px mb-0">
      <div class="flex justify-between">
        <div class="left flex-1">
          <Title title="Original Layer Name" />
          <List-Container class="left-list">
            <ListItem :list-data="formatListData" />
          </List-Container>
        </div>
        <div class="flex items-center center">
          <img
            class="relative w-12px ml-20px mr-20px top-15px"
            src="@/assets/Other/arrow-right.png"
          >
        </div>
        <div class="right flex-1">
          <Title title="Modified Layer Name" />
          <List-Container class="right-list">
            <ListItem
              name-key="newName"
              :list-data="rightListData"
            />
          </List-Container>
        </div>
      </div>
      <Horizontal-Line class="mt-20px mb-20px" />
      <div>
        <div
          class="operator-box"
        >
          <div class="rule-box flex justify-between">
            <div class="left flex-1 relative top-8px">
              <ElCheckbox
                v-model="configure.onI18n"
                label="Show i18n Rule（Prefix）"
                size="large"
                text-color="#333"
              />
              <br>
              <ElCheckbox
                v-model="configure.onDevice"
                label="Show Device（Prefix）"
                size="large"
                text-color="#333"
              />
              <ElCheckbox
                v-model="configure.onLayerSize"
                label="Show Layer Size（Suffix）"
                size="large"
                text-color="#333"
              />
              <br>
              <ElCheckbox
                v-model="configure.onLayerResolution"
                label="Show Layer Resolution（Suffix）"
                size="large"
                text-color="#333"
              />
            </div>
            <div class="center w-50px" />
            <div class="right flex-1">
              <div
                v-show="configure.onI18n"
                class="selector-box mb-20px"
              >
                <div class="flex justify-between">
                  <Title title="i18N Rules" />
                  <ElSwitch
                    v-model="configure.onUseI18n"
                    size="small"
                    active-text="Apply new"
                    inactive-text="Stay old"
                  />
                </div>
                <Selector
                  v-model:value="configure.i18nValue"
                  :options="i18nOptions"
                />
              </div>
              <div
                v-show="configure.onDevice"
                class="selector-box"
              >
                <div class="flex justify-between">
                  <Title title="Device" />
                  <ElSwitch
                    v-model="configure.onUseDevice"
                    size="small"
                    active-text="Apply new"
                    inactive-text="Stay old"
                  />
                </div>
                <Selector
                  v-model:value="configure.deviceValue"
                  :options="deviceOptions"
                />
              </div>
            </div>
          </div>
          <Button
            label="RENAME"
            class="mt-20px"
            @click="handleClickButton"
          />
          <div class="h-30px" />
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="m-40px">
      <div class="b-1 b-solid b-#e1e1e1 bg-#fafafa rounded-4px">
        <ListItem :list-data="emptyListData" />
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { ElCheckbox, ElSwitch } from 'element-plus'
import { i18nOptions } from './constants/i18n'
import { deviceOptions } from './constants/device'
import { findFirstMatch, findLastMatch, postMessageToUI, replaceFirstMatch, replaceLastMatch, reservedDecimal } from './utils'
import { isMacOs } from './utils/platform'
import { MessageType } from './types'

export default defineComponent({
  components: { ElCheckbox, ElSwitch },
  setup (props, context) {
    const data = reactive({
      listData: [] as Array<NewNodeType>,
      emptyListData: [{
        name: '⚠️ Please select a layer at first',
      }] as Array<NewNodeType>,
      i18nRegexp: new RegExp(`${i18nOptions.map((item) => `${item.value}_`).join('|')}`),
      deviceRegexp: new RegExp(`${deviceOptions.map((item) => `${item.value}_`).join('|')}`),
      sizeRegexp: /_?\d+(\.\d+)?x\d+(\.\d+)?/g,
      resolutionRegexp: /@\d+(\.\d+)?x/g,
      configure: {
        onI18n: true,
        onDevice: true,
        onUseI18n: true,
        onUseDevice: true,
        onLayerSize: true,
        onLayerResolution: true,
        i18nValue: i18nOptions[0].value,
        deviceValue: deviceOptions[0].value,
      },
    })

    watch(() => data.configure, (val) => {
      postMessageToUI(MessageType.storage, toRaw(data.configure))
    }, {
      immediate: true,
      deep: true,
    })

    const formatListData = computed<Array<NewNodeType>>(() => {
      return data.listData.map((val: any) => ({
        ...val,
        width: reservedDecimal(val.width, 2),
        height: reservedDecimal(val.height, 2),
      }))
    })

    // 渲染列表项高度
    const renderHeight = () => {
      const leftListItem = document.querySelectorAll?.('.left-list .list-name-item')
      const rightListItem = document.querySelectorAll?.('.right-list .list-name-item')
      leftListItem?.forEach((item: any, index: number) => {
        const rightItem = rightListItem?.[index] as HTMLDivElement
        item.style.height = window.getComputedStyle(rightItem!).height
      })
    }

    watch(() => [data.listData, data.configure], () => {
      if (data.listData?.length) {
        requestAnimationFrame(renderHeight)
      }
    }, {
      immediate: true,
      deep: true,
    })

    // 生成设备
    const generateDevice = (name: string) => {
      // 是否有device
      if (data.configure.deviceValue && data.configure.onDevice) {
        if (data.configure.onUseDevice) {
          return `${data.configure.deviceValue}_`
        } else {
          return findFirstMatch(name, data.deviceRegexp)
        }
      }
      return ''
    }

    // 生成i18n
    const generateI18n = (name: string) => {
      // 是否有i18n
      if (data.configure.i18nValue && data.configure.onI18n) {
        if (data.configure.onUseI18n) {
          return `${data.configure.i18nValue}_`
        } else {
          return findFirstMatch(name, data.i18nRegexp)
        }
      }
      return ''
    }

    // 生成尺寸
    const generateSize = (name: string, ind: number) => {
      // 是否有size
      if (data.configure.onLayerSize) {
        return `_${formatListData.value?.[ind].width}x${formatListData.value?.[ind].height}`
      }
      return ''
    }

    // 生成尺寸
    const generateResolution = (name: string, constraint: any) => {
      // 是否有尺寸约束
      if (data.configure.onLayerResolution) {
        let replaceStr = ''
        if (constraint) {
          replaceStr = `@${constraint.value}x`
        } else {
          replaceStr = '@1x'
        }
        return replaceStr
      }
      return ''
    }

    const rightListData = computed(() => {
      return data.listData.map((item: NewNodeType, ind: number) => {
        let constraint
        if (item.exportSettings[0]?.constraint) {
          constraint = item.exportSettings[item.exportSettings.length - 1]?.constraint
        }
        let newName = item.name
        newName = replaceFirstMatch(newName, data.deviceRegexp, '')
        newName = replaceFirstMatch(newName, data.i18nRegexp, '')
        newName = replaceLastMatch(newName, data.sizeRegexp, '')
        newName = replaceLastMatch(newName, data.resolutionRegexp, '')
        let prefix = ''
        let suffix = ''
        prefix += generateI18n(item.name)
        prefix += generateDevice(item.name)
        suffix += generateSize(item.name, ind)
        suffix += generateResolution(item.name, constraint)
        item.newName = `${prefix}${newName}${suffix}`
        return item
      })
    })

    // 处理按钮点击
    const handleClickButton = () => {
      postMessageToUI(MessageType.confirm, toRaw(data.listData))
    }

    // 恢复设置

    // 处理事件监听
    const handleOnMessage = (event: MessageEvent) => {
      const { type, value } = event.data.pluginMessage
      if (type === MessageType.selectionNodes) {
        data.listData = JSON.parse(value)
      }
      if (type === MessageType.resetStorage && value) {
        data.configure = {
          ...data.configure,
          ...(value ?? {}),
        }
      }
    }

    onMounted(() => {
      window.addEventListener('message', handleOnMessage)
    })

    onUnmounted(() => {
      window.removeEventListener('message', handleOnMessage)
    })

    return {
      handleClickButton,
      rightListData,
      i18nOptions,
      deviceOptions,
      formatListData,
      isMacOs,
      ...toRefs(data),
    }
  },
})
</script>
