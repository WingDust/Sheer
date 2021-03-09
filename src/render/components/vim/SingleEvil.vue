
<template>
<!--默认大小可被重写 -->
  <input
  class="break-words w-64 h-12 outline-none placeholder-black border-0"  
  ref="input"
  spellcheck ="false"
  autocomplete="on"
  :type="type"
  :value="value"
  :placeholder="placeholder" 
  :readonly="readonly"
  @keyup.ctrl.f="forward"
  @keyup.ctrl.p="previous"
  @keyup.ctrl.n="next"
  @keyup.ctrl.w="killaword"
  @keyup.ctrl.h="backspace"
  @keyup.ctrl.e="end"
  @keyup.ctrl.u="clear"
  @keydown.ctrl.a.prevent="home"
  @keyup.enter="enter"
  @keyup.ctrl.b="backchar"
   />
   <!-- keydown 会将 -->
  <!-- @keyup.93="enter" -->
  <!-- @keyup.ContextMenu="enter" -->

</template>

<script lang="ts">
import { 
  defineComponent,
  DirectiveBinding,
  ref,
  Ref,
} from "vue";
export default defineComponent({
  props:{
    placeholder:{
      type:String
    },
    type:{
        type:String,
        default:"text"
    },
    value:{
        type:String
    },
    readonly:{
      type:Boolean
    }
  },
  directives:{
    focus:{
      updated(el, binding:DirectiveBinding, vnode, oldVnode){
        if (binding.value) {
          el.focus()
        }
      }
    }
  },
  setup(){
    let input:Ref<HTMLInputElement|null> = ref(null) 

    //#region 光标移动
    function forward(){
      let selectionStart= input.value!.selectionStart
      let maxselection = input.value!.value.length
      if ((selectionStart!+=1)>maxselection) {
        input.value!.setSelectionRange(maxselection,maxselection)
      }
      else{
        input.value!.setSelectionRange(selectionStart!,selectionStart!)
      }
    }
    function backchar(){
      let selectionStart= input.value!.selectionStart
      if (selectionStart! == 0) return
      if ((selectionStart!-=1) > -2) {
        input.value!.setSelectionRange(selectionStart!,selectionStart!)
      }
    }
    const end = ()=>{
      let maxselection = input.value!.value.length //不用减
      input.value!.setSelectionRange(maxselection,maxselection)
    }
    const home = ()=>{
      input.value!.setSelectionRange(0,0)
    }
    //#endregion

    //#region 输入记录控制
    function previous(){
      console.log('previous');
    }
    function next(){
      console.log('next');
    }
    //#endregion

    //#region 字符处理
    function killaword(){
      // input.value!.value

    }
    const backspace = ()=>{
      // let selection = window.getSelection()
      // console.log(selection);
      let selectionStart= input.value!.selectionStart
      if (selectionStart !==0) {
        input.value!.value=input.value!.value.substring(0,selectionStart!-1)+input.value!.value.substring(selectionStart!,input.value!.value.length-1)
      }
    }
    function clear(){
      // previousval = input.value!.value
      input.value!.value=''
    }
    //#endregion


    function enter(){
      if (input.value!.value != '') {
      }
      else{

      }
    }
    return {
      input,forward,previous,next,backchar,killaword,clear,enter,backspace,end,home,
    }
  }
})
</script>
<style  lang="scss" scoped>
input{
  // outline-style: none;
  background-color: #eee;
  // border: 0px;
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
