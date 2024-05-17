<!--
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-11 18:08:49
 * @LastEditors: 旋仔 zixuan.wen@shopcider.com
 * @LastEditTime: 2024-05-17 12:22:21
 * @FilePath: /figma-plugin-vue3-template/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <template v-if="formatListData?.length">
    <div class="relative m-40px mt-20px mb-0">
      <div class="flex justify-between">
        <div class="left flex-1">
          <Title title="Original Layer Name" />
          <List-Container ref="leftList">
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
          <List-Container ref="rightList">
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
                v-model="onI18n"
                label="Show i18n Rule（Prefix）"
                size="large"
                text-color="#333"
              />
              <br>
              <ElCheckbox
                v-model="onLayerSize"
                label="Show Layer Size（Suffix）"
                size="large"
                text-color="#333"
              />
              <br>
              <ElCheckbox
                v-model="onLayerResolution"
                label="Show Layer Resolution（Suffix）"
                size="large"
                text-color="#333"
              />
            </div>
            <div class="center w-50px" />
            <div class="right flex-1">
              <div
                v-show="onI18n"
                class="i18n-selector-box"
              >
                <div class="flex justify-between">
                  <Title title="i18N Rules" />
                  <ElSwitch
                    v-model="onUseI18n"
                    size="small"
                    active-text="Apply new"
                    inactive-text="Stay old"
                  />
                </div>
                <Selector
                  v-model:value="i18nValue"
                  :options="i18nOptions"
                />
              </div>
            </div>
          </div>
          <Button
            label="RENAME LAYER"
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
import { reservedDecimal } from './utils'

export default defineComponent({
  components: { ElCheckbox, ElSwitch },
  setup (props, context) {
    const leftList = ref<HTMLDivElement>()
    const rightList = ref<HTMLDivElement>()

    const data = reactive({
      listData: [] as Array<NewNodeType>,
      emptyListData: [{
        name: '⚠️ Please select a layer at first',
      }] as Array<NewNodeType>,
      i18nValue: i18nOptions[0].value,
      i18nRegexp: new RegExp(`^${i18nOptions.map((item) => `${item.value}_`).join('|')}`),
      sizeRegexp: /_?\d+(\.\d+)?x\d+(\.\d+)?/,
      resolutionRegexp: /@\d+(\.\d+)?x$/,
      onI18n: true,
      onUseI18n: true,
      onLayerSize: true,
      onLayerResolution: true,
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
      const leftListItem = leftList.value?.querySelectorAll?.('.list-name-item')
      const rightListItem = rightList.value?.querySelectorAll?.('.list-name-item')
      leftListItem?.forEach((item: any, index: number) => {
        const rightItem = rightListItem?.[index]
        item.style.height = window.getComputedStyle(rightItem!).height
      })
    }

    watch(() => data.listData, (listData: Array<NewNodeType>) => {
      if (listData?.length) {
        nextTick(renderHeight)
      }
    }, {
      immediate: true,
    })

    const rightListData = computed(() => {
      return data.listData.map((item: NewNodeType, ind: number) => {
        let constraint
        if (item.exportSettings[0]?.constraint) {
          constraint = item.exportSettings[item.exportSettings.length - 1]?.constraint
        }
        let newName = item.name
        // 是否有i18n
        if (data.i18nValue && data.onI18n) {
          if (data.onUseI18n) {
            if (data.i18nRegexp.test(newName)) {
              newName = newName.replace(data.i18nRegexp, `${data.i18nValue}_`)
            } else {
              newName = `${data.i18nValue}_${newName}`
            }
          }
        }
        // 是否有尺寸
        if (data.onLayerSize) {
          const replaceStr = `_${formatListData.value?.[ind].width}x${formatListData.value?.[ind].height}`
          if (data.sizeRegexp.test(newName)) {
            newName = newName.replace(data.sizeRegexp, replaceStr)
          } else {
            newName += replaceStr
          }
        }
        // 中间值
        // newName += `${item.name.replace(data.i18nRegexp, '').replace(data.regexp, '')}_${formatListData.value?.[ind].width}x${formatListData.value?.[ind].height}`
        // 是否有尺寸约束
        if (data.onLayerResolution) {
          let replaceStr = ''
          if (constraint) {
            replaceStr = `@${constraint.value}x`
          } else {
            replaceStr = '@1x'
          }
          if (data.resolutionRegexp.test(newName)) {
            newName = newName.replace(data.resolutionRegexp, replaceStr)
          } else {
            newName += replaceStr
          }
        }
        item.newName = newName
        return item
      })
    })

    // 处理按钮点击
    const handleClickButton = () => {
      window.parent.postMessage({ pluginMessage: { type: 'confirm', value: toRaw(data.listData) } }, '*')
    }

    // 处理事件监听
    const handleOnMessage = (event: MessageEvent) => {
      if (event.data.pluginMessage.type === 'selectionNodes') {
        data.listData = JSON.parse(event?.data?.pluginMessage?.value)
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
      leftList,
      rightList,
      i18nOptions,
      formatListData,
      ...toRefs(data),
    }
  },
})
</script>
