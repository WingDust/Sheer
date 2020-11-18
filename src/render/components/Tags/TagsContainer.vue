<!--
 * @Author: your name
 * @Date: 2020-11-01 16:09:13
 * @LastEditTime: 2020-11-18 13:34:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\components\Tags\TagsContainer.vue
-->
<template>
      <!-- <div class="TagsContainer" @keydown="hidesibebar"> -->
      <div class="TagsContainer" :class="{hided:sibebar}" @click="show">
          <ul>
              <li>123</li>
              <li>123</li>
              <!-- <li class="fonticon-CHEVRON-RIGHT"></li> -->
          </ul>
      </div>
</template>

<script>
import "keyevent/keyevent_bg.wasm"
import init,{hidesibebar} from "keyevent/keyevent.js"
import {defineComponent,ref,computed} from "vue"
import { useStore } from "vuex";
export default defineComponent({
    // async setup(props,context){
     setup(props,context){
        // async function run() {
        //     await init()
        // }
    //    let wasm = await init()
        // console.log(wasm);
    //    let hidesibebar = wasm.hidesibebar
    //    let hidesibebar = hidesibebar
    const store = useStore()

    const sibebar = computed(()=>store.state.View.sibebar)

    let a = ref(false)
    let show = function() {
        // console.log(context);
        this.a = true
    }


       return {hidesibebar,show,a,sibebar}
    }

})
</script>

<style lang="scss" scoped>
.TagsContainer{
    display: inline-block;
    width:0px;
    background-color: rgb(225,228,235);
    transition: width .4s;
    vertical-align: top;
    ul li{
        list-style: none;
    }
}

.hided{
    width: 274px;
    transition: width .4s;
}


</style>