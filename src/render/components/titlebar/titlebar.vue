<template>
  <div class="titlebar">
      <div></div>
      <div class="float-right ">
            <div class="d-inline titlebtn pr-1" @click="min">
              _________
            </div>
            <div class="d-inline titlebtn" @click="max">
              🀆
            </div>
            <div class="d-inline titlebtn" @click="close">
              <i class="fonticon"></i>
            </div>
      </div>
  </div>
</template>

<script lang="ts">

import { defineComponent} from "vue";
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
            console.log('min');
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
    width: 100%;
    height: 32px;
    -webkit-app-region:drag;
    background:rgba(51, 51, 51, .6);
    // filter: blur(10px);
    backdrop-filter: blur(2px);
    margin-bottom: 20px;
    

}
.titlebtn{
    -webkit-app-region:no-drag;
}

</style>