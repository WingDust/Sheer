<template>
<div class="container-fluid ">
    <!-- <div class="row">
        <div class="col-md-12"></div>
    </div> -->
    <div class="row">
        <div class="col-md-8">
            <h2>Main</h2>
            <slot name="MainContent"></slot>
        </div>
        <div class="col-md-4">
            <h2>Side</h2>
            <div class="a">
                <div>
                    <!-- :class="onfocus" -->
                    <div class="c"  >4</div>
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
                <div class="alert alert-primary" role="alert">a simple</div>
                <!-- <div :ref="el => {dom[0]=el} " class="c">9</div> -->
                <!-- <div :ref="el => {dom[1]=el} " class="c">10</div> -->
            </div>

        </div>
    </div>
    <!-- <div class="row">
        <div class="col-md-12"></div>
    </div> -->
</div>
</template>

<script>
import {
    defineComponent,
    ref,
    onMounted
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


        return {
            hotkeys,
        }
    },
})
</script>

<style lang="scss" scoped>
.container-fluid {
    [class*="col"] {
        padding: 1rem;
        background-color: #33b5e5;
        border: 2px solid #fff;
        color: #fff;
        text-align: center;
    }

    [class*="con"] {
        padding: 1rem;
        background-color: #9e33e5;
        border: 2px solid #fff;
        color: #fff;
        text-align: center;
    }

    .a {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;

        .c {
            // display: inline;
            border: 1px solid green;
            width: 50px;
            height: 40px;
        }
    }
}
</style>
