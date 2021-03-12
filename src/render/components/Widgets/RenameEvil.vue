<template>
  <singlevil
  :confirmPosition="confirmPosition"
  :type="isRename&&confirmPosition ? 'text':undefined"

  :value="isRename&&confirmPosition&&!insert ? placeholder:previousval"
  :placeholder="isRename&&confirmPosition ? undefined:placeholder" 
  :readonly="isRename&&confirmPosition ? false : true"
  pattern="re"
  @previous="previous"
  @next="next"
  @enter="enter"

  />
  <!-- 不能包含 ? * : " < > \ / | ，也不能以数字开头 -->
  <!-- @previous="$emit('previous')" -->
  <!-- @next="$emit('next')" -->
  <!-- :readonly="Rename ? '' : 'readonly'" //不能写空字符 -->
</template>

<script lang="ts">
import { 
  defineComponent,
  onUpdated,
  watchEffect,
  ref,
  computed,
  ComputedRef,
} from "vue";
import  singlevil  from "../vim/SingleEvil.vue";
import { MutationTypes } from "../../store/mutations";
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
  setup(props: any){
    let isRename=ref(false)
    const store = useStore();
    watchEffect(()=>{ isRename.value=store.state.Vim.movtion.Rename})
    const lastaction:ComputedRef<string|null> = computed(()=>store.state.Vim.renamevil.lastaction)
    const re =/[^\?\*\:\"\<\>\\\/\|]/
    let previousval=ref('')
    let insert = ref(false)//控制转换着是否正在输入状态
    let nextval = ref('')
    function previous(v:string){
      if (lastaction.value!==null) {
        if (insert.value)insert.value=false
        else insert.value=true
        // insert.value=true
        nextval.value = v
        previousval.value=props.placeholder
        store.commit(MutationTypes.setlastaction,null)//清零操作记录
      }
      return true
    }
    function next(v:string){
      if (nextval.value!==v) {
        previousval.value=nextval.value
      }
      return true
    }
    function enter(v:string){
      store.commit(MutationTypes.adjustViewline,v)
      store.commit(MutationTypes.setRename)
    }
    onUpdated(()=>{
      console.log('Updated');//测试更新次数
    })
    return {
      isRename,previous,next,previousval,nextval,insert,enter,re
    }
  }
})
</script>

<style lang="scss" scoped>
input:invalid{
  background-color: #ffdddd;
}
input:valid{
   background-color: #ddffdd;
}
</style>