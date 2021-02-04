<!--
 * @Author: your name
 * @Date: 2020-09-05 12:19:26
 * @LastEditTime: 2021-02-04 11:10:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\components\container\Film\singleblock.vue
-->
<template>
  <div class="block">
    <img :src="`safe-file-protocol:://${data.dirname+'/'+data.filename}`" alt="">
    <div class="filename">{{data.filename.replace(/\.jpg/,'')}}</div>
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
.block{
  img{
    width: 256px;
    height: 144px;
  }
  .filename{
    width: 256px;
  }
}

</style>
