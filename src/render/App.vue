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
import titlebar from "./components/Widgets/titlebar/titlebar.vue";
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
  position: fixed;
  width: 100%;
  top: -26px;
  z-index: 3;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

</style>
