<!--
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-17 11:04:10
 * @LastEditors: 旋仔 zixuan.wen@shopcider.com
 * @LastEditTime: 2024-05-17 15:26:46
 * @FilePath: /figma-rename-helper/src/components/List-Container/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="list b-1 b-solid b-#e1e1e1 bg-#fafafa rounded-4px">
    <slot />
  </div>
</template>

<script lang="ts">

export default defineComponent({
  setup (props, context) {
    return {

    }
  },
})
</script>

<style scoped>

</style>
