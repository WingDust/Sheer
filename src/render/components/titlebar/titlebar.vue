<template>
  <div class="titlebar container-fluid">
      <div class="row">
        <span class="titlebtn fonticon-CHROME-CLOSE col-xl-1" @click="close"></span>
        <span class="titlebtn fonticon-CHROME-MAXIMIZE col-xl-1" @click="max"></span >
        <span class="titlebtn fonticon-CHROME-MINIMIZE col-xl-1" @click="min"></span>
      </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
const {ipcRenderer} = require('electron')
export default  defineComponent({
    setup(){
        const max =():void =>{
            ipcRenderer.send('max')
        }
        const close = ():void =>{
            ipcRenderer.send('close')
        }
        const min = ():void =>{
            ipcRenderer.send('min')
        }
        return{
            max,min,close
        }
    },
})
</script>

<style lang="scss" scoped>
.titlebar{
    position: fixed;
    top: 0;
    z-index: 1;// 保证不被覆盖
    // width: 100%;
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