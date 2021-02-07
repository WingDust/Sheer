<!--
 * @Author: your name
 * @Date: 2021-02-06 12:29:00
 * @LastEditTime: 2021-02-07 18:05:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\components\vim\SingleVim.vue
-->
<template>
  <input 
  class=" break-words w-64 h-12 outline-none placeholder-black" 
  v-focus="confirmPosition"

  :type="isRename&&confirmPosition ? 'text':false"

  :value="isRename&&confirmPosition ? placeholder:''"
  :placeholder="isRename&&confirmPosition ? '':placeholder" 
  :readonly="isRename&&confirmPosition ? false : 'readonly'"
  ref="input"
  @keyup.ctrl.f="forward"
  @keyup.ctrl.b="backword"
  @keyup.ctrl.u="backword"
  @keyup.ctrl.p="previous"
  @keyup.ctrl.n="next"
  @keyup.ctrl.w="killaword"
   />
  <!-- :readonly="Rename ? '' : 'readonly'" //不能写空字符 -->

</template>

<script lang="ts">
import { defineComponent,DirectiveBinding,watchEffect,ref,onUpdated, getCurrentInstance } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  props:{
    placeholder:{
      type:String
    },
    confirmPosition:{
      type:Boolean
    }
  },
  directives:{
    focus:{
      updated(el, binding:DirectiveBinding, vnode, oldVnode){
        // console.log(el);
        // console.log(binding)
        // console.log(vnode)
        // console.log(oldVnode)
        //vnode.component should CompB vue instance, but now is null
        // console.log("vnode.component = ", vnode.component);
        // console.log("getCurrentInstance = ", getCurrentInstance());
        if (binding.value) {
          el.focus()
        }
        console.log('focus');
      }
    }
  },
  setup(){
    let isRename=ref(false)
    let input = ref(null) 
    const store = useStore();
    watchEffect(()=>{ isRename.value=store.state.Vim.movtion.Rename})
    onUpdated(()=>{
      console.dir(input);
    })

    function forward(){
      console.log('forward');
    }
    function backword(){
      console.log('backword');
    }
    function previous(){
      console.log('previous');
    }
    function next(){
      console.log('next');
    }
    function killaword(){

    }
    return {
      isRename,input,forward,previous,next,backword,killaword
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
