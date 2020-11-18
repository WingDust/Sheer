<template>
<!-- 
<div class="container-fluid ">
    <div class="row">
        <div class="col-xl-11">
            <h2>Main</h2>
            <slot name="MainContent"></slot>
        </div>
        <div class="col-xl-1">
            <h2>Side</h2>
            <div class="a">
                <div>
                    <div class="c"  >4</div >
                </div>
                <div>

                    <div class="c">3</div>
                </div>
                <div>

                    <div class="c">2</div>
                </div>
                <div>
                    <div class="c">1</div>
                </div>
                <div class="c">5</div>
                <div class="c">6</div>
                <div class="c">7</div>
                <div class="c">8</div>
                <div :ref="el => {dom[0]=el} " class="c">9</div>
                <div :ref="el => {dom[1]=el} " class="c">10</div>
            </div>

        </div>
    </div>
</div>  
-->

<div class="root">
<!-- <div class="container-fluid"> -->
    <!-- <div>{{view}}</div> -->
    <Suspense>
    <tagscontainer></tagscontainer>
    </Suspense>
<div class="r" :class="{widthmax:view}">
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="w">
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
</div>
<!-- 对这个使用 inline-flex  会因窗口的缩小而换行 -->
<div class="e" @scroll.prevent="mousewheel" @wheel="touchwheel">
    <div class="item">
        0
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="item">
        1
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="item">
        2
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="item">
        3
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="item">
        4
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="item">
        5
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="item">
        6
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="item">
        7
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="item">
        8
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="item">
        9
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="item">
        10
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="item">
        11
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="item">
        12
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div class="item">
        13
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
</div>
</div>
</template>

<script>
import {
    defineComponent,
    ref,
    onMounted,
    toRaw,
    onBeforeMount,
    reactive,
    computed
} from "vue";
import hotkeys from 'hotkeys-js';
import { useStore } from "vuex";
import TagsContainer from "../Tags/TagsContainer.vue"
import { MutationTypes } from "../../store/mutations";
export default defineComponent({
    setup() {
        onBeforeMount(()=>{
        })
        onMounted(()=>{
            // roote=document.getElementsByClassName("e")[0]
            // console.log(roote);
        })
        hotkeys('q',function(event,handler){
            event.preventDefault()
            console.log('q');
        })
        const storet = useStore()
        document.addEventListener("keyup",(e)=>{
            if (e.altKey && e.ctrlKey&& e.keyCode == 32)
            {
            storet.commit(MutationTypes.setViewStatus,undefined)
            }
            // e.preventDefault()
            })

        console.log(storet.state);
        console.log(toRaw(storet.state));
        // let store = reactive(toRaw(storet))
        const view = computed(()=> storet.state.View.sibebar)

        // 防抖
        function debounce(fn,wait) {
            let timeoutID = null
            let flag = true
            return function (e) {
                if (timeoutID != null&&flag) clearTimeout(timeoutID) 
                timeoutID = setTimeout(fn,wait,e,flag)
            }
        }
        function wheel(e,flag){
            console.log(e);
            console.log(flag);
            let currentT=e.target.scrollTop
            console.log(e.target.scrollTop);
            e.target.scrollBy(0,160)
            console.log("scrollTop:"+e.target.scrollTop+"current:"+(currentT-e.target.scrollTop));
            flag=false
        }
        const mousewheel = debounce(wheel,1000)

        function wheeldebounce(fn,wait) {
            let  timeoutID = null
            return function (e) {
                if (timeoutID !== null) clearTimeout(timeoutID)
                setTimeout(fn,wait,e)
            }
            
        }
        function wheelmove(e) {
            console.log(e);
        }
        const touchwheel = wheeldebounce(wheelmove,1000)

        return {
            hotkeys,mousewheel,touchwheel,view
        }
    },
    components:{
        'tagscontainer':TagsContainer
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
        align-items: center;
        // justify-content: center;
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
    img{
        width: 256px;
        height: 144px;
    }
    // width: 100%;
    // height: auto;
}
</style>
