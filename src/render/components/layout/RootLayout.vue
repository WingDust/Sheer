<template>
<!-- 
<div :ref="el => {dom[0]=el} " class="c">9</div>
<div :ref="el => {dom[1]=el} " class="c">10</div>
-->

<div class="root">
    <!-- <Suspense> -->
    <tagscontainer></tagscontainer>
    <!-- </Suspense> -->
<div class="r align-top text-center" :class="{widthmax:view}" >
    <singleblock :key="line.filename" :data="line" v-for="(line,i) in viewline" :class="i==0 ? vimcursor:''">
    </singleblock>
</div>
<!-- 对这个使用 inline-flex  会因窗口的缩小而换行 -->
<div class="e" @scroll.prevent="mousewheel" @wheel="touchwheel">
    <div class="item">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
</div>
</div>
</template>

<script lang="ts">
import {
    defineComponent,
    ref,
    onMounted,
    toRaw,
    onBeforeMount,
    reactive,
    computed
    } from "vue";
import { useStore } from "vuex";
import { MutationTypes } from "../../store/mutations";
import TagsContainer from "../Tags/TagsContainer.vue"
import singleblock  from "../container/Film/singleblock.vue";
export default defineComponent({
    setup() {
        onBeforeMount(()=>{
        })
        onMounted(()=>{
            document.addEventListener("keyup",(e)=>{
                console.log(e.key);
                if (e.isComposing){return}
                if ( e.ctrlKey && e.altKey && e.code === 'Space'){ // ctrl + alt + space
                store.commit(MutationTypes.setViewStatus,undefined)
                }
                switch (e.code) {
                    case 'h':break;
                    case 'j':break;
                    case 'k':break;
                    case 'l':break;
                }
            })
            console.log(`RootLayout`);
        })

        const store = useStore()
        console.log(store.state);
        // console.log(toRaw(store.state));
        
        const viewline =computed(()=> store.state.View.viewline) 
        const view = computed(()=> store.state.View.sibebar)
        const vimcursor = computed(() => store.state.Vim.cursor.postion)

        // 防抖
        function debounce(fn:Function,wait:number) {
            let timeoutID:any = null
            let flag = true
            return function (e:any) {
                if (timeoutID != null&&flag) clearTimeout(timeoutID) 
                timeoutID = setTimeout(fn,wait,e,flag)
            }
        }
        function wheel(e:any,flag:any){
            console.log(e);
            console.log(flag);
            let currentT=e.target.scrollTop
            console.log(e.target.scrollTop);
            e.target.scrollBy(0,160)
            console.log("scrollTop:"+e.target.scrollTop+"current:"+(currentT-e.target.scrollTop));
            flag=false
        }
        const mousewheel = debounce(wheel,1000)

        function wheeldebounce(fn:Function,wait:number) {
            let  timeoutID:any = null
            return function (e:any) {
                if (timeoutID !== null) clearTimeout(timeoutID)
                setTimeout(fn,wait,e)
            }
            
        }
        function wheelmove(e:any) {
            console.log(e);
        }
        const touchwheel = wheeldebounce(wheelmove,1000)

        return {
            mousewheel,touchwheel,view,viewline,vimcursor
        }
    },
    components:{
        'tagscontainer':TagsContainer,
        'singleblock':singleblock 
    }
})
</script>

<style lang="scss" scoped>
.container-fluid {
    [class*="col"] {
        height: 1000px;
        padding: 1rem;
        // background-color: #33b5e5;

        border: 2px solid #fff;
        color: #fff;
        text-align: center;
    }

    [class*="con"] {
        padding: 1rem;
        // background-color: #9e33e5;
        border: 2px solid #fff;
        color: #fff;
        text-align: center;
    }

    .a {
        // display: flex;
        flex-direction: column;
        // flex-wrap: wrap;

        .c {
            // display: inline;
            border: 1px solid green;
            width: 192px;
            height: 108px;
        }
    }
}
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
    // .w{
        // width: 274px;
        // height: 154px;
    // }
    // width: 100%;
    // height: auto;
  img{
    width: 256px;
    height: 144px;
  }
}
.vim-cursor{
  border-right: 1px solid #f0aa0b;
  border-left: 1px solid  #f0aa0b;
}
</style>
