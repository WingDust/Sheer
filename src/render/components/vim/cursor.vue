<!--
 * @Author: your name
 * @Date: 2021-01-26 19:44:51
 * @LastEditTime: 2021-02-07 14:12:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\components\vim\cursor.vue
-->
<template>
<div v-for="(item, i) in list" :key="i" :ref="el => { if (el) divs[i] = el }">
  {{ item }}
</div>
</template>

<script lang="ts">
import { defineComponent,ref, reactive, onBeforeUpdate} from "vue";
export default defineComponent({
    setup(){
      const list = reactive([1, 2, 3])
      const divs = ref([])

      // 确保在每次更新之前重置ref
      onBeforeUpdate(() => {
        divs.value = []
      })

      return {
        list,
        divs
        }
    }
})
</script>

<style>

</style>
