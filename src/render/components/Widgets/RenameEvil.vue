<template>
  <singlevil
  class="truncate "
  :class="isRename&&confirmPosition ? 'rounded-md border border-grey border-solid':undefined"
  required

  :confirmPosition="confirmPosition"
  :type="isRename&&confirmPosition ? 'text':undefined"

  title='格式不正确'
  oninvalid="setCustomValidity('不能包含 ? * : < &quot; ' > \ / |')"

  :value="isRename&&confirmPosition&&!insert ? placeholder:previousval"
  :placeholder="isRename&&confirmPosition ? undefined:placeholder" 
  :readonly="isRename&&confirmPosition ? false : true"

  :pattern="re"
  @previous="previous"
  @next="next"
  @enter="enter"
  />
<!-- [特殊字符(Html语法字符](https://www.cnblogs.com/hailexuexi/archive/2010/07/25/1784611.html) -->
<!-- pattern 在值为空时不检查 -->
<!-- required 值为不能为空 -->
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
    const vimcursor:ComputedRef<[number,number,number]> = computed(() => store.state.Vim.cursor.postion)
    watchEffect(()=>{ isRename.value=store.state.Vim.movtion.Rename})
    const lastaction:ComputedRef<string|null> = computed(()=>store.state.Vim.renamevil.lastaction)
    const re ='[^\?\*\:\"\<\>\\\/\|\']+'
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
      if (vimcursor.value[0]==0) window.scrollTo({top:0,behavior:'smooth'})
      else{document.activeElement!.parentElement!.scrollIntoView({behavior:'smooth',block:'nearest'})}
      // document.activeElement!.parentElement!.scrollIntoView({behavior:'smooth',block:'nearest'})
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