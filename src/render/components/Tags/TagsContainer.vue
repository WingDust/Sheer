<!--
 * @Author: your name
 * @Date: 2020-11-01 16:09:13
 * @LastEditTime: 2020-11-14 17:34:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\components\Tags\TagsContainer.vue
-->
<template>
      <!-- <div class="TagsContainer" @keydown="hidesibebar"> -->
      <div class="TagsContainer" :class="{hided:ishided}"  @keydown="hided">
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
import {defineComponent,ref} from "vue"
export default defineComponent({
    async setup(){
        // async function run() {
        //     await init()
        // }
       let wasm = await init()
        // console.log(wasm);
    //    let hidesibebar = wasm.hidesibebar
    //    let hidesibebar = hidesibebar

    let ishided = ref(false)

    function hided(){
        console.log("s");
        ishided = true
    }

       return {hidesibebar,hided,ishided}
    }

})
</script>

<style lang="scss" scoped>
.TagsContainer{
    display: inline-block;
    width:1px;
    background-color: rgb(225,228,235);
    vertical-align: top;
    ul li{
        list-style: none;
    }
}

.hided{
    width: 274px;
    transition: all .4s;
}


</style>