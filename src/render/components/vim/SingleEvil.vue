<!--
 * @Author: your name
 * @Date: 2021-02-06 12:29:00
 * @LastEditTime: 2021-02-06 12:39:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\components\vim\SingleVim.vue
-->
<template>
  <input >
  <!-- <input type="text"> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props:{}
})
</script>

<style  lang="scss" scoped>
input{
  outline-style: none;
  border: 0px;
}
input::-ms-input-placeholder{
  text-align: center;
}
input::-webkit-input-placeholder{
  text-align: center;
}
::-webkit-input-placeholder {
  color: black;
}
:-moz-placeholder {/* Firefox 18- */
  color: black;
}
::-moz-placeholder{/* Firefox 19+ */
 color: black;
}
:-ms-input-placeholder {
  color: black;
}
</style>
