<!--
 * @Author: your name
 * @Date: 2021-02-14 11:17:59
 * @LastEditTime: 2021-02-14 21:57:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\components\animation\Loading.vue
-->
<template>
  <div class="loader"  v-show="disable">
    <slot>
      <svg viewBox="25 25 50 50" class="loader__svg" :style="size"> <!-- 备用内容 -->
        <circle cx="50" cy="50" r="20" class="loader__circle" :style="{stroke:color}"></circle>
      </svg>
    </slot>
  </div>
</template>

<script lang='ts'>
import { defineComponent} from "vue";
export default defineComponent({
    props:{
        disable:{
            type:Boolean,
        },
        color:{
            type:String,
            default:'#666666'
        },
        size:{
            type:Number,
            default:50
        }
    },
    setup(props){
      return {}
    },
})

</script>

<style lang="scss" scoped>
.loader{
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  &__svg {
    transform-origin: center;
    animation: rotate 2s linear infinite;
  }
  &__circle {
    fill: none;
    // fill: brown;
    stroke-width: 3;
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes dash {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 200;
    stroke-dashoffset: -35px;
  }
  100% {
    stroke-dashoffset: -125px;
  }
}
</style>