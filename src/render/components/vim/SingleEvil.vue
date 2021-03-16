
<template>
<!--默认大小可被重写 -->
  <input
  class="break-words text-center w-64 h-12 outline-none placeholder-black border-0"  
  ref="input"
  v-focus="confirmPosition"
  spellcheck ="false"
  :pattern="`${pattern}`"

  :type="type"
  :value="value"
  :placeholder="placeholder" 
  :readonly="readonly"
  @keyup.ctrl.p="previous"
  @keyup.ctrl.n="next"
  @keydown.ctrl.f="forward"
  @keyup.ctrl.w="killaword"
  @keydown.ctrl.h="backspace"
  @keyup.ctrl.e="end"
  @keyup.ctrl.u="clear"
  @keydown.ctrl.a.prevent="home"
  @keyup.enter="enter"
  @keydown.ctrl.b="backchar"
  @contextmenu="enter"
   />
   <!-- keydown 会将 -->

</template>

<script  lang="ts">
import { 
  defineComponent,
  DirectiveBinding,
  ref,
  Ref,
  SetupContext,
  PropType
} from "vue";
import { useStore } from "vuex";
import { MutationTypes } from "../../store/mutations";
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
    },
    confirmPosition:{
      type:Boolean
    },
    pattern:{
      type:String as PropType<string>
    }
  },
  directives:{
    focus:{
      updated(el:HTMLElement, binding:DirectiveBinding, vnode:any, oldVnode:any){
        if (binding.value) {//指令的参数
          el.focus({preventScroll:true})
          // [小tips: 元素focus页面不滚动不定位的JS处理](https://www.zhangxinxu.com/wordpress/2019/09/js-focus-preventscroll/)
        }
      }
    }
  },
  emits:['previous','next'],
  setup(props: any,context:SetupContext ){
    let input:Ref<HTMLInputElement|null> = ref(null) 
    const store = useStore();

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
      console.log(' previous');
      context.emit('previous',input.value!.value)
      console.log(' previous');
    }
    function next(){
      console.log('next');
      context.emit('next',input.value!.value)
      console.log('next');
    }
    //#endregion

    //#region 字符处理
    function killaword(){
    }
    const backspace = ()=>{
      // let selection = window.getSelection()
      // console.log(selection);
      let selectionStart= input.value!.selectionStart
      if (selectionStart !==0) {
        input.value!.value=input.value!.value.substring(0,selectionStart!-1)+input.value!.value.substring(selectionStart!,input.value!.value.length)
        store.commit(MutationTypes.setlastaction,'backspace')
        input.value!.selectionStart= selectionStart!-1
        input.value!.selectionEnd= selectionStart!-1
      }
      
    }
    function clear(){
      input.value!.value=''
      store.commit(MutationTypes.setlastaction,'clear')
    }
    //#endregion


    function enter(){
      if (input.value!.value != '') {
        context.emit('next',input.value!.value)
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
