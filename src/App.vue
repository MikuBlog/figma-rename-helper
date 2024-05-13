<!--
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-11 18:08:49
 * @LastEditors: 旋仔 zixuan.wen@shopcider.com
 * @LastEditTime: 2024-05-13 19:21:54
 * @FilePath: /figma-plugin-vue3-template/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="container flex justify-between h-[calc(100%-40px)] m-20px mt-0">
    <div class="left flex-1">
      <Title title="Original Layer Name" />
      <div
        ref="leftList"
        class="list b-1 b-solid b-#e1e1e1 bg-#fafafa"
      >
        <ListItem :list-data="listData" />
      </div>
      <div class="rules">
        <div class="i18n-selector-box">
          <Title title="i18N Rules" />
          <Selector
            v-model:value="i18nValue"
            :options="i18nOptions"
          />
        </div>
        <Button
          label="RENAME LAYER"
          @click="handleClickButton"
        />
      </div>
    </div>
    <div class="center">
      <VerticalLine class="ml-40px mr-40px" />
    </div>
    <div class="right flex-1">
      <Title title="Modified Layer Name" />
      <div
        ref="rightList"
        class="list b-1 b-solid b-#e1e1e1 bg-#fafafa"
      >
        <ListItem
          name-key="newName"
          :list-data="rightListData"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { i18nOptions } from './constants/i18n'

export default defineComponent({
  setup (props, context) {
    const leftList = ref<HTMLDivElement>()
    const rightList = ref<HTMLDivElement>()

    const data = reactive({
      listData: [],
      i18nValue: i18nOptions[0].value,
      i18nRegexp: new RegExp(`^${i18nOptions.map((item) => `${item.value}_`).join('|')}`),
      regexp: /_\d+x\d+@\d+x$/,
    })

    const rightListData = computed(() => {
      return data.listData.map((item: NewNodeType) => {
        let constraint
        if (item.exportSettings[0]?.constraint) {
          constraint = item.exportSettings[item.exportSettings.length - 1]?.constraint
        }
        let newName = ''
        // 是否有i18n
        if (data.i18nValue) {
          newName = `${data.i18nValue}_`
        }
        // 中间值
        newName += `${item.name.replace(data.i18nRegexp, '').replace(data.regexp, '')}_${item.width}x${item.height}`
        // 是否有尺寸约束
        if (constraint) {
          newName += `@${constraint.value}x`
        } else {
          newName += '@1x'
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
        data.listData = event?.data?.pluginMessage?.value
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
      ...toRefs(data),
    }
  },
})
</script>
