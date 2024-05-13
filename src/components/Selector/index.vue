<!--
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-13 14:59:15
 * @LastEditors: 旋仔 zixuan.wen@shopcider.com
 * @LastEditTime: 2024-05-13 19:21:35
 * @FilePath: /figma-rename-helper/src/components/Selector/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="figma-selector">
    <div class="input-box flex justify-between items-center">
      <div class="left">
        <img :src="nowOption?.imgPrefix">
        <div class="label">
          {{ nowOption?.label }}
        </div>
      </div>
      <slot name="suffix" />
    </div>
    <div class="list">
      <div
        v-for="(item, ind) in options"
        :key="ind"
        class="options"
        @click="handleSelect(item)"
      >
        <img
          v-show="item.imgPrefix"
          :src="item.imgPrefix"
        >
        <div class="title">
          {{ item.label }}
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
      nowValue: props.value,
      nowOption: undefined as unknown as IOptionItem | undefined,
    })

    watch(() => props.value, (val) => {
      data.nowValue = val
      data.nowOption = props.options.find(val => val.value === String(val))
    }, {
      immediate: true,
    })

    const handleSelect = (item: IOptionItem) => {
      data.nowOption = item
      context.emit('change', item.value)
      context.emit('update:value', item.value)
    }

    return {
      handleSelect,
      ...toRefs(data),
    }
  },
})
</script>
