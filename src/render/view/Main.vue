<!--
 * @Author: your name
 * @Date: 2020-08-22 09:45:26
 * @LastEditTime: 2020-12-12 11:09:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\view\Main.vue
-->
<template>
    <rootlayout>
        <template v-slot:MainContent>
        <folder>
          <hightLight :code="qwe"></hightLight>
        </folder>
        </template>
  </rootlayout>
  <alertwarning></alertwarning>
</template>

<script lang="ts">
import { defineComponent, reactive,onMounted } from "vue";
import RootLayout from "../components/layout/RootLayout.vue";
import HighLihgt from "../components/highlight/HighLihgt.vue";
import folder from '../components/container/folder.vue'
import AlertWarning  from "../components/container/alert/AlertWarning.vue";
export default defineComponent({
    setup(){
      onMounted(()=>{
        console.log(`Main`);
      })
        return reactive({qwe:`
    var pipe = function (value) {
    var funcStack = [];
    var oproxy = new Proxy({} , {
    get : function (pipeObject, fnName) {
      if (fnName === 'get') {
        return funcStack.reduce(function (val, fn) {
          return fn(val);
        },value);
      }
      funcStack.push(window[fnName]);
      return oproxy;
    }
    });

    return oproxy;
    }

    var double = n => n * 2;
    var pow    = n => n * n;
    var reverseInt = n => n.toString().split("").reverse().join("") | 0;

    pipe(3).double.pow.reverseInt.get; // 63
        `})
    },
    components:{
    'rootlayout':RootLayout,
    'hightLight':HighLihgt,
    folder,
        alertwarning:AlertWarning
    }

})
</script>

<style>

</style>