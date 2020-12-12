<!--
 * @Author: your name
 * @Date: 2020-08-21 21:03:28
 * @LastEditTime: 2020-12-12 11:07:42
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \electron-vue-vite\src\render\App.vue
-->
<template>
  <titlebar></titlebar>
  <div id="RouterMenu">
  <router-link :to ="{name:'Main'}">Home</router-link> |
  <router-link :to ="{name:'proxy'}">proxy</router-link>
  </div>
  <router-view/>
</template>

<script lang="ts">
import router from './router/index';
import titlebar from "./components/titlebar/titlebar.vue";
import {onMounted,defineComponent} from 'vue'

export default defineComponent({
  name: 'App',
  setup(){
    onMounted(()=>{
      console.log(`App`);
    })
  },
  components: {
    titlebar
  }
})
</script>

<style lang="scss" scoped>
#RouterMenu {
  padding: 30px;
  text-align: center;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
