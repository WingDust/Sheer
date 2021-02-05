<!--
 * @Author: your name
 * @Date: 2020-09-05 12:19:26
 * @LastEditTime: 2021-02-05 21:50:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\components\container\Film\singleblock.vue
-->
<template>
  <div class="inline-flex flex-col">
    <img class="w-64 h-36" :class="{'vim-cursor':position}" :src="`safe-file-protocol:://${data.dirname+'/'+data.filename}`" alt="">
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
        },
        position:{
          type:Boolean
        }
    },
    // inheritAttrs: false,
    setup(props){
      // console.log(props);
      // const {datas} = toRefs(props)
      return {}
    },
})
</script>
<style lang="scss" scoped>
.vim-cursor{
  /** 图片不能使用伪元素 */
  border: 3px solid #f0aa0b;
  // border-right: 3px solid #f0aa0b;
  // border-left: 3px solid  #f0aa0b;
  z-index: 2;
}
.inline-flex{
  &::before{
    width: 208px;
    height: 40px;
    content: " ";
    -webkit-clip-path: polygon();
    clip-path: polygon();
    z-index: 3;
    background-color: #eee;
    position: absolute;
    top: 47px;
    left: 40px;
    /* background-color: blue;*/
  }
}
</style>
