<!--
 * @Author: your name
 * @Date: 2020-09-05 12:19:26
 * @LastEditTime: 2021-02-18 11:57:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\components\container\Film\singleblock.vue
-->
<template>
  <div class="inline-flex flex-col">
    <div :class="{'vim-cursor':position}">
    <img class="w-64 h-36"  
    :key="i"
    v-for="(img,i) in data"
    v-lazy="`safe-file-protocol:://${img}`" alt="">
    </div>
    <slot name="in"></slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent,PropType} from "vue";
import singlevil from "../../vim/SinglEvil.vue";
export default defineComponent({
    props:{
        data:{
          type:Array as PropType<string[]>,
          require:true
        },
        position:{
          type:Boolean
        }
    },
    components:{
      'singlevil':singlevil
    },
    // inheritAttrs: false,
    setup(props){
      return {}
    },
})
</script>
<style lang="scss" scoped>
.vim-cursor{
  /** 图片不能使用伪元素 */
  border: 3px solid #f0aa0b;
  z-index: 2;
  position: relative;
  &::before{
    width: 12rem;
    height: 3px;
    content: " ";
    // -webkit-clip-path: polygon();
    // clip-path: polygon();
    z-index: 3;
    background-color: #eee;
    position: absolute;
    top: -3px;
    left: 2rem;
    /* background-color: blue;*/
  }
  &::after{
    content: " ";
    // -webkit-clip-path: polygon();
    // clip-path: polygon();
    width: 12rem;
    height: 3px;
    z-index: 3;
    background-color: #eee;
    position: absolute;
    top: 144px;
    left: 2rem;
  }
}
</style>
