<template>
<!-- 
<div :ref="el => {dom[0]=el} " >9</div>
<div :ref="el => {dom[1]=el} " >10</div>
-->
<div class="root w-full">
<tagscontainer/>
<div class="r align-top text-center" :class="{widthmax:view}" >
  <singleblock 
  :key="i" 
   v-for="(line,i) in viewline" 
  :data="config.store+line.lable+line.file"
  :position="into&&a(6,vimcursor[0],vimcursor[1])==i"
  >
    <template v-slot:in>
      <singlevil 
      :placeholder="line.file.replace(/\.(jpg)/,'')"
      :confirmPosition="into&&a(6,vimcursor[0],vimcursor[1])==i"
      />
    </template>
  </singleblock >

  <loading 
  :color="'#3399FF'"
  :disable="true"
  :class="'w-20 grid-load'"
  >
  </loading>
</div>
<!-- 对这个使用 inline-flex  会因窗口的缩小而换行 -->
<!-- <div class="e" @scroll.prevent="scroll" @wheel="touchwheel"> -->
<div class="e sticky" @scroll="scroll" > <!-- 因为 Element.scroll 事件不会冒泡所以绑定在父元素 -->
<!-- 为什么使用 span 因为要使用 dom.getClientRects(只能是行级元素或 inline 才返回多个DOMRect) 而 inline 不能与 inline-grid 并一行 -->
  <!-- <span ref="Rectsdom"> -->
    <singleblock 
    class="mb-2"
    :key="i" 
    v-for="(line,i) in sibeline" 
    :data="config.store+line.lable+line.file"
    :position="!into&&sibepostion[0]==i"
    >
      <template v-slot:in>
        <singlevil 
        :placeholder="line.file.replace(/\.(jpg)/,'')"
        :confirmPosition="!into&&sibepostion[0]==i"/>
      </template>
    </singleblock >
  <!-- </span> -->
</div>
</div>
</template>

<script lang="ts">
import {
    defineComponent,
    onBeforeMount,
    onMounted,
    computed,
    ComputedRef,
    } from "vue";
import { useStore } from "vuex";
import { Config, Img } from "../../../utils/utilInterface";
import { MutationTypes } from "../../store/mutations";
import add from '../../Webassemly/wast/add.wasm'
import { initwasm } from "../../../utils/common/Fn";
import {height,setsibepostion ,debounce ,hasScroll } from "../../../utils/Browser/Fn";
import TagsContainer from "../Tags/TagsContainer.vue";
import SingleBlock  from "../container/Film/SingleBlock.vue";
import cursor from "../vim/cursor.vue";
import singlevil from "../vim/SinglEvil.vue";
import loading from "../animation/Loading.vue";
import { ipcRenderer } from "electron";
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
          // if(target.scrollHeight > target.clientHeight)
          // if (hasScroll(target,undefined))
          // if (sibeline.value.length)
          // console.log(target.scrollTop);
          // let currentT=e.target!.srcElement['scrollTop']
          // let currentT=e.target!scrollTop
          // console.log(e.target!.scrollTop);
          // console.log("scrollTop:"+e.target.scrollTop+"current:"+(currentT-e.target.scrollTop));
          // flag=false
        }
        const scroll = debounce(scrollhandl,1000)

        function wheeldebounce(fn:Function,wait:number) {
            let  timeoutID:any = null
            return function (e:any) {
                if (timeoutID !== null) clearTimeout(timeoutID)
                setTimeout(fn,wait,e)
            }
            
        }
        function wheelmove(e:WheelEvent) {
            console.log(e);
        }
        const touchwheel = wheeldebounce(wheelmove,1000)

        // const Rectsdom:Ref<HTMLElement|null> = ref(null)

        // onBeforeMount, onMounted is called when there is no active component instance to be associated with.
        // Lifecycle injection APIs can only be used during execution of setup(). 
        // If you are using async setup(), make sure to register lifecycle hooks before the first await statement
        onMounted(()=>{
            document.addEventListener("keydown",(e:KeyboardEvent)=>{
                if (e.isComposing){return}
                if ( e.ctrlKey && e.altKey && e.code === 'Space'){ // ctrl + alt + space
                store.commit(MutationTypes.setViewStatus,undefined)
                }
                switch (e.code) { // 行列数限制 @ 列会变成 5
                    case 'KeyH':{store.commit(MutationTypes.callVimStatus,{keycode:'h'}); break;}
                    case 'KeyJ':{store.commit(MutationTypes.callVimStatus,{keycode:'j'}); break;}
                    case 'KeyK':{store.commit(MutationTypes.callVimStatus,{keycode:'k'}); break;}
                    case 'KeyL':{store.commit(MutationTypes.callVimStatus,{keycode:'l'}); break;}
                    case 'KeyR':{store.commit(MutationTypes.callVimStatus,{keycode:'r'}); break;}
                    case 'Tab':{e.preventDefault(); break;}
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
            scroll,touchwheel,view,viewline,vimcursor,a,config,sibeline,sibepostion,into
        }
    },
    components:{
        'tagscontainer':TagsContainer,
        'singleblock':SingleBlock,
        'cursor':cursor,
        'singlevil':singlevil,
        'loading':loading
    },
})
</script>

<style lang="scss" scoped>
.root {
    width: 1920px;
    margin-top: 40px;
    .r{
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
    .e{
        width: 276px;
        height: 1040px;
        overflow-y:auto;
        // overflow: auto;
        justify-items: center;
        display: inline-block;
        top:50;
      
    }
  img{
    width: 256px;
    height: 144px;
  }
}
</style>
