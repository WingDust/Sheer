<template>
    <div :class="{'vim-cursor':position}">
    <img class="w-64 h-36"  
      v-lazy="`safe-file-protocol:://${data}`" alt=""
    />
    </div>
</template>

<script lang='ts'>
import { defineComponent,PropType} from "vue";
export default defineComponent({
    props:{
        data:{
          type:String as PropType<string>,
          require:true
        },
        position:{
          type:Boolean
        }
    },
    // inheritAttrs: false,
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
