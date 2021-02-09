<!--
 * @Author: your name
 * @Date: 2021-02-06 12:29:00
 * @LastEditTime: 2021-02-09 12:35:52
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
  @keyup.ctrl.u="undo"
  @keyup.ctrl.p="previous"
  @keyup.ctrl.n="next"
  @keyup.ctrl.w="killaword"
  @keyup.ctrl.h="backspace"
  @keyup.ctrl.e="end"
  @keyup.enter="enter"
   />
  <!-- :readonly="Rename ? '' : 'readonly'" //不能写空字符 -->

</template>

<script lang="ts">
import { 
  defineComponent,
  DirectiveBinding,
  watchEffect,
  ref,
  Ref,
  getCurrentInstance,
} from "vue";
import { MutationTypes } from "../../store/mutations";
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
      }
    }
  },
  setup(){
    let isRename=ref(false)
    let input:Ref<HTMLInputElement|null> = ref(null) 
    const store = useStore();
    watchEffect(()=>{ isRename.value=store.state.Vim.movtion.Rename})

    function forward(){
      let selectionStart= input.value!.selectionStart
      let selection = window.getSelection()
      // console.log(selection);
      let maxselection = input.value!.value.length-1
      if (maxselection>selectionStart!+1) {
        input.value!.setSelectionRange(maxselection,maxselection)
      }
      else{
        input.value!.setSelectionRange(selectionStart!+1,selectionStart!+1)
      }
    }
    function backword(){
      let selectionStart= input.value!.selectionStart
      if (selectionStart! == 0) return
      if (selectionStart! > 0) {
        input.value!.setSelectionRange(selectionStart!-1,selectionStart!-1)
      }
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
    function undo(){
      input.value!.value=''
    }
    function enter(){
      if (input.value!.value != '') {
        store.commit(MutationTypes.adjustViewline,input.value!.value)
      }
      else{

      }
    }
    const backspace = ()=>{}
    const end = ()=>{
      let maxselection = input.value!.value.length-1
      input.value!.setSelectionRange(maxselection,maxselection)
    }
    return {
      isRename,input,forward,previous,next,backword,killaword,undo,enter,backspace,end
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
