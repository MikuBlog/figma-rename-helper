<!--
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-13 14:59:44
 * @LastEditors: 旋仔 zixuan.wen@shopcider.com
 * @LastEditTime: 2024-05-17 11:01:16
 * @FilePath: /figma-rename-helper/src/components/Title/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="title font-size-14px fw-600 mb-12px">
    {{ title }}
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  setup (props, context) {
    return {

    }
  },
})
</script>
