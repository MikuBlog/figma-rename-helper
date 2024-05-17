<!--
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-13 14:12:41
 * @LastEditors: 旋仔 zixuan.wen@shopcider.com
 * @LastEditTime: 2024-05-17 10:57:40
 * @FilePath: /figma-rename-helper/src/components/Button/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div
    class="figma-button relative font-size-14px fw-700 text-center line-height-40px h-40px pl-20px pr-20px bg-#37EF70 cursor-pointer c-#000 rounded-4px"
    @click="handleClick"
  >
    {{ label }}
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    label: {
      type: String,
      default: '',
    },
  },
  setup (props, context) {
    const handleClick = (e: MouseEvent) => {
      context.emit('click', e)
    }
    return {
      handleClick,
    }
  },
})
</script>
