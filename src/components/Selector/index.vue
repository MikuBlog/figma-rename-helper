<!--
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-13 14:59:15
 * @LastEditors: 旋仔 zixuan.wen@shopcider.com
 * @LastEditTime: 2024-05-14 14:40:18
 * @FilePath: /figma-rename-helper/src/components/Selector/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="figma-selector relative">
    <div
      class="input-box relative flex justify-between items-center b-1px b-solid b-#000 line-height-40px h-40px pl-10px pr-10px cursor-pointer"
      @click.stop="onShowList = !onShowList"
    >
      <div class="left flex items-center">
        <img
          class="w-18px h-18px mr-10px"
          :src="nowOption?.imgPrefix"
        >
        <div class="label font-size-14px line-height-20px">
          {{ nowOption?.label }}
        </div>
      </div>
      <div class="right">
        <img
          v-if="onShowList"
          class="w-12px h-12px"
          src="@/assets/Selector/arrow2-U.png"
        >
        <img
          v-else
          class="w-12px h-12px"
          src="@/assets/Selector/arrow2-D.png"
        >
      </div>
    </div>
    <div
      v-show="onShowList"
      class="list b-1px b-#000 b-solid b-t-0 absolute z-999 w-[calc(100%-2px)] bg-#fff h-200px overflow-auto"
    >
      <div
        v-for="(item, ind) in options"
        :key="ind"
        class="options flex justify-between cursor-pointer h-40px line-height-40px pl-10px pr-10px items-center hover:bg-#FAFAFA"
        @click="handleSelect(item)"
      >
        <div class="left flex items-center">
          <img
            v-show="item.imgPrefix"
            class="w-18px h-18px mr-10px"
            :src="item.imgPrefix"
          >
          <div class="title font-size-14px line-height-20px">
            {{ item.label }}
          </div>
        </div>
        <div
          v-show="item.value === nowOption?.value"
          class="right"
        >
          <img
            class="w-12px h-12px"
            src="@/assets/Selector/check-line-bold.png"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { IOptionItem } from './typing'

export default defineComponent({
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
    options: {
      type: Array as () => Array<IOptionItem>,
      default: () => [],
    },
  },
  setup (props, context) {
    const data = reactive({
      onShowList: false,
      nowValue: props.value,
      nowOption: undefined as unknown as IOptionItem | undefined,
    })

    watch(() => props.value, (val) => {
      data.nowValue = val
      data.nowOption = props.options.find(data => data.value === String(val)) ?? props.options[0]
    }, {
      immediate: true,
    })

    const handleSelect = (item: IOptionItem) => {
      data.nowOption = item
      context.emit('change', item.value)
      context.emit('update:value', item.value)
    }

    // 隐藏下拉列表
    const hiddenList = () => {
      data.onShowList = false
    }

    onMounted(() => {
      document.addEventListener('click', hiddenList)
    })

    onUnmounted(() => {
      document.removeEventListener('click', hiddenList)
    })

    return {
      handleSelect,
      ...toRefs(data),
    }
  },
})
</script>

<style lang="less" scoped>
// .input-box {
//   border: 1px solid #EEE;
// }
</style>
