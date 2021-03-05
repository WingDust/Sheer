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
  :position="viewline.length>a(6,vimcursor[0],vimcursor[1]) ? i==a(6,vimcursor[0],vimcursor[1]) : i==viewline.length-1"
  >
    <template v-slot:in>
      <singlevil 
      :placeholder="line.file"
      :confirmPosition="viewline.length>a(6,vimcursor[0],vimcursor[1]) ? i==a(6,vimcursor[0],vimcursor[1]) : i==viewline.length-1"
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
<div class="e" @scroll.prevent="scroll" @wheel="touchwheel"> <!-- 因为 scroll 事件会冒泡所以绑定在父元素 -->
  <singleblock 
  :key="i" 
   v-for="(line,i) in sibeline" 
  :data="config.store+line.lable+line.file"
  :position=" sibeline.length>sibepostion ? i==sibepostion  : i==sibeline.length-1"
>
    <!-- <template v-slot:in>
      <singlevil 
      :placeholder="line.file"
      :confirmPosition=" sibeline.length>sibepostion? i==sibepostion : i==sibeline.length-1"
      />
    </template> -->
  </singleblock >
  <img src="safe-file-protocol:://G:\\test/1.PNG"/>
  <img src="safe-file-protocol:://G:\\test/1.PNG"/>
  <img src="safe-file-protocol:://G:\\test/1.PNG"/>
  <img src="safe-file-protocol:://G:\\test/1.PNG"/>
  <img src="safe-file-protocol:://G:\\test/1.PNG"/>
  <img src="safe-file-protocol:://G:\\test/1.PNG"/>
  <img src="safe-file-protocol:://G:\\test/1.PNG"/>
  <img src="safe-file-protocol:://G:\\test/1.PNG"/>
  <img src="safe-file-protocol:://G:\\test/1.PNG"/>
  <!-- <loading 
  :color="'#3399FF'"
  :disable="true"
  :class="'w-20 grid-load'"
  >
  </loading> -->
</div>
</div>
</template>

<script lang="ts">
import {
    defineComponent,
    onBeforeMount,
    onMounted,
    computed,
    ComputedRef
    } from "vue";
import { useStore } from "vuex";
import { Config } from "../../../utils/utilInterface";
import { MutationTypes } from "../../store/mutations";
import add from '../../Webassemly/wast/add.wasm'
import { debounce, initwasm } from "../../../utils/common/Fn";
import TagsContainer from "../Tags/TagsContainer.vue";
import SingleBlock  from "../container/Film/SingleBlock.vue";
import cursor from "../vim/cursor.vue";
import singlevil from "../vim/SinglEvil.vue";
import loading from "../animation/Loading.vue";
import { ipcRenderer } from "electron";
export default defineComponent({
  async setup() {
        onBeforeMount(()=>{
        })
        onMounted(()=>{
            document.addEventListener("keydown",(e:KeyboardEvent)=>{
                if (e.isComposing){return}
                if ( e.ctrlKey && e.altKey && e.code === 'Space'){ // ctrl + alt + space
                store.commit(MutationTypes.setViewStatus,undefined)
                }
                switch (e.code) { // 行列数限制
                    case 'KeyH':{store.commit(MutationTypes.callVimStatus,'h'); break;}
                    case 'KeyJ':{store.commit(MutationTypes.callVimStatus,'j'); break;}
                    case 'KeyK':{store.commit(MutationTypes.callVimStatus,'k'); break;}
                    case 'KeyL':{store.commit(MutationTypes.callVimStatus,'l'); break;}
                    case 'KeyR':{store.commit(MutationTypes.callVimStatus,'r'); break;}
                }
            })
            console.log(`RootLayout`);
            ipcRenderer.send('ipc:hello')
            // console.log(process.pid);
        })
        let options:IntersectionObserverInit = {
            root:null,
            rootMargin:'0px',
            threshold:1.0
        }
        let callback = () =>{}
        const ins = new IntersectionObserver(callback,options)
        const store = useStore()
        console.log(store.state);
        
        const viewline =computed(()=> store.state.View.viewline) 
        const view = computed(()=> store.state.View.sibebar)
        const vimcursor = computed(() => store.state.Vim.cursor.postion)
        const config:ComputedRef<Config>= computed(()=>store.state.Config)
        const sibeline = computed(()=>store.state.View.sibeline)
        const sibepostion = computed(()=>store.state.Vim.cursor.sibepostion)

        // let a 
        // const loadwasm = async () =>{ a = await initwasm(add)} 
        const a = await initwasm(add)

        // onBeforeMount(loadwasm)



        // let scr:scroll = function(){}



        function scrollhandl(e:UIEvent,...flag:any[]){
            console.log(e.target);
            console.log(flag);
            let currentT=e.target!.scrollTop
            // console.log(e.target!.scrollTop);
            // e.target.scrollBy(0,160)
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

        return {
            scroll,touchwheel,view,viewline,vimcursor,a,config,sibeline,sibepostion 
        }
    },
    components:{
        'tagscontainer':TagsContainer,
        'singleblock':SingleBlock,
        'cursor':cursor,
        'singlevil':singlevil,
        'loading':loading
    }
})
</script>

<style lang="scss" scoped>
.root {
    width: 1920px;
    .r{
        justify-items: center;
        // align-items: center;
        justify-content: center;
        display: inline-grid;
        width: 1644px;
        transition: width .4s;
        grid-template-columns:repeat(6,1fr);
        // grid-column-gap: 1rem;
        grid-row-gap: 1rem;
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
        height: 1080px;
        overflow-y:auto;
        // overflow: auto;
        justify-items: center;
        display: inline-grid;
        grid-row-gap: 1rem;
    }
  img{
    width: 256px;
    height: 144px;
  }
}
</style>
