<!--
 * @Author: 旋仔 zixuan.wen@shopcider.com
 * @Date: 2024-05-13 13:55:41
 * @LastEditors: 旋仔 zixuan.wen@shopcider.com
 * @LastEditTime: 2024-05-17 11:02:22
 * @FilePath: /figma-rename-helper/src/components/List-Item/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div>
    <div
      v-for="item in listData"
      :key="item.id"
      class="list-name-item pt-12px pb-12px ml-12px mr-12px font-size-12px flex justify-between items-center last-of-type:b-b-0px b-b-1px b-b-solid b-#e1e1e1"
    >
      <img
        v-show="item.type"
        class="w-12px h-12px mr-4px"
        :src="generateTypeImage(item.type)"
      >
      <div class="break-all flex-1">
        {{ (item as any)[nameKey] }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    listData: {
      type: Array as () => Array<NewNodeType>,
      default: () => [],
    },
    nameKey: {
      type: String,
      default: 'name',
    },
  },
  setup (props, context) {
    const generateTypeImage = (type: string) => {
      switch (type) {
        case 'FRAME':
          return new URL('@/assets/List-Icon/frame.png', import.meta.url).href
        case 'GROUP':
          return new URL('@/assets/List-Icon/group.png', import.meta.url).href
        default:
          return new URL('@/assets/List-Icon/empty.png', import.meta.url).href
      }
    }

    return {
      generateTypeImage,
    }
  },
})
</script>
