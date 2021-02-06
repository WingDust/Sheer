<!--
 * @Author: your name
 * @Date: 2021-02-06 12:29:00
 * @LastEditTime: 2021-02-06 21:45:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\components\vim\SingleVim.vue
-->
<template>
  <input 
  class=" break-words w-64 h-12 outline-none placeholder-black" 
  v-focus

  :type="isRename ? 'text':false"

  :placeholder="placeholder" 
  :readonly="isRename ? false : 'readonly'"
   />
  <!-- :readonly="Rename ? '' : 'readonly'" //不能写空字符 -->
   <!-- @keyup.ctrl -->

</template>

<script lang="ts">
import { defineComponent,watchEffect,ref } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  props:{
    placeholder:{
      type:String
    },
    readonly:{
      type:String
    }
  },
  directives:{
    focus:{
      updated(el){
        el.focus()
        console.log('focus');
        console.log(el);
      }
    }
  },
  setup(){
    let isRename=ref(false)
    const store = useStore();
    watchEffect(()=>{ isRename.value=store.state.Vim.movtion.Rename})
    // const Rename = computed(() => store.state.Vim.movtion.Rename)


    return {
      isRename,
    }
  }
})
</script>
<style  lang="scss" scoped>
input{
  // outline-style: none;
  background-color: #eee;
  border: 0px;
}
input::-ms-input-placeholder{
  text-align: center;
}
input::-webkit-input-placeholder{
  text-align: center;
}
// ::-webkit-input-placeholder {
//   color: black;
// }
// :-moz-placeholder {/* Firefox 18- */
//   color: black;
// }
// ::-moz-placeholder{/* Firefox 19+ */
//  color: black;
// }
// :-ms-input-placeholder {
//   color: black; }
</style>
