<template>
  <singlevil
  ref="input"
  v-focusval="confirmPosition"
  :type="isRename&&confirmPosition ? 'text':undefined"

  :value="isRename&&confirmPosition ? placeholder:''"
  :placeholder="isRename&&confirmPosition ? '':placeholder" 
  :readonly="isRename&&confirmPosition ? false : true"
  @keyup.ctrl.p="previous"
  @keyup.ctrl.n="next"

  />
  <!-- :readonly="Rename ? '' : 'readonly'" //不能写空字符 -->
  <!-- @keyup.93="enter" -->
  <!-- @keyup.ContextMenu="enter" -->
</template>

<script lang="ts">
import { 
  defineComponent,
  DirectiveBinding,
  watchEffect,
  ref,
  Ref
} from "vue";
import  singlevil  from "../vim/SingleEvil.vue";
import { useStore } from "vuex";
export default defineComponent({
  components:{
    singlevil 
  },
  props:{
    placeholder:{
      type:String
    },
    confirmPosition:{
      type:Boolean
    }
  },
  directives:{
    focusval:{
      updated(el, binding:DirectiveBinding, vnode, oldVnode){
        //vnode.component should CompB vue instance, but now is null
        // console.log("vnode.component = ", vnode.component);
        // console.log("getCurrentInstance = ", getCurrentInstance());
        if (binding.value) {//好像是指令的参数
        // console.log(el);
        // console.log(binding)
        // console.log(vnode)
        // console.log(oldVnode)
          binding.instance!.previousval = el.value
          el.focus()
        }
      }
    }
  },
  setup(){
    let isRename=ref(false)
    const store = useStore();
    watchEffect(()=>{ isRename.value=store.state.Vim.movtion.Rename})

    let input:Ref<HTMLInputElement|null> = ref(null) 
    let previousval=ref('')
    // let nowval = ref('')
    let nextval = ref('')
    function previous(){
      input.value!.value = previousval.value
    }
    function next(){
      console.log('next');
    }
    return {
      isRename,previous,next,previousval,nextval,input
    }
  }
})
</script>
