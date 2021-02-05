<!--
 * @Author: your name
 * @Date: 2020-09-05 12:19:26
 * @LastEditTime: 2021-02-05 11:32:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\components\container\Film\singleblock.vue
-->
<template>
  <div class="inline-flex flex-col">
    <img class="w-64 h-36" :src="`safe-file-protocol:://${data.dirname+'/'+data.filename}`" alt="">
    <div class="break-words w-64 h-12">{{data.filename.replace(/\.jpg/,'')}}</div>
  </div>
</template>

<script lang='ts'>
import { defineComponent,PropType,toRefs } from "vue";
import { picture } from "../../../node/utilInterface";
export default defineComponent({
    props:{
        data:{
          type:Object as PropType<picture>,
          require:true
        }
    },
    setup(props){
      // console.log(props);
      // const {datas} = toRefs(props)
      return {}
    },
})
</script>
<style lang="scss" scoped>

</style>
