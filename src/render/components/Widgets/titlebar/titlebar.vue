<template>
  <div class="titlebar w-full">
      <div class="row flex">
        <span class="titlebtn fonticon-CHROME-CLOSE col-xl-1" @click="close"></span>
        <span class="titlebtn fonticon-CHROME-MAXIMIZE col-xl-1" @click="max"></span >
        <span class="titlebtn fonticon-CHROME-MINIMIZE col-xl-1" @click="min"></span>
        <timer class="leading-8"/>
      </div>
  </div>
</template>

<script lang="ts" setup>
import  timer  from "./time.vue"
import {defineComponent,onMounted} from "vue";
const {ipcRenderer} = require('electron')
        onMounted(()=>{
            console.log(`titlebar.vue`);
        })
        const max =():void =>{
            ipcRenderer.send('max')
        }
        const close = ():void =>{
            ipcRenderer.send('close')
        }
        const min = ():void =>{
            ipcRenderer.send('min')
        }
</script>

<style lang="scss" scoped>
.titlebar{
    position: fixed;
    top: 0;
    z-index: 3;// 保证不被覆盖
    height: 32px;
    -webkit-app-region:drag;
    background:rgba(51, 51, 51, .6);
    // filter: blur(10px);
    backdrop-filter: blur(2px);
    padding: 0;

    .row{
        flex-direction: row-reverse;
        text-align: center;
        flex-wrap: nowrap;
        margin: 0;/** -> Bootstrap5 issue error */

        .col-xl-1{
        line-height: 32px;
        width: 50px;
        }

        .titlebtn{
        -webkit-app-region:no-drag;
        }
    }
}

</style>