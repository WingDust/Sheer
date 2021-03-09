<template>
<div class="root w-full">
<tagscontainer/>

<div class="l align-top text-center" :class="{widthmax:view}" >
  <block
    v-for="(line,i) in viewline" 
    :key="i" 
    :data="config.store+line.lable+line.file"
    :position="into&&a(6,vimcursor[0],vimcursor[1])==i"
    :placeholder="line.file.replace(/\.(jpg)/,'')"
    :confirmPosition="into&&a(6,vimcursor[0],vimcursor[1])==i"
  >
  </block>

  <loading 
  :color="'#3399FF'"
  :disable="true"
  :class="'w-20 grid-load'"
  >
  </loading>
</div>
<!-- 因为 Element.scroll 事件不会冒泡所以绑定在父元素 Document.scroll 冒泡 -->
<div class="r sticky" @scroll="scroll" > 
  <block
    class="mb-2"
    v-for="(line,i) in sibeline" 
    :key="i" 
    :data="config.store+line.lable+line.file"
    :position="!into&&sibepostion[0]==i"
    :placeholder="line.file.replace(/\.(jpg)/,'')"
    :confirmPosition="!into&&sibepostion[0]==i"
  >
  </block>
</div>
</div>
</template>

<script lang="ts">
import {
    defineComponent,
    onMounted,
    computed,
    ComputedRef,
    } from "vue";
import { useStore } from "vuex";
import { Config, Img } from "../../../utils/utilInterface";
import { MutationTypes } from "../../store/mutations";
import add from '../../Webassemly/wast/add.wasm'
import { debounce } from "../../../utils/Browser/Fn";
import tags from "../Tags/Tags.vue";
import loading from "../Widgets/animation/Loading.vue";
import block from "./Block.vue";
import { ipcRenderer } from "electron";
import { initwasm } from "src/utils/common/Fn";
export default defineComponent({
  async setup() {
        let options:IntersectionObserverInit = {
            root:null,
            rootMargin:'0px',
            threshold:1.0
        }
        let callback = () =>{}
        const ins = new IntersectionObserver(callback,options)
        const store = useStore()
        console.log(store.state);
        
        const config:ComputedRef<Config>= computed(()=>store.state.Config)
        const view:ComputedRef<boolean> = computed(()=> store.state.View.sibebar)
        const viewline:ComputedRef<Img[]> =computed(()=> store.state.View.viewline) 
        const vimcursor:ComputedRef<[number,number,number]> = computed(() => store.state.Vim.cursor.postion)
        const sibeline:ComputedRef<Img[]> = computed(()=>store.state.View.sibeline)
        const sibepostion:ComputedRef<[number,number]> = computed(()=>store.state.Vim.cursor.sibepostion)
        const into:ComputedRef<boolean> = computed(()=>store.state.Vim.cursor.into)

        function scrollhandl(e:UIEvent,...flag:any[]){
          // [Property 'scrollTop' does not exist on type 'EventTarget'](https://gitter.im/Microsoft/TypeScript/archives/2016/01/23)
          // window.innerHeright 为 viewport 高
          e.preventDefault()
          let target = e.target as HTMLElement
          console.log(JSON.stringify(target.scrollTop));
          // target.scrollTop=target.scrollTop+=208
          console.log(JSON.stringify(target.scrollTop));
          // console.log(target.scrollTop);
          // target.scrollBy(0,208)
        }
        const scroll = debounce(scrollhandl,1000)
        // onBeforeMount, onMounted is called when there is no active component instance to be associated with.
        // Lifecycle injection APIs can only be used during execution of setup(). 
        // If you are using async setup(), make sure to register lifecycle hooks before the first await statement
        onMounted(()=>{
            document.addEventListener("keypress",(e:KeyboardEvent)=>{
              if (e.isComposing){return}
              switch (e.code) { // 行列数限制 @ 列会变成 5
                  case 'KeyH':{store.commit(MutationTypes.callVimStatus,{keycode:'h'}); break;}
                  case 'KeyJ':{store.commit(MutationTypes.callVimStatus,{keycode:'j'}); break;}
                  case 'KeyK':{store.commit(MutationTypes.callVimStatus,{keycode:'k'}); break;}
                  case 'KeyL':{store.commit(MutationTypes.callVimStatus,{keycode:'l'}); break;}
                  case 'KeyR':{e.preventDefault();store.commit(MutationTypes.callVimStatus,{keycode:'r'}); break;}
                  case 'KeyX':{store.commit(MutationTypes.callVimStatus,{keycode:'x'}); break;}
                  case 'KeyU':{break;}// Undo
                  case 'Tab':{e.preventDefault(); break;}
              }
            })
            document.addEventListener("keyup",(e:KeyboardEvent)=>{
              if (e.isComposing){return}
              if ( e.ctrlKey && e.altKey && e.code === 'Space'){ // ctrl + alt + space
              store.commit(MutationTypes.setViewStatus,undefined)
              }
              if (e.ctrlKey && e.code==='KeyR'){ 
                
              } 
            })
            console.log(`RootLayout`);
            ipcRenderer.send('ipc:hello')
            // console.log(process.pid);
        })

        // let a 
        // const loadwasm = async () =>{ a = await initwasm(add)} 
        // onBeforeMount(loadwasm)
        const a = await initwasm(add)

        return {
            scroll,view,viewline,vimcursor,a,config,sibeline,sibepostion,into
        }
    },
    components:{
        tags,
        loading,
        block
    },
})
</script>

<style lang="scss" scoped>
.root {
    width: 1920px;
    margin-top: 40px;
    .l{
        justify-items: center;
        // align-items: center;
        justify-content: center;
        display: inline-grid;
        width: 1644px;
        transition: width .4s;
        grid-template-columns:repeat(6,1fr);
        // grid-template-rows: minmax(198px,198px);
        // grid-column-gap: 1rem;
        grid-row-gap: .5rem;
    }
    .grid-load{
        grid-column-start: 1;
        grid-column-end: span 6;
        grid-row-start: auto;
    }
    .widthmax{
        width: 1370px;
        grid-template-columns:repeat(5,1fr);
        transition: width .4s;
    }
    .r{
        width: 276px;
        height: 1040px;
        overflow-y:auto;
        // overflow: auto;
        justify-items: center;
        display: inline-block;
        top:40px;
    }
  img{
    width: 256px;
    height: 144px;
  }
}
</style>
