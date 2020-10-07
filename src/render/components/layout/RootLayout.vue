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
    <div class="r">
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
    <div class="w">7</div>
    <div class="w">7</div>
    <div class="w">7</div>
    <div class="w">7</div>
</div>
<!-- 对这个使用 inline-flex 会因窗口的缩小而换行 -->
<div class="e">
    <div>
        <img src="safe-file-protocol:://G:/test/1.PNG" alt="">
    </div>
    <div>
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
    toRaw
} from "vue";
import hotkeys from 'hotkeys-js';
import { useStore } from "vuex";
export default defineComponent({
    setup() {
        hotkeys('q',function(event,handler){
            event.preventDefault()
            console.log('q');
        })

        const store = useStore()
        console.log(store.state);
        console.log(toRaw(store.state));


        return {
            hotkeys,
        }
    },
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
    display: inline-grid;
    width: 1644px;
    grid-template-columns:repeat(6,1fr);
    // grid-column-gap: 1rem;
    grid-row-gap: 1rem;
    }
    .e{
    display: inline-grid;
    grid-row-gap: 1rem;
    width: 276px;
    height: auto;
    }
    img{
    width: 256px;
    height: 144px;
    }
    // width: 100%;
    // height: auto;
}
</style>
